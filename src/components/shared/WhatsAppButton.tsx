import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export interface WhatsAppConfig {
  phoneNumber: string;
  defaultMessage: string;
}

export const WHATSAPP_CONFIG: WhatsAppConfig = {
  phoneNumber: "8801798800096",
  defaultMessage: "Hello! I would like to know more about your services.",
};

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
  className?: string;
}

export default function WhatsAppButton({
  phoneNumber = WHATSAPP_CONFIG.phoneNumber,
  defaultMessage = WHATSAPP_CONFIG.defaultMessage,
  className = "",
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-24 right-6 z-50 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-(--whatsapp) text-(--white) shadow-lg transition-all duration-300 hover:scale-110 hover:bg-(--whatsapp-hover) hover:shadow-xl active:scale-95 focus:outline-none focus:ring-4 focus:ring-(--whatsapp)/40 ${className}`}
    >
      <FaWhatsapp className="h-8 w-8" />
    </a>
  );
}
