
// labels.helpers.js
// Runtime helpers to transform label strings using marker keywords.
// Supports: _span_, _br_, _cap_, _upr_, _lwr_
// Usage: element.innerHTML = transformLabel(label, { locale: 'fr-FR' });

export const KEYWORDS = {
  Span: "_span_",
  NewLine: "_br_",
  Capital: "_cap_",
  Upper: "_upr_",
  Lower: "_lwr_",
};

// Capitalize first grapheme only (Unicode aware).
function capitalizeOnce(word, locale) {
  if (!word) return word;
  const chars = Array.from(word); // grapheme-safe
  chars[0] = chars[0].toLocaleUpperCase(locale);
  return chars.join("");
}

export function transformLabel(label, { locale = "fr-FR" } = {}) {
  if (label == null) return "";
  let out = String(label);

  // 1) New lines: "_br_" -> <br>
  if (KEYWORDS.NewLine) {
    const brRx = new RegExp(KEYWORDS.NewLine.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    out = out.replace(brRx, "<br>");
  }

  // 2) Casing markers on a single token (Unicode letters/numbers/hyphens)
  // Examples:
  //   "éducation_cap_" -> "Éducation"
  //   "api_upr_"       -> "API"
  //   "Services_lwr_"  -> "services"
  const CASE_ANY_RX = /([\p{L}\p{N}\-]+)_(cap|upr|lwr)_/u;
  const CASE_ALL_RX = /([\p{L}\p{N}\-]+)_(cap|upr|lwr)_/gu;
  const toCase = (w, op) => {
    switch (op) {
      case "cap": return capitalizeOnce(w, locale);
      case "upr": return w.toLocaleUpperCase(locale);
      case "lwr": return w.toLocaleLowerCase(locale);
      default: return w;
    }
  };
  // Loop to handle chained markers (rare but safe), e.g., "api_upr__cap_"
  while (CASE_ANY_RX.test(out)) {
    out = out.replace(CASE_ALL_RX, (_, pre, op) => toCase(pre, op));
  }

  // 3) Span markers: only wrap the segment before _span_, keep any suffix after it.
  //   "API_span_s" -> "<span>API</span>s"
  //   "Web_span_"  -> "<span>Web</span>"
  const SPAN_RX = /([\p{L}\p{N}\-]+)_span_([\p{L}\p{N}\-]*)/gu;
  out = out.replace(SPAN_RX, (_, pre, suf) => `<span>${pre}</span>${suf || ""}`);

  return out;
}

// Convenience alias if you only want span behavior
export function injectSpan(label) {
  if (label == null) return "";
  const SPAN_RX = /([\p{L}\p{N}\-]+)_span_([\p{L}\p{N}\-]*)/gu;
  return String(label).replace(SPAN_RX, (_, pre, suf) => `<span>${pre}</span>${suf || ""}`);
}

/* ------------------------------ Quick examples ------------------------------
transformLabel("Recent Web_span_ Projects");           // -> "Recent <span>Web</span> Projects"
transformLabel("Published API_span_s");                // -> "Published <span>API</span>s"
transformLabel("éducation_cap_");                      // -> "Éducation"
transformLabel("api_upr_");                            // -> "API"
transformLabel("Services_lwr_");                       // -> "services"
transformLabel("Line1_br_Line2");                      // -> "Line1<br>Line2"
------------------------------------------------------------------------------- */
