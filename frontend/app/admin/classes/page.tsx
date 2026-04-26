import { ClassList } from "@/components/admin/classes/ClassList";
import { Suspense } from "react";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";

export const metadata = {
    title: "Gestion des Classes | Skolara Admin",
    description: "Structure pédagogique et effectifs",
};

export default function AdminClassesPage() {
    return (
        <Suspense fallback={<ClassesLoading />}>
            <ClassList />
        </Suspense>
    );
}

function ClassesLoading() {
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
