// src/lib/useContact.js
import { useEffect, useState } from "react";
import { api } from "./api";

const FALLBACK = {
  email: "info@vlearn.sy",
  phone: "0994080102",
  whatsapp: "0994080102",
};

function syIntl(n) {
  const d = String(n || "").replace(/\D/g, "");
  if (!d) return "";
  if (d.startsWith("963")) return d;
  if (d.startsWith("00")) return d.slice(2);
  if (d.startsWith("0") && d.length >= 9) return "963" + d.slice(1);
  if (d.length === 9) return "963" + d;
  return d;
}

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

    (async () => {
      try {
        // نستخدم axios instance المهيّأ على VITE_API_BASE_URL
        const r = await api.get("/contact_us", {
          headers: { Accept: "application/json" },
        });

        // بعض الـ APIs ترجع { data: {...} } وبعضها ترجع الجسم مباشرة
        const j = r?.data;
        const d = j?.data ?? j ?? {};

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
        // fallback ثابت
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
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
