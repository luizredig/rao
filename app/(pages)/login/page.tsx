import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import Link from "next/link";
import Image from "next/image";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

const Page = () => {
  return (
    <>
      <div className="flex h-screen w-full flex-col sm:flex-row">
        {/* Left */}
        <div className="flex h-full w-full flex-col items-center justify-center gap-12 sm:w-1/2">
          {/* Title */}
          <p className="sm:text-2xl md:text-3xl">
            Bem-vindo(a) ao <span className="font-semibold">RAO</span>
          </p>

          <div className="relative flex h-48 w-1/2">
            {/* Green circle */}
            <div className="absolute left-[-50px] top-[-30px] h-32 w-32 rounded-full bg-green-400"></div>

            {/* Form */}
            <Card className="absolute z-[1] flex h-full w-full items-center justify-center bg-white/20 shadow-lg ring-1 ring-black/5 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex w-full items-center justify-center">
                  <Link href={"/home"}>
                    <Button>Entrar</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Yellow circle */}
            <div className="absolute bottom-[-20px] right-[-20px] h-24 w-24 rounded-full bg-yellow-400"></div>
          </div>
        </div>

        {/* Right */}
        <div className="hidden items-center justify-center bg-primary sm:flex sm:w-1/2">
          <Image
            src={"/undraw_learning_re_32qv.svg"}
            alt="Image"
            width={0}
            height={0}
            priority
            className="max-h-[70%] w-[70%]"
          />
        </div>
      </div>
    </>
  );
};

export default Page;
