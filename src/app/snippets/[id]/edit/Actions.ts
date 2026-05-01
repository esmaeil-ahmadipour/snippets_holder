"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// Zod validation schema for editing a snippet
const EditSnippetSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1, "Title is required").max(255, "Title too long"),
  code: z.string().min(1, "Code is required").max(10000, "Code too long"),
});

// Extract and format the first Zod validation error message
function getZodErrorMessage(error: z.ZodError): string {
  const firstError = error.issues[0];
  const field = firstError.path.join(".");

  // Custom error messages for specific fields
  const messages: Record<string, string> = {
    title: "Title: " + firstError.message,
    code: "Code: " + firstError.message,
    id: "Invalid snippet ID",
  };

  return messages[field] || `${field}: ${firstError.message}`;
}

export async function editSnippet(formData: FormData) {
  try {
    // Extract form data
    const rawId = formData.get("id");

    // Validate ID presence
    if (!rawId) {
      throw new Error("Snippet ID is required");
    }

    // Extract form data
    const rawTitle = formData.get("title");
    const rawCode = formData.get("code");

    // Validate and parse input data
    const validated = EditSnippetSchema.parse({
      id: Number(rawId),
      title: rawTitle,
      code: rawCode,
    });

    // Update snippet in database
    await db.snippet.update({
      where: { id: validated.id },
      data: {
        title: validated.title,
        code: validated.code,
      },
    });

    // Revalidate cached pages to reflect changes
    revalidatePath("/");
    revalidatePath(`/snippets/${validated.id}`);
  } catch (error) {
    // Log error for debugging
    console.error("Edit error:", error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return { error: getZodErrorMessage(error) };
    }

    // Re-throw redirect error to let Next.js handle it
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }

    // Return generic error message for other errors
    return { error: "Failed to update snippet. Please try again." };
  }
  // Redirect to home page after successful update
  redirect("/");
}
