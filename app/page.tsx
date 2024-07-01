"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const init = () => {
    router.push("/login");
  };

  init();
}
