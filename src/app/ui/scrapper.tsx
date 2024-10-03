import {
  Card,
  CardHeader,
  Body1,
  Textarea,
  CardFooter,
  Button,
  TextareaProps,
  Input,
  Body1Strong,
} from "@fluentui/react-components";
import {
  BeakerSettingsFilled,
  DeleteDismissFilled,
} from "@fluentui/react-icons";
import React from "react";
import { Table } from "./table";

type singleProps = {
  type: "rule" | "ml" | "hybrid";
};

export const Scrapper = (props: singleProps) => {
  const [value, setValue] = React.useState("");

  const [result, setResult] = React.useState([]);
  const [positive, setPositive] = React.useState(0);
  const [negative, setNegative] = React.useState(0);

  const onChange = (ev: any, data: { value: React.SetStateAction<string> }) => {
    setValue(data.value);
  };

  async function hybrid_click() {
    const response = await fetch(`/api/sentiment?company=${value}`);
    const data = await response.json();

    setResult(data.results);
    setPositive(
      data.scores.reduce((acc, score) => acc + score.pos, 0) /
        data.scores.length
    );
    setNegative(
      data.scores.reduce((acc, score) => acc + score.neg, 0) /
        data.scores.length
    );
  }

  const analyze = () => {
    if (!value) {
      return;
    }
    if (props.type === "rule") {
      hybrid_click();
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
    <div className="flex flex-col gap-8 mt-2 ">
      <Card className="ml-20 mr-40">
        <CardHeader
          header={
            <Body1>Input name of company you want to analyze. woodcore</Body1>
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
    </div>
  );
};
