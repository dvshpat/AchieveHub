// src/pages/HelpDesk.jsx
export default function HelpDesk() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Help Desk</h1>
      <p className="text-gray-600 mb-8">
        Need assistance? Our support team is here to help you with account 
        issues, recruiter queries, or student profile setup.
      </p>

      <form className="space-y-6 bg-white shadow-md rounded-xl p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea rows="4" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" required></textarea>
        </div>
        <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
          Submit
        </button>
      </form>
    </div>
  );
}
