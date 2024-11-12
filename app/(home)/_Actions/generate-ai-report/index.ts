"use server";

import { db } from "@/app/_lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import OpenAi from "openai";
import { GenerateAiReportSchema, generateAiReportSchema } from "./schema";

const DUMMY_REPORT =
  "### Relatório de Finanças Pessoais\n\n### Resumo geral das finanças\n As transações listadas foram analisadas e as seguintes informações foram extraidas para oferecer insights ssobre suas finanças:\n\n";

export const generateAiReport = async ({ month }: GenerateAiReportSchema) => {
  generateAiReportSchema.parse({ month });
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await clerkClient().users.getUser(userId);
  const hasPremium = user.publicMetadata.subscriptionPlan === "premium";
  if (!hasPremium) {
    throw new Error("User does not have premium");
  }
  if (!process.env.OPENAI_API_KEY) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return DUMMY_REPORT;
  }

  const openAi = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: new Date(`${month}-01`),
        lte: new Date(`${month}-31`),
      },
    },
  });
  const content = `Gere um relatório com insights sobre minhas finanças, com dicas e
   orientações de como melhorar minha vida financeira. 
   As transações estão dividas por ponto e virgula. 
   A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
  ${transactions
    .map(
      (transaction) =>
        `${transaction.date.toLocaleDateString("pt-BR")}-R$${transaction.amount}-${transaction.type}-${transaction.category}`,
    )
    .join(";")}`;
  const completion = await openAi.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Você e um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizarem melhor as suas finanças",
      },
      { role: "user", content },
    ],
  });
  return completion.choices[0].message.content;
};
