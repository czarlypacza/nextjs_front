import AnalyzerSkeleton from "@/app/ui/skeletons/analyzerSkeleton";
import BreadcrumbsSkeleton from "@/app/ui/skeletons/breadcrumbsSkeleton";

export default function Loading() {
  return (
    <main>
      <BreadcrumbsSkeleton />
      <AnalyzerSkeleton />
    </main>
  );
  }