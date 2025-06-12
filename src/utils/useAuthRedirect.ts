"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useAuthRedirect = (id?: string) => {
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const checkAccess = async () => {
      let guestToken = localStorage.getItem("guestToken");
      let publicUserId = localStorage.getItem("publicUserId");

      if (!guestToken || !publicUserId) {
        const res = await fetch("/api/guest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userAgent: navigator.userAgent,
            guestToken: guestToken || null,
          }),
        });

        if (!res.ok) {
          router.replace("/");
          return;
        }

        const data = await res.json();
        guestToken = data.guestToken;
        publicUserId = data.publicUserId;

        if (guestToken) localStorage.setItem("guestToken", guestToken);
        if (publicUserId) localStorage.setItem("publicUserId", publicUserId);
      }

      // Verify access
      const accessRes = await fetch(`/api/verify-access?id=${id}`, {
        headers: {
          "x-guest-token": guestToken!,
        },
      });

      if (accessRes.status !== 200) {
        router.replace("/");
      }
    };

    checkAccess();
  }, [router, id]);
};

export default useAuthRedirect;
