
import * as React from "react";
import { Card, Divider, Text } from "@fluentui/react-components";
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
        <Card className="overflow-y-scroll h-full w-full max-w-md">
            <div className="overflow-y-scroll overflow-x-clip h-full pr-4 relative" style={{ scrollbarWidth: "thin", scrollbarColor: "#AAAAAA transparent" }}>
                {/* <Field
                    label="Controlled SearchBox limiting the value to 20 characters"
                    // validationState={valid ? "none" : "warning"}
                    // validationMessage={valid ? "" : "Input is limited to 20 characters."}
                >
                    <SearchBox onChange={handleSearch} />
                </Field> */}

                <CompanySearch />
                <CompanyTags />
                <div >
                <div className="sticky -top-2  z-10 flex justify-between pt-3 ps-2 pb-2" style={{backgroundColor: 'var(--colorNeutralBackground1)'}}>
                        <Text size={400} weight="bold">
                            Company Name
                        </Text>
                        <Text size={400} weight="bold">
                            Number of Reviews
                        </Text>
                    </div>

                    {data.map((company: Company) => (
                        <>
                            <div key={company.id} className="flex  justify-between pt-3 ps-2">
                                <Text size={300} weight="regular" >
                                    {company.name}
                                </Text>
                                <Text size={300} weight="regular">
                                    {company.review_count}
                                </Text>
                            </div>
                            <Divider style={{zIndex:1}}/>
                        </>
                    ))}
                </div>
            </div>
        </Card>
    );
};