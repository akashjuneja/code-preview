import { useEffect } from 'react';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';

export interface AuthenticatedContentType{
  setUserDetails:(user:any)=>void
}

export const AuthenticatedContent:React.FC<AuthenticatedContentType>=({ setUserDetails })=> {
  const convex = useConvex();

  useEffect(() => {
    isAuthenticated();
  }, []);

  const isAuthenticated = async () => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user")!);
      if (user?.email) {
        const result = await convex.query(api.users.GetUser, {
          email: user.email
        });
        console.log(result);
        setUserDetails(result);
      }
    }
  };

  return null; // This component doesn't render anything
}
