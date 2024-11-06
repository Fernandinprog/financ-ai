import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";

const Login = () => {
  return (
    <div className="grid h-full grid-cols-2">
      {/* Formulário de Login */}
      <div className="mx-auto flex h-full max-w-[500px] flex-col justify-center gap-4 p-8">
        <div className="flex items-center gap-2">
          <Image
            src={"/Logo.svg"}
            alt="Finance Ai logo"
            width={60}
            height={20}
            className="mb-8"
          />
          <h1 className="mb-3 font-sans text-2xl font-bold">finance.ai</h1>
        </div>

        <h1 className="text-4xl font-bold">Bem vindo</h1>
        <p className="text-muted-foreground">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
        <Button variant={"outline"} className="mr-2">
          <LogInIcon />
          Fazer Login ou criar a conta
        </Button>
      </div>

      {/* Imagem Login */}
      <div className="relative h-full w-full">
        <Image
          src={"/login.png"}
          alt="Faça seu Login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
