"use client";

import { useMessage } from "@/context/MessageContext/Index";

export default function MessageToast() {
  const { message } = useMessage();

  if (!message) {
    return null;
  }

  return (
    <div className="toast toast-center toast-top z-10">
      <div className="alert alert-success">
        <span>{message}</span>
      </div>
    </div>
  );
}
