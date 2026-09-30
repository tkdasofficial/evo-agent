import { createFileRoute } from "@tanstack/react-router";
import { EmptyPage } from "@/components/EmptyPage";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Evo Agent" },
      { name: "description", content: "Overview of your projects and agent activity." },
      { property: "og:title", content: "Dashboard — Evo Agent" },
      { property: "og:description", content: "Overview of your projects and agent activity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <EmptyPage title="Dashboard" description="Overview of your projects and agent activity." />,
});
