import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string, fullName: string, mobileNumber: string) => Promise<{ error: any }>;
  signIn: (emailOrMobile: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Only redirect to dashboard on explicit sign-in, not on session restoration
        if (event === 'SIGNED_IN' && session && !isInitialLoad) {
          // Check if there's a pending action to complete
          const pendingAction = localStorage.getItem('pendingAction');
          
          if (pendingAction) {
            // Don't navigate, let the component handle the pending action
            // The component will complete the action and stay on the same page
            return;
          }
          
          // No pending action, navigate to dashboard only if on auth/home page
          const currentPath = window.location.pathname;
          if (currentPath === '/' || currentPath === '/connect') {
            setTimeout(() => {
              navigate('/dashboard/student');
            }, 0);
          }
        }
        
        // Handle OAuth callback
        if (event === 'PASSWORD_RECOVERY') {
          // Handle password recovery if needed
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsInitialLoad(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate, isInitialLoad]);

  const signUp = async (email: string, password: string, fullName: string, mobileNumber: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
          mobile_number: mobileNumber,
        }
      }
    });

    if (!error) {
      toast({
        title: "Welcome aboard! 🎉",
        description: "Your account has been created successfully.",
      });
    }

    return { error };
  };

  const signIn = async (emailOrMobile: string, password: string) => {
    let email = emailOrMobile;
    
    // Check if input is a mobile number (10 digits)
    if (/^[0-9]{10}$/.test(emailOrMobile)) {
      // Query profiles table to get email for this mobile number
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('mobile_number', emailOrMobile)
        .single();
      
      if (profileError || !profile) {
        return { error: { message: 'Invalid mobile number or password' } };
      }
      
      email = profile.email;
    }
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
  };


  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (!error) {
      toast({
        title: "Password reset email sent",
        description: "Check your email for the password reset link.",
      });
    }

    return { error };
  };

  return (
    <AuthContext.Provider value={{ user, session, signUp, signIn, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
