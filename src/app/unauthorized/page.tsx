import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="flex justify-center">
          <div className="p-4 bg-red-100 rounded-full">
            <ShieldAlert className="w-16 h-16 text-red-600" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-(--primary) tracking-tight">
            Unauthorized Access
          </h1>
          <p className="text-(--secondary)">
            Please log in to access this page. Your session may have expired or you are not authenticated.
          </p>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/login" 
            className="px-6 py-2.5 bg-(--ternary) text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Go to Login
          </Link>
          <Link 
            href="/" 
            className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
