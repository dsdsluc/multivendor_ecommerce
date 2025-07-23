import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { User } from "@/generated/prisma";
import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    if (evt.type === "user.created" || evt.type === "user.updated") {
      const user: Partial<User> = {
        id: evt.data.id,
        email: evt.data.email_addresses[0].email_address || "",
        name: `${evt.data.first_name} ${evt.data.last_name}`,
        picture: evt.data.image_url,
        role: (typeof evt.data.private_metadata?.role === "string"
          ? evt.data.private_metadata.role
          : "USER") as User["role"],
      };
      if (!user) {
        console.error("User not found");
        return new Response("User not found", { status: 404 });
      }
      const dbUser = await db.user.upsert({
        where: { email: user.email },
        update: user,
        create: {
          id: user.id,
          name: user.name!,
          email: user.email!,
          picture: user.picture!,
          role: user.role || "USER",
        },
      });

      const client = await clerkClient();
      await client.users.updateUserMetadata(evt.data.id, {
        privateMetadata: {
          role: dbUser.role || "USER",
        },
      });
    }
    if (evt.type === "user.deleted") {
      const userId = evt.data.id;
      await db.user.delete({
        where: { id: userId },
      });
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
