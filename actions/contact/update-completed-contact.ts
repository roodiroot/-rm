"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

export const updateComletedContact = async (
  confirmed: boolean,
  contactId: string
) => {
  try {
    await db.contact.update({
      where: { id: contactId },
      data: { confirmed },
    });
    revalidatePath("/companies/[id]/contacts/[contactId]", "page");
    revalidatePath("/companies/[id]", "page");
  } catch {
    return null;
  }
};
