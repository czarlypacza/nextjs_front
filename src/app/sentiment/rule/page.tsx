import { Analyzer } from "@/app/ui/analyzer";
import { Breadcrumbs } from "@/app/ui/breadcrumb";
import Companies from "@/app/ui/companies";
import CompaniesSkeleton from "@/app/ui/skeletons/companiesSkeleton";
import { BookLetter20Filled } from "@fluentui/react-icons";
import { Suspense } from "react";

const breadcrumbs = [
  { text: "Sentiment Analysis", href: "/sentiment" },
  { text: "Rule-based", href: "/sentiment/rule", icon: <BookLetter20Filled /> },
];

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
})  {

  //await new Promise((resolve) => setTimeout(resolve, 2000));

    return (
      <main>
        <Breadcrumbs breadcrumbs={breadcrumbs}></Breadcrumbs>
       
        <Analyzer type="rule" searchParams={searchParams}/>
      </main>
    );
  }