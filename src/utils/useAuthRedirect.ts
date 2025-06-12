"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const publicUserId = localStorage.getItem("publicUserId");

    if (!token && !publicUserId) {
      router.replace("/");
    }
  }, [router]);
};

export default useAuthRedirect;
