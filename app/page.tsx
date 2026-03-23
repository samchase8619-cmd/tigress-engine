import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">
      <div className="header">
        <h1>PES Engine UI</h1>
      </div>

      <div className="card">
        <p style={{ marginTop: 0 }}>
          This is the isolated PES Engine UI (Next.js App Router). It does not connect to the existing Express/static UI.
        </p>
        <p style={{ marginBottom: 0 }}>
          <Link href="/pes">Go to /pes →</Link>
        </p>
      </div>
    </main>
  );
}