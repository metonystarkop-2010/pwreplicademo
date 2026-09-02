import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/batches/$batchId")({
  component: () => <Outlet />,
});
