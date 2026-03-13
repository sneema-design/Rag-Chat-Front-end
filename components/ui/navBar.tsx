"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ROUTES } from "@/app/constant/ROUTES";

export default function NavBar() {
  const navItem = [{ label: "Login", href: ROUTES.LOGIN }];
  const [userId, setUserId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);
  const handleOnclick = () => {
    localStorage.removeItemm("userId");
    setUserId("");
    // queryClient.clear()
  };
  return (
    <nav className="w-full bg-gray-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold tracking-wide">RAG</h1>

        <div className="flex gap-6">
          {navItem.map((item, key) => {
            const label =
              item.label === "Login"
                ? userId
                  ? "Logout"
                  : "Login"
                : item.label;

            return (
              <Link
                onClick={handleOnclick}
                key={key}
                href={item.href}
                className="hover:text-blue-400 transition-colors duration-200"
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
