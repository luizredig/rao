import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

const Menu = () => {
  return (
    <Card className="h-full min-w-[300px] rounded-none">
      <CardHeader>Menu</CardHeader>

      <CardContent className="flex flex-col gap-3">
        <Link href={"/home"}>
          <Button className="w-full">Início</Button>
        </Link>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Ocorrência</AccordionTrigger>

            <AccordionContent>
              <Link href={"/form/create/occurrence"}>
                <Button variant={"outline"} className="w-full">
                  Criar
                </Button>
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default Menu;
