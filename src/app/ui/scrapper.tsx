/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardHeader,
  Body1,
  CardFooter,
  Button,
  Input,
  Body1Strong,
  Text,
  Body1Stronger,
} from "@fluentui/react-components";
import {
  BeakerSettingsFilled,
  DeleteDismissFilled,
} from "@fluentui/react-icons";
import React, { useEffect } from "react";
import { Table } from "./table";

type singleProps = {
  type: "rule" | "ml" | "hybrid";
  result: any;
  setResult: (result: any) => void;
  value: string;
  setValue: (value: string) => void;
};

export const Scrapper = (props: singleProps) => {
  //const [value, setValue] = React.useState("");

  //const [result, setResult] = React.useState([]);
  const [positive, setPositive] = React.useState(0);
  const [negative, setNegative] = React.useState(0);

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
    const response = await fetch(`/api/rule?company=${props.value}`);
    const data = await response.json();

    props.setResult(data.results);
  }

  async function hybrid_click() {
    const response = await fetch(`/api/hybrid?company=${props.value}`);
    const data = await response.json();

    props.setResult(data.results);
  }

  const analyze = () => {
    if (!props.value) {
      return;
    }
    if (props.type === "rule") {
      rule_click();
    } else if (props.type === "ml") {
    } else {
      hybrid_click();
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
          >
            Analyze
          </Button>
          <Button icon={<DeleteDismissFilled fontSize={16} />} onClick={clear}>
            Clear
          </Button>
        </CardFooter>
      </Card>

      {props.result.length === 0 ? (
        <Card className="w-28 m-auto">
          <Body1Stronger>No results</Body1Stronger>
        </Card>
      ) : (
        <>
          <div className="flex justify-center gap-5">
            <Card className="flex flex-col items-center">
              <Body1>Positive</Body1>
              <Body1Strong>{positive}</Body1Strong>
            </Card>
            <Card className="flex flex-col items-center">
              <Body1>Negative</Body1>
              <Body1Strong>{negative}</Body1Strong>
            </Card>
            <Card className="flex flex-col items-center">
              <Body1>Sentiment</Body1>
              <Body1Strong>
                {positive > negative * -1
                  ? "Positive"
                  : positive < negative * -1
                  ? "Negative"
                  : "Neutral"}
              </Body1Strong>
            </Card>
          </div>

          <Table items={props.result} />
        </>
      )}
    </div>
  );
};
