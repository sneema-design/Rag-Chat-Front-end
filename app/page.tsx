import HomeHero from "@/components/HomeHero";
import ProtectLayout from "@/components/ProtectLayout";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <ProtectLayout>
    <SidebarProvider>
      

        <HomeHero/>
    
    </SidebarProvider>
    </ProtectLayout>
  );
}