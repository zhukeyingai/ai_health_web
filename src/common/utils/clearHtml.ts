import DOMPurify from "dompurify";

const config = {
  FORBID_TAGS: ["script"],
};

export const clearHTML = (html: string) => DOMPurify.sanitize(html, config);
