'use client'
import {useState } from 'react'
import { MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle, Navbar, NavbarButton, NavbarLogo, NavBody, NavItems } from "@/components/ui/resizable-navbar";
import { ModeToggle } from './ui/toggle-theme';
import { useSession } from 'next-auth/react';
import { logOut } from '@/actions/authUser';
import { usePathname } from 'next/navigation';
import { Spinner } from './ui/spinner';
import { navItems } from '@/lib/constants';


const NavigartionBar = () => {
    const session=useSession()
    const [isMobileMenuOpen,setIsMobileMenuOpen]=useState(false)
    const pathname=usePathname()
    if (pathname.includes('/project/')||pathname.includes('/admin')) return
    return(
        <Navbar className='fixed top-0'>
            <NavBody>
                <NavbarLogo title='WebHub'/>
                <NavItems items={navItems}/>
                <div className="flex items-center gap-4">
                    {session.status==="authenticated" ? <>
                    <NavbarButton onClick={logOut}>LogOut</NavbarButton>
                    <NavbarButton href='/dashboard' variant="secondary">Dashboard</NavbarButton>
                    </>:session.status==="unauthenticated"?(
                    <>
                        <NavbarButton variant='primary' href='/login'>Login</NavbarButton>
                        <NavbarButton variant='dark' href='/signup'>SignUp</NavbarButton>
                    </>):(
                        <div className="h-10 w-40 rounded border delay-75 bg-zinc-800 flex items-center justify-center shadow animate-pulse duration-100 repeat-infinite">
                            <Spinner/>
                        </div>
                    )
                    }
                    {
                        session.data?.user!.isSuperUser && <NavbarButton variant="secondary" href='/admin/users' >Admin</NavbarButton>
                    }
                    <ModeToggle/>
                </div>
            </NavBody>
            <MobileNav>
                <MobileNavHeader>
                    <NavbarLogo title='WebHub' />
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
                    <NavbarButton
                        onClick={() => setIsMobileMenuOpen(false)}
                        variant="primary"
                        className="w-full"
                    >
                        Login
                    </NavbarButton>
                    <NavbarButton
                        onClick={() => setIsMobileMenuOpen(false)}
                        variant="primary"
                        className="w-full"
                    >
                        Book a call
                    </NavbarButton>
                    </div>
                </MobileNavMenu>
            </MobileNav>
            {/* <Separator className='mt-3'/> */}
        </Navbar>   
    )
}

export default NavigartionBar