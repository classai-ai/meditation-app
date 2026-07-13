import { Suspense } from "react";
import SessionPage from "./SessionClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-primary" />}>
      <SessionPage params={params} />
    </Suspense>
  );
}
