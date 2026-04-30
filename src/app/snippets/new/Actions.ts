"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";

export async function createSnippet(formData: FormData) {
  await new Promise((r) => setTimeout(r, 2000)); // Simulate loading delay

  const title = formData.get("title") as string;
  const code = formData.get("code") as string;

  const snippet = await db.snippet.create({
    data: {
      title,
      code,
    },
  });

  console.log(`Snippet created: ${snippet.id} - ${snippet.title}`);
  redirect("/");
}
