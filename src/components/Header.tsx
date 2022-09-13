import Link from "next/link";

export function Header() {
  return (
    <header className="flex flex-row h-20 border-b border-neutral-700 py-5 pl-4 items-center">
      <div className="text-2xl mr-16 font-bold">Canastra</div>
      <nav className="flex flex-row space-x-4 justify-items-center">
        <div className="hover:underline hover:decoration-cyan-700">
          <Link href={"/"}>Home</Link>
        </div>
        <div className="hover:underline hover:decoration-cyan-700">
          <Link href={"/links"} className="ml-8">Links</Link>
        </div>
      </nav>
    </header>
  )
}
