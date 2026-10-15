// Placeholder home page for the Phase 0 deploy. Member 2 replaces this with the real Home screen.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-3xl font-semibold">Hello, Ova_Care</h1>
      <p className="max-w-md text-base">
        Describe your symptoms in your own words and language. Coming soon.
      </p>
      <p className="max-w-md text-sm opacity-70">
        Ova_Care gives general information, not a diagnosis. Please see a doctor for advice about
        your health.
      </p>
    </main>
  );
}
