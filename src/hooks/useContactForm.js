import { useState } from "react";

// Handles the contact form submission to /api/contact.
export default function useContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [message, setMessage] = useState("");

  async function submit(payload) {
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setMessage(data.devMode ? "Sent (dev mode: logged to console)." : "Thanks! Your message has been sent.");
        return true;
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
        return false;
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network error. Please try again.");
      return false;
    }
  }

  function reset() {
    setStatus("idle");
    setMessage("");
  }

  return { status, message, submit, reset };
}
