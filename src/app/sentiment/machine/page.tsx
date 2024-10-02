import { Breadcrumbs } from "@/app/ui/breadcrumb";
import { BrainCircuit20Filled } from "@fluentui/react-icons";


const breadcrumbs = [
  { text: "Sentiment Analysis", href: "/sentiment" },
  { text: "Machine Learning", href: "/sentiment/machine", icon: <BrainCircuit20Filled /> },
];

export default async function Page() {



    return (
      <main>
        {/* TODO: add breadcrumbs */}
        <Breadcrumbs breadcrumbs={breadcrumbs}></Breadcrumbs>
        
      </main>
    );
  }