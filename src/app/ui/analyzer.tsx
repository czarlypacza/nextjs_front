"use client";

import { Switch, SwitchOnChangeData } from "@fluentui/react-components";
import React from "react";
import { Single } from "./single";
import { Scrapper } from "./scrapper";

type analyzerProps = {
    type: "rule" | "ml" | "hybrid";
};

export const Analyzer = (props: analyzerProps) => {
  const [checked, setChecked] = React.useState(false);
  const [label, setLabel] = React.useState("Single sentence");

  const onChange = (
    ev: React.ChangeEvent<HTMLInputElement>,
    data: SwitchOnChangeData
  ) => {
    setChecked(data.checked);
    setLabel(data.checked ? "Scrapper" : "Single sentence");
  };

  return (
    <div>
      <Switch
        label={label}
        labelPosition="after"
        checked={checked}
        onChange={onChange}
      />

      {!checked ? <Single type={props.type} /> : <Scrapper />}
    </div>
  );
};
