
"use client";

import { useEffect } from "react";

export default function AOSProvider() {
  useEffect(() => {
    let active = true;

    async function initializeAOS() {
      const { default: AOS } = await import("aos");

      if (!active) return;

      AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        disableMutationObserver: false,
      });

      AOS.refreshHard();
    }

    initializeAOS();

    return () => {
      active = false;
    };
  }, []);

  return null;
}
