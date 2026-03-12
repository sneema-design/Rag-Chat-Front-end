import Link from "next/link";

export default function NavBar() {
  const navItem = [
    { label: "SignUp", href: "/signup" },
  ];

  return (
    <nav className="w-full bg-gray-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        
        <h1 className="text-xl font-bold tracking-wide">RAG</h1>

        <div className="flex gap-6">
          {navItem.map((item, key) => (
            <Link
              key={key}
              href={item.href}
              className="hover:text-blue-400 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

      </div>
    </nav>
  );
}
