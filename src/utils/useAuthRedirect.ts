"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useAuthRedirect = (id?: string | undefined) => {
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const checkAccess = async () => {
      const token = localStorage.getItem("token");
      const publicUserId = localStorage.getItem("publicUserId");

      if (!token && !publicUserId) {
        router.replace("/");
        return;
      }

      const res = await fetch(`/api/verify-access?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
