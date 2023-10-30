import Link from "next/link";

export default function UnauthenticatedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden invisible lg:block lg:visible lg:bg-gradient-to-t from-green-500 to-green-600"></div>

      <div className="p-12 w-full h-full flex flex-col items-center justify-center gap-12">
        <Link href="/">
          <img
            className='max-w-xs object-contain'
            draggable={false}
            src="/smartPark.svg"
            alt="Logo do Smart Park"
          />
        </Link>
        
        <div>
          {children}
        </div>
      </div>
    </main>
  )
}