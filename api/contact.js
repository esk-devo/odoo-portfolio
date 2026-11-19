// Vercel serverless function: POST /api/contact
// Also imported by the Vite dev server middleware (see vite.config.js).
import "dotenv/config";

import nodemailer from "nodemailer";

// --- Simple in-memory rate limiter (per instance) ---
const hits = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= MAX_HITS) {
    hits.set(ip, arr);
    return true;
  }
  arr.push(now);
  hits.set(ip, arr);
  return false;
}

function allowedOrigins() {
  const fromEnv = (process.env.CLIENT_ORIGIN || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return new Set([...fromEnv, "http://localhost:2001", "http://localhost:5173", "http://127.0.0.1:2001"]);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req, res) {
  // Only POST
  if (req.method !== "POST") {
    res.status(405).json({ success: false, message: "Method not allowed" });
    return;
  }

  // Origin check
  const origin = req.headers.origin;
  if (origin && !allowedOrigins().has(origin)) {
    res.status(403).json({ success: false, message: "Origin not allowed" });
    return;
  }

  // Rate limit by IP
  const ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  if (rateLimited(ip)) {
    res.status(429).json({ success: false, message: "Too many requests. Please try again later." });
    return;
  }

  const { name, email, message, website } = req.body || {};

  // Honeypot
  if (website) {
    res.status(200).json({ success: true });
    return;
  }

  // Validation
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    res.status(400).json({ success: false, message: "Please enter your name." });
    return;
  }
  if (!email || !isValidEmail(email)) {
    res.status(400).json({ success: false, message: "Please enter a valid email." });
    return;
  }
  if (!message || typeof message !== "string" || message.trim().length < 5) {
    res.status(400).json({ success: false, message: "Please enter a message (at least 5 characters)." });
    return;
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    // Dev mode
    console.log("----- CONTACT FORM (dev mode, no SMTP) -----");
    console.log("From:", cleanName, "<" + cleanEmail + ">");
    console.log("Message:", cleanMessage);
    console.log("-------------------------------------------");
    res.status(200).json({ success: true, devMode: true });
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: smtpUser, pass: smtpPass },
    });

    const toAddress = process.env.CONTACT_TO || smtpUser;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${smtpUser}>`,
      to: toAddress,
      replyTo: cleanEmail,
      subject: `New contact message from ${cleanName}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`,
      html: `<h2>New contact message</h2><p><strong>Name:</strong> ${cleanName}</p><p><strong>Email:</strong> ${cleanEmail}</p><p><strong>Message:</strong></p><p>${cleanMessage.replace(/\n/g, "<br/>")}</p>`,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
  }
}
