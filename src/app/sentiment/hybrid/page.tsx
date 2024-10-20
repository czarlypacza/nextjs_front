import { Analyzer } from "@/app/ui/analyzer";
import { Breadcrumbs } from "@/app/ui/breadcrumb";
import { HybridFilled } from "@/app/ui/sidenav";

 
const breadcrumbs = [
  { text: "Sentiment Analysis", href: "/sentiment" },
  { text: "Hybrid approach", href: "/sentiment/hybrid", icon: <HybridFilled /> },
];

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
})  {

    return (
      <main>
        <Breadcrumbs breadcrumbs={breadcrumbs}></Breadcrumbs>
        <Analyzer type="hybrid" searchParams={searchParams}/>
      </main>
    );
  }