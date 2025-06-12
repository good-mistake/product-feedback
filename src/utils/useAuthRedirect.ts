"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useAuthRedirect = (id?: string) => {
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const checkAccess = async () => {
      const guestToken = localStorage.getItem("guestToken");
      const publicUserId = localStorage.getItem("publicUserId");

      if (!guestToken || !publicUserId) {
        router.replace("/");
        return;
      }

      const res = await fetch(`/api/verify-access?id=${id}`, {
        headers: {
          "x-guest-token": guestToken,
        },
      });

      if (res.status !== 200) {
        router.replace("/");
      }
    };

    checkAccess();
  }, [router, id]);
};

export default useAuthRedirect;
