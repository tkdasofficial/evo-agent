import { createFileRoute } from "@tanstack/react-router";
import { EmptyPage } from "@/components/EmptyPage";

export const Route = createFileRoute("/import")({
  head: () => ({
    meta: [
      { title: "Import — Evo Agent" },
      { name: "description", content: "Bring existing repositories and projects into Evo." },
      { property: "og:title", content: "Import — Evo Agent" },
      { property: "og:description", content: "Bring existing repositories and projects into Evo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <EmptyPage title="Import" description="Bring existing repositories and projects into Evo." />,
});
