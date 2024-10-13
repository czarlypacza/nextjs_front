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
import React, { useEffect, useState } from "react";
import { Results } from "./results";
import ResultsSkeleton from "./skeletons/resultsSkeleton";

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

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("http://192.168.0.140:5000/companies")
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
      });
  }, []);

  const onChange = (ev: any, data: { value: React.SetStateAction<string> }) => {
    props.setValue(data.value.toString());
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
    const response = await fetch(`/api/rule?company=${props.value}`);
    const data = await response.json();

    props.setResult(data.results);
    return data;
  }

  async function hybrid_click() {
    setLoading(true);
    const response = await fetch(`/api/hybrid?company=${props.value}`);
    const data = await response.json();

    props.setResult(data.results);
    return data;
  }

  const analyze = () => {
    if (!props.value) {
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
    props.setValue("");
    props.setResult([]);
    setPositive(0);
    setNegative(0);
  };

  return (
    <div className="flex flex-col gap-8 mt-2 ">

      <Card className="ml-20 mr-40 max-h-32 overflow-y-scroll">
        
        <div className="ml-20 mr-40 max-h-32 overflow-y-scroll ">
        {companies.map((company: any) => (
          <div className="flex gap-4" >
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


      <Card className="ml-20 mr-40">
        <CardHeader
          header={
            <Text size={500} weight="semibold">
              Input name of company you want to analyze. woodcore
            </Text>
          }
        />
        <Input
          value={props.value}
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
