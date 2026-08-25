/** @format */
"use client";

import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src*="businessrobots.ai/webchat/plugin.js"]',
    );

    if (existingScript) {
      if (window.ktt10) {
        window.ktt10.setup({
          id: "6bfJDgs5VNQi",
          accountId: "4518857",
          color: "#1D4ED8",
        });
      }
      return;
    }

    const script1 = document.createElement("script");
    script1.src = "https://app.businessrobots.ai/webchat/plugin.js?v=6";
    script1.async = true;
    document.body.appendChild(script1);

    script1.onload = () => {
      if (window.ktt10) {
        const script2 = document.createElement("script");
        script2.textContent = window.ktt10.setup({
          id: "6bfJDgs5VNQi",
          accountId: "4518857",
          color: "#1D4ED8",
        });
        document.body.appendChild(script2);
      }
    };
  }, []);

  return null;
};

export default Chatbot;
