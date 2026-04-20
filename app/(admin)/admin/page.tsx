export default function AdminDashboard() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
      <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
      <p className="text-slate-500 mt-2">Welcome, you have full access to Covenant clean co management.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-blue-600 font-semibold">Total Bookings</p>
          <p className="text-3xl font-bold text-blue-900">128</p>
        </div>
        {/* Add more stats here */}
      </div>
    </div>
  );
}