import { SidebarProvider, SidebarMenuItem, SidebarMenu, SidebarMenuButton, SidebarMenuBadge, SidebarSeparator } from "@/components/ui/sidebar";
import { Bell, ChevronRight, CircleHelp, LogOut, MapPin, MessageSquareText, SettingsIcon } from "lucide-react";

const items = [
    {
        title: "Pilih Kota",
        url: "#",
        icon: MapPin,
    },
    {
        title: "Notifikasi",
        url: "#",
        icon: Bell,
    },
    {
        title: "Pengaturan",
        url: "#",
        icon: SettingsIcon,
    },
    {
        title: "FAQ",
        url: "#",
        icon: CircleHelp,
    },
    {
        title: "Saran dan Kritik",
        url: "#",
        icon: MessageSquareText,
    },
    {
        title: "Keluar",
        url: "#",
        icon: LogOut,
    },
]

const ProfileMenu = () => {
    return (
        <SidebarProvider className="pl-3 pr-3 pt-5">
            <SidebarMenu>
                <SidebarSeparator />
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild  size={"lg"}>
                            <a href={item.url}
                                style={{
                                    color: '#101828',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                }}>
                                <item.icon />
                                <span>{item.title}</span>
                                <SidebarMenuBadge>
                                    <ChevronRight size={"18"}/>
                                </SidebarMenuBadge>
                            </a>
                        </SidebarMenuButton>
                        <SidebarSeparator />
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarProvider>
    )
};
export default ProfileMenu;