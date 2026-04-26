import { prisma } from "../../prisma/client";
import { NotificationType } from "../../generated/prisma";

export async function createNotification({
  userId,
  type,
  content,
}: {
  userId: number;
  type: NotificationType;
  content: string;
}): Promise<void> {
  await prisma.notification.create({
    data: {
      userId,
      type,
      content,
    },
  });
}
