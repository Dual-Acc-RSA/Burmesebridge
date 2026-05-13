export default function TestPage() {
  return (
    <main
      style={{
        padding: "40px",
      }}
    >
      <h1>Supabase Connected</h1>

      <p>
        URL:
        {process.env.NEXT_PUBLIC_SUPABASE_URL}
      </p>
    </main>
  );
}