"use client";

import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import {
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  EyeOffIcon,
  TagIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/app/components/ui/badge";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface OccurrenceViewProps {
  anonymous: boolean;
  date: Date;
  description: string;
  id: string;
  tags: {
    id: string;
    name: string;
    slug: string;
  }[];
  user: {
    name: string;
    password: string;
    role: {
      id: string;
      name: string;
      slug: string;
    };
  };
}

const Page = ({ params }: { params: { id: string } }) => {
  const [occurrence, setOccurrence] = useState<OccurrenceViewProps>();

  const router = useRouter();

  useEffect(() => {
    const handleGetOccurrence = async () => {
      try {
        const response = await fetch(`/api/find/occurrence/${params.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const result = await response.json();

        setOccurrence(result.occurrence);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    handleGetOccurrence();
  }, [params.id]);

  const handleSetOccurrenceClassification = async (
    classificationId: "approved" | "rejected" | "pending",
  ) => {
    try {
      const response = await fetch(`/api/update/occurrence/${occurrence?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          statusId: classificationId === "pending" ? "pending" : "completed",
          classificationId,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      router.push("/home");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {occurrence && (
        <div className="mx-32 flex h-screen max-w-full flex-row">
          {/* Painel da esquerda */}
          <div className="flex h-full w-1/3 flex-col items-center gap-8 bg-[#fafafa] py-5">
            <Avatar className="h-80 w-80 text-2xl">
              <AvatarFallback className="text-6xl">
                {occurrence?.anonymous ? (
                  <EyeOffIcon size={60} />
                ) : (
                  occurrence?.user.name[0]
                )}
              </AvatarFallback>
            </Avatar>

            <div className="flex w-full flex-col justify-start gap-4 px-12">
              <div className="flex w-full flex-row justify-start gap-2">
                <CalendarIcon />

                <p>{format(occurrence?.date ?? new Date(), "dd/MM/yy")}</p>
              </div>

              <div className="flex w-full flex-row justify-start gap-2">
                <UserIcon />

                <p>
                  {`${occurrence?.anonymous ? "Anônimo" : occurrence?.user.name} | ${occurrence?.user.role.name}`}
                </p>
              </div>

              <div className="row-span-2 flex flex-row gap-2">
                <TagIcon className="min-w-6" />

                <div className="flex gap-1">
                  {occurrence?.tags.map((tag) => (
                    <Badge className="max-h-5" key={tag.id}>
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Painel da direita */}
          <div className="flex h-full w-2/3 flex-col gap-5 px-12 py-10">
            <p className="text-2xl font-semibold">Mensagem do usuário:</p>

            <div className="flex w-full flex-col gap-4">
              <div className="flex w-full flex-row justify-start gap-2">
                <p>{occurrence?.description}</p>
              </div>
            </div>

            <div className="flex w-full flex-row justify-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    className="rounded-full bg-yellow-300 p-3 hover:bg-yellow-500"
                    onClick={() => handleSetOccurrenceClassification("pending")}
                  >
                    <ClockIcon className="text-white" />
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>Deixar pendente</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger
                    className="rounded-full bg-red-500 p-3 hover:bg-red-600"
                    onClick={() =>
                      handleSetOccurrenceClassification("rejected")
                    }
                  >
                    <XIcon className="text-white" />
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>Não aprovar</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger
                    className="rounded-full bg-green-500 p-3 hover:bg-green-600"
                    onClick={() =>
                      handleSetOccurrenceClassification("approved")
                    }
                  >
                    <CheckIcon className="text-white" />
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>Aprovar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
