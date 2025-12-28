import React from 'react'
import ThemeProvider  from '../components/ThemeProvider';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

const Provider = async({children}:{children:React.ReactNode}) => {
    const session=await auth()
    return (
        <ThemeProvider 
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        </ThemeProvider>
    )
}

export default Provider