// components/Companies.tsx

import * as React from "react";
import { Card, Text } from "@fluentui/react-components";
import { fetchCompanies } from '@/app/api/companies/route';


export default async function Companies() {

    // const [companies, setCompanies] = useState<any[]>([]);
    // useEffect(() => {
    //     fetchCompanies().then(data => setCompanies(data));
    // }, []);

    const companies = await fetchCompanies();
    

    return (
        <Card className="ml-20 mr-20 overflow-y-scroll">
            <div className="max-h-96 overflow-y-scroll">
                {companies.map((company: any) => (
                    <div className="flex gap-4" key={company.id}>
                        <Text size={500} weight="semibold">
                            {company[0]}
                        </Text>
                        <Text size={500} weight="semibold">
                            {company[1]}
                        </Text>
                    </div>
                ))}
            </div>
        </Card>
    );
};