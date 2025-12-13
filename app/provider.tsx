import React from 'react'
import ThemeProvider  from '../components/ThemeProvider';
import { SessionProvider } from 'next-auth/react';
// import { SessionProvider } from 'next-auth/react';

const Provider = ({children}:{children:React.ReactNode}) => {
    return (
        <ThemeProvider 
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <SessionProvider>
                {children}
            </SessionProvider>
        </ThemeProvider>
    )
}

export default Provider