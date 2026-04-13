import { Metadata } from "next";

export const metadata: Metadata = {
  themeColor: "#d4af37",
};

export default function viewport() {
  return [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover",
    },
    {
      name: "theme-color",
      content: "#d4af37",
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "default",
    },
  ];
}
