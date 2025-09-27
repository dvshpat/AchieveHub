import Profile from "@/components/Profile";
import SocialHandles from "@/components/SocialHandles";
import StudentDashboard from "@/components/StudentDashboard";

export default function Student() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section - First */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
          <p className="text-gray-600">Manage your certificates and professional profile</p>
        </header>
        
        {/* Main Content - Vertical Stack */}
        <div className="flex flex-col gap-8">
          <div>
            <Profile />
          </div>
          {/* StudentDashboard - Second */}
          <div>
            <StudentDashboard />
          </div>
          
          {/* SocialHandles - Third */}
          <div>
            <SocialHandles />
          </div>
        </div>
      </div>
    </div>
  );
}