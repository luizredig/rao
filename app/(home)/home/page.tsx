import OccurrenceItem from "@/app/components/occurrence-item";
import { prismaClient } from "@/app/lib/prisma";

const Page = async () => {
  const pendingOccurrences = await prismaClient.occurrence.findMany({
    where: {
      statusId: "pending",
    },
  });

  const completedOccurrences = await prismaClient.occurrence.findMany({
    where: {
      statusId: "completed",
    },
  });

  return (
    <>
      <div className="flex h-full flex-col gap-8">
        <div className="mx-80 flex flex-col">
          <p className="mb-4 text-2xl font-semibold">Pendentes</p>

          {pendingOccurrences.length > 0 ? (
            <div className="flex flex-col gap-4">
              {pendingOccurrences.map((occurrence) => (
                <OccurrenceItem
                  key={occurrence.id}
                  occurrenceId={occurrence.id}
                />
              ))}
            </div>
          ) : (
            <div>Nenhuma ocorrência pendente.</div>
          )}
        </div>

        <div className="mx-80 flex flex-col">
          <p className="mb-4 text-2xl font-semibold">Concluídas</p>

          {completedOccurrences.length > 0 ? (
            <div className="flex flex-col gap-4">
              {completedOccurrences.map((occurrence) => (
                <OccurrenceItem
                  key={occurrence.id}
                  occurrenceId={occurrence.id}
                />
              ))}
            </div>
          ) : (
            <div>Nenhuma ocorrência concluída.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
