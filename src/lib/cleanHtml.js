// src/lib/cleanHtml.js
export function cleanWordHtml(raw) {
  if (!raw) return "";
  const parser = new DOMParser();
  const doc = parser.parseFromString(
    `<div id="root">${raw}</div>`,
    "text/html"
  );
  const root = doc.getElementById("root");

  const walker = doc.createTreeWalker(root, NodeFilter.SHOW_COMMENT, null);
  const comments = [];
  while (walker.nextNode()) comments.push(walker.currentNode);
  comments.forEach((n) => n.remove());
  root.querySelectorAll("o\\:p").forEach((n) => n.remove());

  root.querySelectorAll("*").forEach((el) => {
    if (el.hasAttribute("style")) {
      const style = el.getAttribute("style") || "";
      const cleaned =
        style
          .split(";")
          .map((s) => s.trim())
          .filter((s) => s && !/^mso-/i.test(s))
          .join("; ") || "";
      if (cleaned) el.setAttribute("style", cleaned);
      else el.removeAttribute("style");
    }
    if (el.className && /(^|\s)Mso/i.test(el.className))
      el.removeAttribute("class");
    if (el.hasAttribute("align")) el.removeAttribute("align");
    if (
      el.tagName === "SPAN" &&
      (el.textContent || "").replace(/\u00A0/g, " ").trim() === ""
    ) {
      el.remove();
    }
  });

  (function fixText(node) {
    node.childNodes.forEach((child) => {
      if (child.nodeType === 3) {
        let t = child.nodeValue || "";
        t = t.replace(/\u00A0|&nbsp;|&#160;/g, " ");
        t = t.replace(/ {2,}/g, " ");
        t = t.replace(/\s*-\s*/g, " - ");
        child.nodeValue = t;
      } else {
        fixText(child);
      }
    });
  })(root);

  root.querySelectorAll("p,h1,h2,h3,h4,h5,h6").forEach((el) => {
    if ((el.textContent || "").trim() === "") el.remove();
  });

  root.querySelectorAll("[style*='text-indent']").forEach((el) => {
    el.style.textIndent = "0";
  });

  return (root.innerHTML || "").trim();
}
