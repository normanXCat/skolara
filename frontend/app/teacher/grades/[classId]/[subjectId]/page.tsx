import { GradeEntryGrid } from "@/components/teacher/grades/GradeEntryGrid";

export const metadata = {
    title: "Saisie des Notes | Skolara Enseignant",
};

interface PageProps {
    params: {
        classId: string;
        subjectId: string;
    };
}

export default async function GradeEntryPage({ params }: PageProps) {
    const { classId, subjectId } = await params;
    return <GradeEntryGrid classId={parseInt(classId)} subjectId={parseInt(subjectId)} />;
}
