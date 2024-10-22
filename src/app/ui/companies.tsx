
import * as React from "react";
import { Card } from "@fluentui/react-components";
import CompanySearch from "./companySearch";
import { Company } from "@prisma/client";
import { CompanyTags } from "./companyTags";


export default async function Companies({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      tags?: string;
    };
  }) {
    const query = searchParams?.query || '';
    const tags = searchParams?.tags || '';
    //const [companies, setCompanies] = React.useState<any[]>([]);

    const data = await fetch(`/api/companies?query=${query}&tags=${tags}`).then((res) => res.json());

    // const searchParams = useSearchParams();
    //const pathname = usePathname();
    //const { replace } = useRouter();

    // function handleSearch(event: SearchBoxChangeEvent, data: { value: string }) {
    //   const term = data.value;
    //   const params = new URLSearchParams(searchParams);
    //   if (term) {
    //     params.set('query', term);
    //   } else {
    //     params.delete('query');
    //   }
    //   replace(`${pathname}?${params.toString()}`);
    // }

    return (
        <Card className="ml-20 mr-20 overflow-y-scroll h-full">
            <div className="overflow-y-scroll h-full" style={{ scrollbarWidth: "thin", scrollbarColor: "#AAAAAA transparent" }}>
                {/* <Field
                    label="Controlled SearchBox limiting the value to 20 characters"
                    // validationState={valid ? "none" : "warning"}
                    // validationMessage={valid ? "" : "Input is limited to 20 characters."}
                >
                    <SearchBox onChange={handleSearch} />
                </Field> */}

                <CompanySearch />
                <CompanyTags />
                
                {data.map((company: Company) => (
                    <div className="flex gap-4" key={company.id}>
                        <h2>
                            {company.name}
                        </h2>
                        <h3>
                            {company.review_count}
                        </h3>
                    </div>
                ))}
            </div>
        </Card>
    );
};