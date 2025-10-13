// src/lib/useContact.js
import { useEffect, useState } from "react";

/** ===== Defaults shown if API is unreachable ===== */
const FALLBACK = {
  email: "info@vlearn.sy",
  phone: "0994080102",
  whatsapp: "0994080102",
};

/** Normalize any Syrian number to international digits without + (e.g., 9639xxxxxxxx) */
function syIntl(n) {
  const d = String(n || "").replace(/\D/g, "");
  if (!d) return "";
  if (d.startsWith("963")) return d;
  if (d.startsWith("00")) return d.slice(2);
  if (d.startsWith("0") && d.length >= 9) return "963" + d.slice(1);
  if (d.length === 9) return "963" + d;
  return d;
}

/** Build a safe API base:
 * - In dev: default to `/api` (Vite proxy)
 * - In prod: default to absolute https://vlearn.sy/api (so Vercel won’t hit its own domain)
 */
const IS_DEV = import.meta.env.DEV;
const RAW_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  (IS_DEV ? "/api" : "https://vlearn.sy/api");
const API_BASE = String(RAW_BASE).trim().replace(/\/$/, "");
const CONTACT_URL = `${API_BASE}/contact_us`;

export default function useContact() {
  const [state, setState] = useState({
    loading: true,
    email: "",
    phone: "",
    whatsapp: "",
    mailHref: "",
    telHref: "",
    whatsappHref: "",
  });

  useEffect(() => {
    let cancelled = false;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15000); // 15s safety timeout

    (async () => {
      try {
        const r = await fetch(CONTACT_URL, {
          headers: { Accept: "application/json" },
          signal: ctrl.signal,
        });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);

        // Some backends wrap data under { data: {...} }
        const j = await r.json().catch(() => ({}));
        const d = j?.data && typeof j.data === "object" ? j.data : j || {};

        const email = d.email || FALLBACK.email;
        const phoneIntl = syIntl(d.phone || FALLBACK.phone);
        const waIntl = syIntl(d.whatsapp || d.phone || FALLBACK.whatsapp);

        if (!cancelled) {
          setState({
            loading: false,
            email,
            phone: phoneIntl,
            whatsapp: waIntl,
            mailHref: `mailto:${email}`,
            telHref: phoneIntl ? `tel:+${phoneIntl}` : "",
            whatsappHref: waIntl ? `https://wa.me/${waIntl}` : "",
          });
        }
      } catch {
        const p = syIntl(FALLBACK.phone);
        const w = syIntl(FALLBACK.whatsapp);
        if (!cancelled) {
          setState({
            loading: false,
            email: FALLBACK.email,
            phone: p,
            whatsapp: w,
            mailHref: `mailto:${FALLBACK.email}`,
            telHref: `tel:+${p}`,
            whatsappHref: `https://wa.me/${w}`,
          });
        }
      } finally {
        clearTimeout(timer);
      }
    })();

    return () => {
      cancelled = true;
      ctrl.abort();
      clearTimeout(timer);
    };
  }, []);

  return state;
}
