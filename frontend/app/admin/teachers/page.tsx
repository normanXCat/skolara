import { TeacherList } from "@/components/admin/teachers/TeacherList";
import { Suspense } from "react";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";

export const metadata = {
    title: "Gestion des Enseignants | Skolara Admin",
    description: "Équipe pédagogique et assignations",
};

export default function AdminTeachersPage() {
    return (
        <Suspense fallback={<TeachersLoading />}>
            <TeacherList />
        </Suspense>
    );
}

function TeachersLoading() {
    return (
        <div className="space-y-10">
            <div className="flex justify-between items-center">
                <div className="space-y-2">
                    <SkeletonReusable width={250} height={40} />
                    <SkeletonReusable width={350} height={20} />
                </div>
                <SkeletonReusable width={150} height={48} />
            </div>
            <div className="grid gap-4">
                {[...Array(6)].map((_, i) => (
                    <SkeletonReusable key={i} width="100%" height={80} />
                ))}
            </div>
        </div>
    );
}
