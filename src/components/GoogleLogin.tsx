import { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { auth, googleProvider } from "@/lib/firebase";

export function GoogleLogin() {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Listen for auth state changes
  auth.onAuthStateChanged((user) => {
    setUser(user);
  });

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      toast({
        title: "Success!",
        description: "You have successfully logged in with Google.",
      });
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "There was a problem logging in with Google.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "There was a problem logging out.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {user ? (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            )}
            <div>
              <p className="font-medium">{user.displayName}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout} 
            disabled={loading}
          >
            {loading ? "Logging out..." : "Sign Out"}
          </Button>
        </div>
      ) : (
        <Button 
          onClick={handleGoogleLogin} 
          className="flex items-center gap-2" 
          disabled={loading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="w-5 h-5"
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
            <path fill="none" d="M1 1h22v22H1z" />
          </svg>
          {loading ? "Signing in..." : "Sign in with Google"}
        </Button>
      )}
    </div>
  );
}