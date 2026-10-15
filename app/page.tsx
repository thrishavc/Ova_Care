"use client";

import dynamic from "next/dynamic";

// The frontend is a browser-only single-page app (localStorage, MediaRecorder), so render it
// on the client only.
const Root = dynamic(() => import("@/frontend/Root"), {
  ssr: false,
  loading: () => (
    <main className="flex min-h-screen items-center justify-center p-6 text-center">
      <p className="text-base">Loading Ova Care…</p>
    </main>
  ),
});

export default function Home() {
  return <Root />;
}
