import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { prismaClient } from "../lib/prisma";
import {
  BookmarkIcon,
  EyeOffIcon,
  MapPinIcon,
  MessageSquareTextIcon,
  TagIcon,
  UserIcon,
} from "lucide-react";
import { Badge } from "./ui/badge";

interface OccurrenceItemProps {
  occurrenceId: string;
}

const OccurrenceItem = async ({ occurrenceId }: OccurrenceItemProps) => {
  const occurrence = await prismaClient.occurrence.findUnique({
    where: {
      id: occurrenceId,
    },
    include: {
      user: true,
      location: true,
      category: true,
      tags: true,
    },
  });

  return (
    <Card className="relative flex h-40 w-full items-center overflow-hidden shadow-md">
      {/* Borda */}
      <div className="absolute h-full w-2 bg-primary"></div>

      {/* Conteúdo */}
      <CardContent className="flex flex-row items-center gap-4 p-6">
        {/* Imagem do usuário */}
        <Avatar className="h-20 w-20 text-2xl">
          <AvatarFallback>
            {occurrence?.anonymous ? <EyeOffIcon /> : occurrence?.user.name[0]}
          </AvatarFallback>
        </Avatar>

        <div className="grid grid-cols-3 grid-rows-2 gap-2">
          {/* Usuário */}
          <div className="flex flex-row gap-2">
            <UserIcon />

            <p>{occurrence?.anonymous ? "Anônimo" : occurrence?.user.name}</p>
          </div>

          {/* Localização */}
          <div className="flex flex-row gap-2">
            <MapPinIcon />

            <p>{occurrence?.location.description}</p>
          </div>

          {/* Tags */}
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

          {/* Categoria */}
          <div className="flex flex-row gap-2">
            <BookmarkIcon />

            <p>{occurrence?.category.name}</p>
          </div>

          {/* Mensagem */}
          <div className="flex flex-row gap-2">
            <MessageSquareTextIcon className="min-w-6" />

            <p className="truncate">{occurrence?.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OccurrenceItem;
