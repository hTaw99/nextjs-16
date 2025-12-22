import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex gap-4 items-center justify-center h-[100px] bg-gray-800 text-white">
        <Link prefetch href="/about">
          About
        </Link>
        <Link prefetch href="/contact">
          Contact
        </Link>
      </div>
    </div>
  );
}
