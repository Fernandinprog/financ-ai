import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data.table";
import { transactionColumns } from "./_columns/page";
import AddtransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const TransactionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/login");
  }
  const transactions = await db.transaction.findMany({
    where: {
      userId: userId,
    },
  });
  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddtransactionButton />
        </div>
        <DataTable columns={transactionColumns} data={transactions} />
      </div>
    </>
  );
};

export default TransactionPage;
