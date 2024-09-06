"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function creatOnRampTransaction(amount: number, provider: string) {
  console.log("Insid createonramptransaction");

  // always get id with nextauth not as props
  const session = await getServerSession(authOptions);
  // this token come from bank
  const token = Math.random().toString();
  const userId = session.user.id;
  if (!userId) {
    return {
      message: "User not logged in",
    };
  }
  await prisma.onRampTransaction.create({
    data: {
      userId: Number(userId),
      amount: amount,
      status: "Processing",
      startTime: new Date(),
      provider,
      token: token,
    },
  });
  return {
    message: "On ramp transaction added",
  };
}
