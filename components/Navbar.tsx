import { Navbar, NavbarButton, NavbarLogo, NavBody, NavItems } from "@/components/ui/resizable-navbar";
import { ModeToggle } from './ui/toggle-theme';
import { logOut } from '@/actions/authUser';
import { Spinner } from './ui/spinner';
import { navItems } from '@/lib/constants';
import { auth } from '@/auth';
import MobileNavbar from "./MobileNavbar";


const NavigartionBar = async() => {
    const session=await auth()
    
    return(
        <Navbar className='fixed top-0'>
            <NavBody>
                <NavbarLogo/>
                <NavItems items={navItems}/>
                <div className="flex items-center gap-4">
                    {session?.user? <>
                    <NavbarButton onClick={logOut}>LogOut</NavbarButton>
                    <NavbarButton href='/dashboard' variant="secondary">Dashboard</NavbarButton>
                    </>:!session?.user?(
                    <>
                        <NavbarButton variant='primary' href='/login'>Login</NavbarButton>
                        <NavbarButton variant='dark' href='/signup'>SignUp</NavbarButton>
                    </>):(
                        <div className="h-10 w-40 rounded border delay-75 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shadow animate-pulse duration-100 repeat-infinite">
                            <Spinner/>
                        </div>
                    )
                    }
                    {
                        session?.user!.isSuperUser && <NavbarButton variant="secondary" href='/admin/users' >Admin</NavbarButton>
                    }
                    <ModeToggle/>
                </div>
            </NavBody>
            <MobileNavbar/>
        </Navbar>   
    )
}

export default NavigartionBar