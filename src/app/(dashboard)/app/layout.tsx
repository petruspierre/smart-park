import Link from "next/link";

export default function DashboardPages({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-center border-b p-4">
        <Link href="/app">
          <img
            className="h-6 object-contain"
            draggable={false}
            src="/smartPark.svg"
            alt="Logo do Smart Park"
          />
        </Link>
      </header>
      <main className="flex flex-1 w-full max-w-5xl mx-auto px-4">
        {children}
      </main>
    </div>
  );
}
