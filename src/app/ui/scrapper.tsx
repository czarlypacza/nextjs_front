/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardHeader,
  CardFooter,
  Button,
  Input,
  Text,
  Body1Stronger,
} from "@fluentui/react-components";
import {
  BeakerSettingsFilled,
  DeleteDismissFilled,
} from "@fluentui/react-icons";
import React, { Suspense, useEffect, useState } from "react";
import { Results } from "./results";
import ResultsSkeleton from "./skeletons/resultsSkeleton";
import Companies from "./companies";
import CompaniesSkeleton from "./skeletons/companiesSkeleton";

type singleProps = {
  type: "rule" | "ml" | "hybrid";
  result: any;
  setResult: (result: any) => void;
  value: string;
  setValue: (value: string) => void;
};

export const Scrapper = (props: singleProps) => {
  //const [value, setValue] = React.useState("");
  const [loading, setLoading] = useState(false);

  //const [result, setResult] = React.useState([]);
  const [positive, setPositive] = React.useState(0);
  const [negative, setNegative] = React.useState(0);

  const [value, setValue] = React.useState("");

  const onChange = (ev: any, data: { value: React.SetStateAction<string> }) => {
    setValue(data.value.toString());
  };

  useEffect(() => {
    let pos = 0;
    let neg = 0;

    props.result.map((item: { pos: any; neg: any }) => {
      pos += item.pos;
      neg += item.neg;
    });

    setPositive(pos / (props.result.length ? props.result.length : 1));
    setNegative(neg / (props.result.length ? props.result.length : 1));
  }, [props.result]);

  async function rule_click() {
    setLoading(true);
    const response = await fetch(`/api/rule?company=${value}`);
    const data = await response.json();

    props.setResult(data.results);
    return data;
  }

  async function hybrid_click() {
    setLoading(true);
    const response = await fetch(`/api/hybrid?company=${value}`);
    const data = await response.json();

    props.setResult(data.results);
    return data;
  }

  const analyze = () => {
    if (!value) {
      return;
    }
    if (props.type === "rule") {
      rule_click().then(() => setLoading(false));
    } else if (props.type === "ml") {
    } else {
      hybrid_click().then(() => setLoading(false));;
    }
  };

  const clear = () => {
    setValue("");
    props.setResult([]);
    setPositive(0);
    setNegative(0);
  };

  return (
    

      


      <div className="flex flex-col gap-8">
        <Card className="ml-20 mr-40">
          <CardHeader
            header={
              <Text size={500} weight="semibold">
                Input name of company you want to analyze. woodcore
              </Text>
            }
          />
          <Input
            value={value}
            onChange={onChange}
            size="large"
            placeholder="Type here ..."
            className=""
          />
          <CardFooter>
            <Button
              icon={<BeakerSettingsFilled fontSize={16} />}
              onClick={analyze}
              appearance="primary"
              disabled={loading}
            >
              Analyze
            </Button>
            <Button icon={<DeleteDismissFilled fontSize={16} />} onClick={clear}>
              Clear
            </Button>
          </CardFooter>
        </Card>
        {(props.result.length === 0 && loading == false) ? (
          <Card className="w-28 m-auto">
            <Body1Stronger>No results</Body1Stronger>
          </Card>
        ) : (
          loading == true ? (
            <ResultsSkeleton />
          ) : (
            <Results positive={positive} negative={negative} result={props.result} />
          )
        )}
      </div>
  );
};
