"use client";
import { useState } from "react";
import ChatForm from "./ChatForm";
import NavBar from "./ui/navBar";
import { AppSidebar } from "./app-sidebar";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";

export default function HomeHero() {
  const [chatId, setChatId] = useState<number | null>(null);
  return (
    <>
    <SidebarProvider>
      <AppSidebar setChatId={setChatId} />
      <SidebarInset>
        <NavBar />

      <main className="p-6">
  {chatId && <ChatForm chatId={chatId} />}
</main>
      </SidebarInset>
      </SidebarProvider>
    </>
  );
}
