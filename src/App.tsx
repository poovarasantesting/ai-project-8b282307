import { Toaster } from "@/components/ui/toaster";
import { GoogleLogin } from "@/components/GoogleLogin";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-gray-500 mt-2">Sign in to access your account</p>
        </div>
        
        <GoogleLogin />
      </div>
      <Toaster />
    </div>
  );
}