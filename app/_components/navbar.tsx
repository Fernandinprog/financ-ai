"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="borber-b flex justify-between border-solid p-4 px-8">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" width={40} height={30} alt="finance Ai" />
        <Link href={"/"}>Dashboard</Link>
        <Link
          href={"/transactions"}
          className={
            pathname === "/transactions"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Transações
        </Link>
        <Link href={"/transactions"}>Assinatura</Link>
      </div>
      <UserButton showName />
    </nav>
  );
};

export default Navbar;
