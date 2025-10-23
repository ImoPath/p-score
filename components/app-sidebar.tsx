"use client"

import { LayoutDashboard, Activity, Users, FileText, BarChart3, Shield } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  // {
  //   title: "Monitoring",
  //   icon: Activity,
  //   href: "/monitoring",
  // },
  {
    title: "Credit Scoring",
    icon: BarChart3,
    href: "/scoring",
  },
  // {
  //   title: "Customers",
  //   icon: Users,
  //   href: "/customers",
  // },
  {
    title: "Reports",
    icon: FileText,
    href: "/reports",
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-primary/20 bg-gradient-to-br from-primary to-primary/80 p-4">
        <Link href="/dashboard" className="flex items-center gap-2 text-primary-foreground">
          <Shield className="h-6 w-6" />
          <span className="font-bold text-lg">P-Score</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className="data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
