/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardHeader,
  CardFooter,
  Button,
  Input,
  Text,
  Body1Stronger,
  Field,
  Switch,
  SwitchOnChangeData,
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

  const [value, setValue] = React.useState(props.value);

  const [number, setNumber] = React.useState("500");

  const [label, setLabel] = React.useState("Simple mode");
  const [advanced, setAdvanced] = React.useState(false);

  const onChangeSwitch = (
    ev: React.ChangeEvent<HTMLInputElement>,
    data: SwitchOnChangeData
  ) => {
    setAdvanced(data.checked);
    setLabel(data.checked ? "Advanced mode" : "Simple mode");
  };

  const onChange = (ev: any, data: { value: React.SetStateAction<string> }) => {
    setValue(data.value.toString());
  };

  const onNumberChange = (ev: any, data: { value: React.SetStateAction<string> }) => {
    const maxReviews = process.env.NEXT_PUBLIC_MAX_REVIEWS!;
    console.log(maxReviews);
    if (parseInt(data.value.toString()) > parseInt(maxReviews)) {
      data.value = maxReviews;
    }
    setNumber(data.value.toString());
  }

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
    const response = await fetch(`/api/rule?company=${value}&limit=${number}`);
    const data = await response.json();
    console.log(data);

    props.setResult(data.results);
    return data;
  }

  async function hybrid_click() {
    setLoading(true);
    const response = await fetch(`/api/hybrid?company=${value}&limit=${number}`);
    const data = await response.json();

    props.setResult(data.results);
    return data;
  }

  async function ml_click() {
    setLoading(true);
    const response = await fetch(`/api/machine?company=${value}&limit=${number}`);
    const data = await response.json();
    console.log(data);

    props.setResult(data.results);
    return data;
  }

  const analyze = () => {
    if (!value) {
      return;
    }
    if (props.type === "rule") {
      rule_click().then(() => {
        setLoading(false);
        props.setValue(value);
      });
    } else if (props.type === "ml") {
      ml_click().then(() => {
        setLoading(false);
        props.setValue(value);
      });
    } else {
      hybrid_click().then(() => {
        setLoading(false);
        props.setValue(value);
      });;
    }
  };

  const clear = () => {
    setValue("");
    props.setValue("");
    props.setResult([]);
    setPositive(0);
    setNegative(0);
  };

  return (





    <div className="flex flex-col gap-4">
      <Card className="mr-10">
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
        <Field className="max-w-60" label="Max number of reviews">
          <Input
            value={number}
            onChange={onNumberChange}
            size="medium"
            placeholder="No limit"
            className=""
          />
        </Field>
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
          <Switch
            label={label}
            labelPosition="after"
            checked={advanced}
            onChange={onChangeSwitch}
          />
        </CardFooter>
      </Card>
      {(props.result.length === 0 && loading == false) ? (
        <Card className="w-28 m-auto mt-0 mb-0">
          <Body1Stronger>No results</Body1Stronger>
        </Card>
      ) : (
        loading == true ? (
          <ResultsSkeleton />
        ) : (
          <Results positive={positive} negative={negative} result={props.result} advanced={advanced} />
        )
      )}
    </div>
  );
};
