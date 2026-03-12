"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { SearchForm } from "@/components/search-form";
import { useGetAllChat } from "@/app/services/allChat/useAllChatService";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  setChatId: (id: number) => void;
};

export function AppSidebar({ setChatId, ...props }: AppSidebarProps) {
  const { data, isPending, isError } = useGetAllChat();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SearchForm />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Your Chats</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>

              {isPending && (
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    Loading chats...
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              {isError && (
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    Error loading chats
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              {data?.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton
                    onClick={() => setChatId(chat.id)}
                  >
                    {chat.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}