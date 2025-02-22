import { NavDrawerDefault as SideNav } from "@/app/ui/sidenav";
import ParticlesBackground from "../ui/praticlesBackground";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className=" ">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12 z-10 no-scrollbar">
        {children} 
      </div>
      <ParticlesBackground />
    </div>
  );
}
