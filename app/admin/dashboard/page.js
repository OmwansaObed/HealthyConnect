import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { redirect } from "next/navigation";
import AdminDashboardClient from "../../../components/admin/AdminDashboardClient";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== true) {
    redirect("/auth/login");
  }

  // Pass any server-side data as props if needed
  return <AdminDashboardClient />;
}
