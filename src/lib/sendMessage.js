const WEB3FORMS_URL = "https://api.web3forms.com/submit";

export async function sendMessage({
  name,
  email,
  message,
  phone = "",
  company = "",
  botcheck = "",
}) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

  if (!accessKey) {
    throw new Error("MISSING_KEY");
  }

  const payload = {
    access_key: accessKey,
    subject: `New inquiry from ${name} — Shady El Agamy portfolio`,
    from_name: "Shady El Agamy Portfolio",
    name,
    email, // Web3Forms uses this as Reply-To automatically
    message,
    botcheck, // honeypot: real visitors leave it empty
  };

  // Optional fields: sent only when the visitor actually typed something
  if (company.trim()) payload.company = company.trim();
  if (phone.trim()) payload.phone = phone.trim();

  const res = await fetch(WEB3FORMS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }

  return data;
}