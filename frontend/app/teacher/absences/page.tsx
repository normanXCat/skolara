import { RollCall } from "@/components/teacher/absences/RollCall";

export const metadata = {
    title: "Appel & Absences | Skolara Enseignant",
    description: "Saisie des absences en temps réel",
};

export default function TeacherAbsencesPage() {
    return <RollCall />;
}
