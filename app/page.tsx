"use client";

import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";

export default function Home() {
  const router = useRouter();

  const init = useCallback(() => {
    router.push("/login");
  }, [router]);

  useEffect(() => {
    init();
  }, [init]);
}
