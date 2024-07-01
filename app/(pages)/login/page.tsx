"use client";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import Image from "next/image";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/app/components/ui/input";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    email: z
      .string({ message: "Informe o email." })
      .email({ message: "E-mail inválido." }),
    password: z.string({ message: "Informe a senha." }),
  })
  .refine(
    async (data) => {
      const isValid = await checkEmailAndPassword(data.email, data.password);

      return isValid;
    },
    {
      message: "E-mail ou senha inválidos.",
      path: ["password"],
    },
  );

const checkEmailAndPassword = async (email: string, password: string) => {
  try {
    const response = await fetch(`/api/find/email/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const result = await response.json();

    const isPasswordCorrect = password === result.user.password;

    return isPasswordCorrect;
  } catch (error) {
    console.error("Error:", error);
  }
};

const Page = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    router.push("/home");
  };

  return (
    <>
      <div className="flex h-screen w-full flex-col sm:flex-row">
        {/* Left */}
        <div className="flex h-full w-full flex-col items-center justify-center gap-12 md:w-1/2">
          {/* Title */}
          <p className="md:text-3xl">
            Bem-vindo(a) ao <span className="font-semibold">RAO</span>
          </p>

          <div className="relative flex h-1/2 w-1/2 items-center justify-center">
            {/* Green circle */}
            <div className="absolute left-[-50px] top-[-30px] h-32 w-32 rounded-full bg-green-400"></div>

            {/* Form */}
            <Card className="absolute z-[1] flex h-full w-full min-w-72 items-center justify-center bg-white/20 shadow-lg backdrop-blur-xl">
              <CardContent className="p-5">
                <div className="flex w-full items-center justify-center">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(handleSubmit)}
                      className="flex flex-col gap-4"
                    >
                      {/* Email */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>

                            <FormControl>
                              <Input
                                placeholder="Email"
                                onChange={field.onChange}
                                defaultValue={field.value}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Password */}
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senha</FormLabel>

                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Senha"
                                onChange={field.onChange}
                                defaultValue={field.value}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit">Enviar</Button>
                    </form>
                  </Form>
                </div>
              </CardContent>
            </Card>

            {/* Yellow circle */}
            <div className="absolute bottom-[-20px] right-[-20px] h-24 w-24 rounded-full bg-yellow-400"></div>
          </div>
        </div>

        {/* Right */}
        <div className="hidden items-center justify-center bg-primary sm:w-1/2 md:flex">
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
