"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Button } from "@/app/components/ui/button";

import { Input } from "@/app/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { Role } from "@prisma/client";
import useRoleStore from "@/app/zustand/models/userRoleStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

const formSchema = z.object({
  name: z.string({
    message: "Informe nome.",
  }),
  email: z
    .string({ message: "Informe um email." })
    .min(1, { message: "Infome um email." })
    .email("Informe um email válido."),
  password: z.string({
    message: "Informe uma senha.",
  }),
  roleId: z.string({
    message: "Selecione um cargo/título do novo usuário.",
  }),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const json = JSON.stringify(data);

    try {
      const response = await fetch("/api/create/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const result = await response.json();

      if (result.status === 200) {
        alert("User has been created.");
        window.location.reload();
      }
    } catch (error) {
      alert("Error");
      console.error("Error:", error);
    }
  };

  // Fetching roles
  const { roles, fetchRoles } = useRoleStore();

  const [currentRoles, setRole]: any = useState([]);

  const prevRolesRef = useRef<Role[]>();

  useEffect(() => {
    if (prevRolesRef.current !== roles) {
      setRole(roles);
      prevRolesRef.current = roles;
    }
  }, [roles]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          {/* User */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Nome"
                    onChange={field.onChange}
                    defaultValue={field.value}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

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

          {/* Roles */}
          <FormField
            control={form.control}
            name="roleId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cargo</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cargo..." />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {currentRoles.roles &&
                      currentRoles.roles.map((role: Role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Enviar</Button>
        </form>
      </Form>
    </main>
  );
};

export default Page;
