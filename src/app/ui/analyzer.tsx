"use client";

import { Switch, SwitchOnChangeData } from "@fluentui/react-components";
import React from "react";
import { Single } from "./single";
import ScrapperPage from "./scrapperPage";

type analyzerProps = {
  type: "rule" | "ml" | "hybrid";
  searchParams? : {
    query?: string;
    page?: string;
  };
};

export const Analyzer = (props: analyzerProps) => {
  const [checked, setChecked] = React.useState(false);
  const [label, setLabel] = React.useState("Single sentence");

  const [resultSingle, setResultSingle] = React.useState([]);
  const [valueSingle, setValueSingle] = React.useState("");

  const [resultScrapper, setResultScrapper] = React.useState([]);
  const [valueScrapper, setValueScrapper] = React.useState("");

  const onChange = (
    ev: React.ChangeEvent<HTMLInputElement>,
    data: SwitchOnChangeData
  ) => {
    setChecked(data.checked);
    setLabel(data.checked ? "Scrapper" : "Single sentence");
  };

  return (
    <div className="mt-6">
      <Switch
        label={label}
        labelPosition="after"
        checked={checked}
        onChange={onChange}
      />

      {!checked ? (
        <Single
          result={resultSingle}
          setResult={setResultSingle}
          type={props.type}
          value={valueSingle}
          setValue={setValueSingle}
        />
      ) : (
        <ScrapperPage
          result={resultScrapper}
          setResult={setResultScrapper}
          type={props.type}
          value={valueScrapper}
          setValue={setValueScrapper}
          searchParams={props.searchParams}
        />
      )}

      {/* <ResultsSkeleton /> */}
    </div>
  );
};
