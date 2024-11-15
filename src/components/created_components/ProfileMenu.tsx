import { SidebarProvider, SidebarMenuItem, SidebarMenu, SidebarMenuButton, SidebarMenuBadge, SidebarSeparator } from "@/components/ui/sidebar";
import { Bell, CircleHelp, LogOut, MapPin, MessageSquareText, SettingsIcon } from "lucide-react";

const items = [
    {
        title: "Pilih Kota",
        url: "#",
        icon: MapPin,
        badge: ">",
    },
    {
        title: "Notifikasi",
        url: "#",
        icon: Bell,
        badge: ">",
    },
    {
        title: "Pengaturan",
        url: "#",
        icon: SettingsIcon,
        badge: ">",
    },
    {
        title: "FAQ",
        url: "#",
        icon: CircleHelp,
        badge: ">",
    },
    {
        title: "Saran dan Kritik",
        url: "#",
        icon: MessageSquareText,
        badge: ">",
    },
    {
        title: "Keluar",
        url: "#",
        icon: LogOut,
        badge: ">",
    },
]

const ProfileMenu = () => {
    return (
        <SidebarProvider className="pl-3 pr-3 pb-10 pt-5">
            <SidebarMenu>
                <SidebarSeparator />
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                            <a href={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                                <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
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