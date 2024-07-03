"use client";

import { createContext, useContext, useState } from "react";
import React from "react";

/**
 * Interface for the Message context state.
 * It includes the current message and a function to display a message.
 */
interface IMessageContext {
  message: string | null;
  showMessage: (msg: string) => void;
}

/**
 * The MessageContext keeps track of the current message and provides a function to display a message.
 * It initializes with a null message and a noop showMessage function.
 */
const MessageContext = createContext<IMessageContext>({
  message: null,
  showMessage: () => {
    return null;
  },
});

/**
 * The MessageProvider component provides a context for the message state.
 * It holds the message state and the showMessage function which allows to set
 * and automatically clear the message after a certain duration.
 *
 * @param props - The properties passed to the MessageProvider, expects children elements.
 * @returns The MessageProvider wrapping the children elements.
 */
export function MessageProvider(props: { children: React.ReactNode }) {
  const { children } = props;
  const [message, setMessage] = useState<string | null>(null);
  const showMessage = (msg: string) => {
    setMessage(msg);
    // Automatically clear message after a duration
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <MessageContext.Provider value={{ message, showMessage }}>{children}</MessageContext.Provider>
  );
}

/**
 * The useMessage hook allows to access the current message and the showMessage function from the MessageContext.
 *
 * @returns The current message and the showMessage function.
 */
export function useMessage() {
  return useContext(MessageContext);
}
