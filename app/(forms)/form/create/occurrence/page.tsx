"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Checkbox } from "@/app/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Calendar } from "@/app/components/ui/calendar";
import { Textarea } from "@/app/components/ui/textarea";
import { Switch } from "@/app/components/ui/switch";
import { Label } from "@/app/components/ui/label";

import { cn } from "@/app/lib/utils";
import { useToast } from "@/app/components/ui/use-toast";
import useUserStore from "@/app/zustand/models/useUserStore";
import useCategoryStore from "@/app/zustand/models/useCategoryStore";
import useLocationStore from "@/app/zustand/models/useLocationStore";
import useTagStore from "@/app/zustand/models/useTagStore";

import { User } from "@prisma/client";
import { Category } from "@prisma/client";
import { Location } from "@prisma/client";
import { Tag } from "@prisma/client";

const formSchema = z.object({
  user: z.string({
    message: "Informe o usuário.",
  }),
  category: z.string({
    message: "Selecione um categoria.",
  }),
  tags: z.array(z.string()).refine((value) => value.some((tag) => tag), {
    message: "Selecione no mínimo uma tag.",
  }),
  date: z.date({
    required_error: "Informe a data.",
  }),
  location: z.string({
    message: "Informe o local.",
  }),
  participants: z.array(z.string()).optional(),
  description: z
    .string({
      message: "A descrição é obrigatória.",
    })
    .min(50, {
      message: "A mensagem deve ter no mínimo 50 caracteres.",
    })
    .max(250, {
      message: "A mensagem deve ter no máximo 250 caracteres.",
    }),
  anonymous: z.boolean().default(false).optional(),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      anonymous: false,
      tags: [],
    },
  });

  const { toast } = useToast();

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    toast({
      title: "Occurrence submitted:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  // Fetching users
  const { users, fetchUsers } = useUserStore();

  const [currentUsers, setUsers]: any = useState([]);

  const prevUsersRef = useRef<User[]>();

  useEffect(() => {
    if (prevUsersRef.current !== users) {
      setUsers(users);
      prevUsersRef.current = users;
    }
  }, [users]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Fetching categories
  const { categories, fetchCategories } = useCategoryStore();

  const [currentCategories, setCategories]: any = useState([]);

  const prevCategoriesRef = useRef<Category[]>();

  useEffect(() => {
    if (prevCategoriesRef.current !== categories) {
      setCategories(categories);
      prevCategoriesRef.current = categories;
    }
  }, [categories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Fetching locations
  const { locations, fetchLocations } = useLocationStore();

  const [currentLocations, setLocations]: any = useState([]);

  const prevLocationsRef = useRef<Location[]>();

  useEffect(() => {
    if (prevLocationsRef.current !== locations) {
      setLocations(locations);
      prevLocationsRef.current = locations;
    }
  }, [locations]);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  // Fetching tags
  const category = form.watch("category");

  const { tags, fetchTags } = useTagStore();

  const [currentTags, setTags]: any = useState([]);

  const prevTagsRef = useRef<Tag[]>();

  useEffect(() => {
    if (prevTagsRef.current !== tags) {
      setTags(tags);
      prevTagsRef.current = tags;
    }
  }, [tags]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

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
            name="user"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuário</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o usuário..." />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {currentUsers.users &&
                      currentUsers.users.map((user: User) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria..." />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {currentCategories.categories &&
                      currentCategories.categories.map((category: Category) => (
                        <SelectItem key={category.id} value={category.slug}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tags */}
          {currentTags.tags && category === "occurrence" && (
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>

                  <FormDescription>
                    Selecione as tags que se aplicam
                  </FormDescription>

                  {currentTags.tags.map((tag: Tag) => (
                    <FormField
                      key={tag.id}
                      control={form.control}
                      name="tags"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={tag.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(tag.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, tag.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== tag.id,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>

                            <FormLabel className="font-normal">
                              {tag.name}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}

                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data</FormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ptBR })
                        ) : (
                          <span>Informe a data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Localização</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o local..." />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {currentLocations.locations &&
                      currentLocations.locations.map((location: Location) => (
                        <SelectItem key={location.id} value={location.id}>
                          {location.description}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>

                <Textarea
                  placeholder="Escreva tua mensagem aqui..."
                  className="resize-none"
                  {...field}
                />

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Anonymous */}
          <FormField
            control={form.control}
            name="anonymous"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="anonymous-occurrence"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />

                  <Label htmlFor="anonymous-occurrence">
                    Escrever anonimamente?
                  </Label>
                </div>

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
