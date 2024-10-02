import { Analyzer } from "@/app/ui/analyzer";
import { Breadcrumbs } from "@/app/ui/breadcrumb";
import { BookLetter20Filled } from "@fluentui/react-icons";

const breadcrumbs = [
  { text: "Sentiment Analysis", href: "/sentiment" },
  { text: "Rule-based", href: "/sentiment/rule", icon: <BookLetter20Filled /> },
];

export default async function Page() {

    return (
      <main>
        <Breadcrumbs breadcrumbs={breadcrumbs}></Breadcrumbs>
        <Analyzer type="rule"/>
      </main>
    );
  }