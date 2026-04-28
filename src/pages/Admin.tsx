import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default function Admin() {
  return (
    <div>
      <div className="fixed top-3 left-3 z-50">
        <Link to="/" className="px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-bold inline-flex items-center gap-1.5 shadow-soft">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to App
        </Link>
      </div>
      <AdminDashboard />
    </div>
  );
}