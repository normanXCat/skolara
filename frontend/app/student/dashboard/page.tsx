import { StudentDashboardClient } from "@/components/student/dashboard/StudentDashboardClient";

export const metadata = {
  title: "Tableau de bord | Skolara Élève",
  description: "Consulte tes notes, ton planning et ta progression scolaire.",
};

export default function StudentDashboardPage() {
  return <StudentDashboardClient />;
}
