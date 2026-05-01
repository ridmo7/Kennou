import Link from "next/link";

export function Footer() {
  return (
    <footer className="max-w-7xl mx-auto w-full px-6 md:px-16 py-10 border-t border-deep-purple/8 flex flex-col md:flex-row justify-between items-center gap-4">
      <Link href="/" className="text-xl font-extrabold text-deep-purple">
        Kennou<span className="text-coral">.</span>
      </Link>
      <ul className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
        <li><Link href="/about" className="text-gray-400 text-sm hover:text-gray-600 transition-colors">About</Link></li>
        <li><Link href="/faq" className="text-gray-400 text-sm hover:text-gray-600 transition-colors">FAQ</Link></li>
        <li><Link href="/success-stories" className="text-gray-400 text-sm hover:text-gray-600 transition-colors">Success Stories</Link></li>
        <li><Link href="#" className="text-gray-400 text-sm hover:text-gray-600 transition-colors">Privacy</Link></li>
        <li><Link href="#" className="text-gray-400 text-sm hover:text-gray-600 transition-colors">Terms</Link></li>
      </ul>
      <p className="text-sm text-gray-400">&copy; 2026 Kennou. All rights reserved.</p>
    </footer>
  );
}
