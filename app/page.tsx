import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col justify-start bg-blue-600 sm:flex-row">
      <div className="h-1/3 w-full sm:h-full sm:w-1/2">
        <div className="h-12 w-full rounded-md border border-gray-100 bg-gray-400 bg-opacity-50 bg-clip-padding backdrop-blur-sm backdrop-filter"></div>
      </div>

      <div className="bottom-0 flex h-2/3 w-full items-center justify-center rounded-t-lg bg-white sm:right-0 sm:h-full sm:w-1/2 sm:rounded-l-lg sm:rounded-tr-none">
        <Image
          src={"/undraw_learning_re_32qv.svg"}
          alt="Image"
          width={0}
          height={0}
          className="max-h-[50%] w-[50%]"
        />
      </div>
    </div>
  );
}
