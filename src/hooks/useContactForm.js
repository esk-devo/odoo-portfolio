import { useState } from "react";
import { sendMessage } from "../lib/sendMessage";

// Handles the contact form submission (Web3Forms, no backend).
export default function useContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [message, setMessage] = useState("");

  async function submit(payload) {
    setStatus("sending");
    setMessage("");

    // Honeypot filled = bot. Pretend success, send nothing (saves the monthly quota).
    if (payload.botcheck) {
      setStatus("success");
      setMessage("Thanks! Your message has been sent.");
      return true;
    }

    try {
      await sendMessage(payload);
      setStatus("success");
      setMessage("Thanks! Your message has been sent.");
      return true;
    } catch (err) {
      setStatus("error");
      setMessage(
        err.message === "MISSING_KEY"
          ? "The form isn't available right now — please reach me on WhatsApp or email."
          : err.message === "Failed to fetch"
            ? "Network error. Please check your connection and try again."
            : err.message
      );
      return false;
    }
  }

  function reset() {
    setStatus("idle");
    setMessage("");
  }

  return { status, message, submit, reset };
}