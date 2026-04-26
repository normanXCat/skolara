import { AssignmentList } from "@/components/teacher/grades/AssignmentList";

export const metadata = {
    title: "Gestion des Notes | Skolara Enseignant",
    description: "Saisie et gestion des notes par classe et matière",
};

export default function TeacherGradesPage() {
    return <AssignmentList />;
}
