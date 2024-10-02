import {
  Card,
  CardFooter,
  Button,
  Textarea,
  TextareaProps,
  CardHeader,
  Body1,
} from "@fluentui/react-components";
import { BeakerSettingsFilled, DeleteDismissFilled } from "@fluentui/react-icons";
import React from "react";

type singleProps = {
  type: "rule" | "ml" | "hybrid";
};

type Documents = {
  id: number;
  text: string;
  language: string;
}

export const Single = (props:singleProps) => {
  const [value, setValue] = React.useState("");

  const [result, setResult] = React.useState([]);

  const onChange: TextareaProps["onChange"] = (ev, data) => {
    if (data.value.length <= 50) {
      setValue(data.value);
    }
  };

  const analyzeSentiment = async (documents:Documents[]) => {
    const response = await fetch('/api/sentiment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ documents }),
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    const data = await response.json();
    return data.results;
  };

  const analyze = () => {
    if (!value) {
      return;
    }
    if(props.type === "rule") {
      analyzeSentiment([{id: 1, text: value, language: "en"}]).then((data) => {
        setResult(data);
      });
      
    } else if(props.type === "ml") {
      
    } else {
      
    }

  };

  const clear = () => {
    setValue("");
    setResult([]);
  };

  return (
    <>
      <Card>
        <CardHeader
          header={<Body1>Input sentence you want to analyze</Body1>}
        />
        <Textarea
          className="h-56"
          placeholder="Type here ..."
          size="large"
          value={value}
          onChange={onChange}
        />
        <CardFooter>
          <Button icon={<BeakerSettingsFilled fontSize={16} />} onClick={analyze}>Analyze</Button>
          <Button icon={<DeleteDismissFilled fontSize={16} />} onClick={clear}>Clear</Button>
        </CardFooter>
      </Card>

      <Card>
      {result.map((item, index) => (
        <div key={index}>
          <Body1>{item.sentence} | </Body1>
          <Body1>Positive: {item.pos} | </Body1>
          <Body1>Negative: {item.neg}</Body1>
        </div>
      ))}
      </Card>
    </>
  );
};
