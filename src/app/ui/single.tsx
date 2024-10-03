import {
  Card,
  CardFooter,
  Button,
  Textarea,
  TextareaProps,
  CardHeader,
  Body1,
  Body1Strong,
} from "@fluentui/react-components";
import {
  BeakerSettingsFilled,
  DeleteDismissFilled,
} from "@fluentui/react-icons";
import React, { useEffect } from "react";
import { Table } from "./table";

type singleProps = {
  type: "rule" | "ml" | "hybrid";
};

type Documents = {
  id: number;
  text: string;
  language: string;
};

export const Single = (props: singleProps) => {
  const [value, setValue] = React.useState("");

  const [result, setResult] = React.useState([]);
  const [positive, setPositive] = React.useState(0);
  const [negative, setNegative] = React.useState(0);

  useEffect(() => {
    let pos = 0;
    let neg = 0;

    result.map((item) => {
      pos += item.pos;
      neg += item.neg;
    });

    setPositive(pos / (result.length ? result.length : 1));
    setNegative(neg / (result.length ? result.length : 1));
  }, [result]);

  const onChange: TextareaProps["onChange"] = (ev, data) => {
    setValue(data.value);
  };

  const analyzeSentiment = async (documents: Documents[]) => {
    const response = await fetch("/api/sentiment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ documents }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.results;
  };

  const analyze = () => {
    if (!value) {
      return;
    }
    if (props.type === "rule") {
      analyzeSentiment([{ id: 1, text: value, language: "en" }]).then(
        (data) => {
          setResult(data);
        }
      );
    } else if (props.type === "ml") {
    } else {
    }
  };

  const clear = () => {
    setValue("");
    setResult([]);
    setPositive(0);
    setNegative(0);
  };

  return (
    <div className="flex flex-col gap-8 mt-2">
      <Card>
        <CardHeader
          header={
            <Body1>
              Input sentence you want to analyze. sample love positive. sample
              neutral
            </Body1>
          }
        />
        <Textarea
          className="h-56"
          placeholder="Type here ..."
          size="large"
          value={value}
          onChange={onChange}
        />
        <CardFooter>
          <Button
            icon={<BeakerSettingsFilled fontSize={16} />}
            onClick={analyze}
          >
            Analyze
          </Button>
          <Button icon={<DeleteDismissFilled fontSize={16} />} onClick={clear}>
            Clear
          </Button>
        </CardFooter>
      </Card>

      <div className="flex justify-center gap-5">
        <Card>
          <Body1>Positive</Body1>
          <Body1Strong>{positive}</Body1Strong>
        </Card>
        <Card>
          <Body1>Negative</Body1>
          <Body1Strong>{negative}</Body1Strong>
        </Card>
      </div>

      <Table items={result} />

      {/* {result.map((item, index) => (
          <Card key={index}>
            <Body1>{item.sentence} | </Body1>
            <Body1>Positive: {item.pos} | </Body1>
            <Body1>Negative: {item.neg}</Body1>
          </Card>
        ))} */}
    </div>
  );
};
