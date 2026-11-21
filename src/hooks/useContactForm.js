import { useState } from "react";
import { sendMessage } from "../lib/sendMessage";
import { contactForm, countryCodes } from "../data/content";

// Joins the country dial code and the typed number into one international number.
// Returns "" when the phone is empty (optional), or null when it is invalid.
export function mergePhone(national, dial) {
  if (!national.trim()) return "";
  const digits = national.replace(/[\s\-()[\].]/g, "").replace(/^0+/, "");
  if (!/^\d{6,12}$/.test(digits)) return null;
  return `${dial} ${digits}`;
}

// Handles the contact form submission (Web3Forms, no backend).
export default function useContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [message, setMessage] = useState("");
  const [phoneCode, setPhoneCode] = useState(contactForm.phoneDefault); // e.g. "EG"
  const [phoneError, setPhoneError] = useState(false);

  async function submit(payload) {
    // Honeypot filled = bot: skip the phone check and fake success below.
    const dial = countryCodes.find((c) => c.code === payload.phoneCode)?.dial ?? "";
    const phone = mergePhone(payload.phone, dial);
    if (!payload.botcheck && phone === null) {
      setPhoneError(true);
      return false;
    }
    setPhoneError(false);

    setStatus("sending");
    setMessage("");

    // Honeypot filled = bot. Pretend success, send nothing (saves the monthly quota).
    if (payload.botcheck) {
      setStatus("success");
      setMessage("Thanks! Your message has been sent.");
      return true;
    }

    try {
      await sendMessage({ ...payload, phone });
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

  return { status, message, submit, reset, phoneCode, setPhoneCode, phoneError };
}
