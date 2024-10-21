/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from "react";
import Companies from "./companies";
import CompaniesSkeleton from "./skeletons/companiesSkeleton";
import { Scrapper } from "./scrapper";

type singleProps = {
    type: "rule" | "ml" | "hybrid";
    result: any;
    setResult: (result: any) => void;
    value: string;
    setValue: (value: string) => void;
    searchParams?: {
        query?: string;
        tags?: string;
      };
};

export default function ScrapperPage(props: singleProps) {


    return (
        <div className="flex flex-row mt-2 ">
             <div className="flex flex-col gap-8">
                <Suspense fallback={<CompaniesSkeleton />}>
                    <Companies searchParams={props.searchParams}/>
                </Suspense>
            </div>

            <Scrapper type={props.type}
                result={props.result}
                setResult={props.setResult}
                value={props.value}
                setValue={props.setValue} />

        </div>
    );
}