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

import { useGetAllChat } from "@/app/services/allChat/useAllChatService";
import { CreateChatDialog } from "./CreateChatDailog";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  setChatId: (id: number) => void;
};

export function AppSidebar({ setChatId, ...props }: AppSidebarProps) {
  const { data, isPending, isError,error } = useGetAllChat();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <CreateChatDialog setChatId={setChatId} />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Your Chats</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {isPending && (
                <SidebarMenuItem>
                  <SidebarMenuButton>Loading chats...</SidebarMenuButton>
                </SidebarMenuItem>
              )}

              {isError && (
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    {error?.message}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              {data?.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton onClick={() => setChatId(chat.id)}>
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
