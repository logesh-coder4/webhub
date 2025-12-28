import { BookOpen, ChevronDown, Globe, Home,MessageCircle,Users } from "lucide-react"

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
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { IconNotification } from "@tabler/icons-react"

// Menu items.
const links = {
    Home:[
        {
        title:"Users",
        url:"/admin/users",
        icon:Users
        },
        {
        title:"Testimonials",
        url:"/admin/testimonials",
        icon:Home
        },
        {
        title:"Blogs",
        url:"/admin/blogs",
        icon:BookOpen
        },
        {
        title:"Notifications",
        url:"/admin/notifications",
        icon:IconNotification
        },
    ],
    Projects:[
        {
        title:"WebProjects",
        url:"/admin/projects/web",
        icon:Globe
        },
        {
        title:"OtherProjects",
        url:"/admin/projects/others",
        icon:Home
        },
        {
        title:"Messages",
        url:"/admin/projects/messages",
        icon:MessageCircle
        },
    ]
}

export default function AdminSedebar() {
  return (
    <Sidebar collapsible="icon">
        <SidebarHeader className="flex justify-center pb-0">
            <h2 className="font-bold px-4 pt-1">AdminPanel</h2>
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            {Object.entries(links).map(([key,items],idx)=>{
                return(
                <Collapsible defaultOpen className="group/collapsible" key={idx}>
                    <SidebarGroup>
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger>{key}
                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>
                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title} className="hover:bg-[#252525] " >
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
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
                )
            })}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}