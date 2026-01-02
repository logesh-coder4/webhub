'use client'
import { MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle, NavbarButton, NavbarLogo } from "@/components/ui/resizable-navbar";
import { navItems } from "@/lib/constants";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "./ui/spinner";
import { logOut } from "@/actions/authUser";

const MobileNavbar = () => {
    const router=useRouter()
    const [isMobileMenuOpen,setIsMobileMenuOpen]=useState(false)
    const session=useSession()
    return (
        <MobileNav>
                <MobileNavHeader>
                    <NavbarLogo/>
                    <MobileNavToggle
                    isOpen={isMobileMenuOpen}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    />
                </MobileNavHeader>
        
                <MobileNavMenu
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                >
                    {navItems.map((item, idx) => (
                    <a
                        key={`mobile-link-${idx}`}
                        href={item.link}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="relative text-neutral-600 dark:text-neutral-300"
                    >
                        <span className="block">{item.name}</span>
                    </a>
                    ))}
                    <div className="flex w-full flex-col gap-4">
                    {session.status==="unauthenticated"?
                        (<> 
                    <NavbarButton
                        onClick={()=>{
                            setIsMobileMenuOpen(false)
                            router.push('/login')
                        }}
                        variant="primary"
                        className="w-full"
                    >
                        Login
                    </NavbarButton>
                    <NavbarButton
                        onClick={()=>{
                            setIsMobileMenuOpen(false)
                            router.push('/signup')
                        }}
                        variant="primary"
                        className="w-full"
                    >
                        Register
                    </NavbarButton></>):
                    session.status==="authenticated"?(
                        <>
                            <NavbarButton onClick={logOut}>LogOut</NavbarButton>
                           <NavbarButton href='/dashboard' variant="secondary">Dashboard</NavbarButton>
                            {session.data.user.isSuperUser && <NavbarButton variant="secondary" href='/admin/users' >Admin</NavbarButton>}                        </>
                    ):(
                        <div className="h-10 w-40 rounded border delay-75 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shadow animate-pulse duration-100 repeat-infinite">
                            <Spinner/>
                        </div>)
                    }
                    </div>
                </MobileNavMenu>
        </MobileNav>
    )
}

export default MobileNavbar