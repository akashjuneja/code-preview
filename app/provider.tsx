'use client'
import React, { useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider, ThemeProvider } from "next-themes"
import Header from '@/components/app-header/Header';
import { Message, MessageContext } from '@/context/MessageContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ConvexProvider, ConvexReactClient, useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { UserContext } from '@/context/UserContext';
import { AuthenticatedContent } from './AuthenticatedContent';

const Provider = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [message, setMessage] = useState<Message[]>([]);
  const [userDetails, setUserDetails] = useState<any>()
  const setMessages = (newMessages: Message[]) => {
    setMessage(newMessages); // Spread newMessages into the existing array
  };
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

  return (
    <ConvexProvider client={convex}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_KEY!}>
        <UserContext.Provider value={{ userDetails, setUserDetails }}>
          <MessageContext.Provider value={{ message, setMessages }}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <AuthenticatedContent setUserDetails={setUserDetails} />
              <Header />
              {children}
            </ThemeProvider>
          </MessageContext.Provider>
        </UserContext.Provider>
      </GoogleOAuthProvider>
    </ConvexProvider>
  )
}

export default Provider