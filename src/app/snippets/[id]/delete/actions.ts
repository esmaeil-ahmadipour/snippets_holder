"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Validation schema for delete
const DeleteSnippetSchema = z.object({
  id: z.number().int().positive("Invalid snippet ID"),
});

export async function deleteSnippet(formData: FormData) {
  try {
    // Extract ID from form data
    const rawId = formData.get("id");

    if (!rawId) {
      return { error: "Snippet ID is required" };
    }

    // Validate ID
    const validated = DeleteSnippetSchema.parse({
      id: Number(rawId),
    });

    // Delete snippet from database
    await db.snippet.delete({
      where: { id: validated.id },
    });

    console.log(`Snippet deleted: ${validated.id}`);

    // Revalidate cached pages
    revalidatePath("/");
    revalidatePath(`/snippets/${validated.id}`);
  } catch (error) {
    console.error("Delete error:", error);

    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      return { error: firstError.message };
    }

    // Re-throw redirect error to let Next.js handle it
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }

    return { error: "Failed to delete snippet. Please try again." };
  }
  // Redirect to home page
  redirect("/");
}
