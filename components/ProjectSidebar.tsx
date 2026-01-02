'use client'
import { Home, Inbox } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useParams, useSearchParams } from "next/navigation"

export default function ProjectSidebar() {
  const {key:secreatKey}=useParams()
  const searchParams=useSearchParams()
  const projectType=searchParams.get("type") as "web"|"others"
  const items = [
  {
    title: "Home",
    url: `/project/${secreatKey}?type=${projectType}`,
    icon: Home,
  },
  {
    title: "Discussion",
    url: `/project/${secreatKey}/discussion?type=${projectType}`,
    icon: Inbox,
  },
]
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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