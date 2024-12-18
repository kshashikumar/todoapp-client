import Link from "next/link";
import { Logo } from "./icons/Logo";

export function Header() {
  return (
    <header className="flex items-center justify-center py-16">
      <Link href="/" className="flex items-center text-2xl font-bold">
        <Logo />
        <span className="text-2xl font-bold">
          <span className="text-[var(--title-primary)]">Todo </span>
          <span className="text-[var(--title-secondary)]">App</span>
        </span>
      </Link>
    </header>
  );
}
