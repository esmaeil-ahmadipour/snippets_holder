"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// Zod validation schema for creating a snippet
const CreateSnippetSchema = z.object({
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
  };

  return messages[field] || `${field}: ${firstError.message}`;
}

export async function createSnippet(formData: FormData) {
  try {
    // Simulate loading delay (optional - remove in production)
    // await new Promise((r) => setTimeout(r, 2000));

    // Extract form data
    const rawTitle = formData.get("title");
    const rawCode = formData.get("code");

    // Validate and parse input data
    const validated = CreateSnippetSchema.parse({
      title: rawTitle,
      code: rawCode,
    });

    // Create snippet in database
    const snippet = await db.snippet.create({
      data: {
        title: validated.title,
        code: validated.code,
      },
    });

    // Log success (optional)
    console.log(`Snippet created: ${snippet.id} - ${snippet.title}`);

    // Revalidate cached pages to reflect changes
    revalidatePath("/");
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return { error: getZodErrorMessage(error) };
    }

    // Return generic error message for other errors
    return { error: "Failed to create snippet. Please try again." };
  }
  // Redirect to home page after successful creation
  redirect("/");
}
