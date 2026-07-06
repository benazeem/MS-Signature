"use client";

import { Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function DeveloperCtas() {
  return (
    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
      <Button
        onClick={() =>
          window.open(
            "mailto:azeemkhandsari@gmail.com",
            "_blank",
            "noopener,noreferrer",
          )
        }
        variant="primary"
        className="gap-2"
      >
        <Mail size={16} /> Contact
      </Button>
      <Button
        onClick={() =>
          window.open(
            "https://wa.me/917895411144",
            "_blank",
            "noopener,noreferrer",
          )
        }
        variant="outline"
        className="gap-2"
      >
        <MessageCircle size={16} /> WhatsApp
      </Button>
    </div>
  );
}