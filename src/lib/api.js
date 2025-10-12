// src/lib/api.js
import axios from "axios";

const envBase =
  import.meta.env.VITE_API_BASE_URL ?? import.meta.env.VITE_API_URL ?? "";
const baseURL = String(envBase).replace(/\/$/, "");

export const api = axios.create({
  baseURL: baseURL || undefined,
  timeout: 15000,
  headers: { Accept: "application/json" },
});

api.interceptors.request.use((cfg) => {
  const b = (cfg.baseURL || "").replace(/\/$/, "");
  let u = cfg.url || "";
  if (typeof u === "string") {
    if (!u.startsWith("/")) u = "/" + u;
    if (b.endsWith("/api") && /^\/api(\/|$)/i.test(u)) {
      u = u.replace(/^\/api/i, "");
      if (!u.startsWith("/")) u = "/" + u;
    }
    cfg.url = u;
  }
  return cfg;
});

if (import.meta.env.DEV) {
  console.log("[api] baseURL =", baseURL);
}
