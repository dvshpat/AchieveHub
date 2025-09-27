import Profile from "@/components/Profile";
import SocialHandles from "@/components/SocialHandles";
import StudentDashboard from "@/components/StudentDashboard";

export default function Student() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="container mx-auto px-6 py-10 space-y-12">

        {/* Header */}
        <header className="text-center max-w-2xl mx-auto">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-3">
            Student Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your certificates, professional profile, and social handles in one place.
          </p>
        </header>

        {/* Profile + SocialHandles Side-by-Side */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Profile Section */}
          <section className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition duration-300">
            <Profile />
          </section>

          {/* Social Handles Section */}
          <section className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition duration-300">
            <SocialHandles />
          </section>

        </div>

        {/* Student Dashboard Section */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition duration-300">
          <StudentDashboard />
        </section>

      </div>
    </div>
  );
}
