import { Analyzer } from "@/app/ui/analyzer";
import { Breadcrumbs } from "@/app/ui/breadcrumb";
import { BrainCircuit20Filled } from "@fluentui/react-icons";


const breadcrumbs = [
  { text: "Sentiment Analysis", href: "/sentiment" },
  { text: "Machine Learning", href: "/sentiment/machine", icon: <BrainCircuit20Filled /> },
];

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    tags?: string;
  };
})  {
    return (
      <main>
        <Breadcrumbs breadcrumbs={breadcrumbs}></Breadcrumbs>
        <Analyzer type="ml" searchParams={searchParams}/>
      </main>
    );
  }