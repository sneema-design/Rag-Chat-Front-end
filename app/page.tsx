import HomeHero from "@/components/HomeHero";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <SidebarProvider>
      

        <HomeHero/>
    
    </SidebarProvider>
  );
}