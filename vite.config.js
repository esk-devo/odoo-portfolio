import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import contactHandler from "./api/contact.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "contact-api-dev",
      configureServer(server) {
        server.middlewares.use("/api/contact", async (req, res) => {
          // Collect body
          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", async () => {
            try {
              req.body = body ? JSON.parse(body) : {};
            } catch {
              req.body = {};
            }
            // Express-like helpers
            res.status = (code) => {
              res.statusCode = code;
              return res;
            };
            res.json = (obj) => {
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(obj));
            };
            await contactHandler(req, res);
          });
        });
      },
    },
  ],
  server: {
    port: 2001,
    strictPort: true,
  },
});
