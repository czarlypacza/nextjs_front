/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardFooter,
  Button,
  Textarea,
  TextareaProps,
  CardHeader,

  Text,
  Body1Stronger,
  SwitchOnChangeData,
  Switch,
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

type Documents = {
  id: number;
  text: string;
  language: string;
};

// const useStyles = makeStyles({
//   button: {
//     color: tokens.colorBrandStroke1,
//   },
// });

export const Single = (props: singleProps) => {
  //const style = useStyles();

  //const [value, setValue] = React.useState("");

  const [loading, setLoading] = useState(false);

  // const [result, setResult] = React.useState([]);
  const [positive, setPositive] = React.useState(0);
  const [negative, setNegative] = React.useState(0);

  useEffect(() => {
    let pos = 0;
    let neg = 0;

    props.result.map((item: { pos: number; neg: number; }) => {
      pos += item.pos;
      neg += item.neg;
    });

    setPositive(pos / (props.result.length ? props.result.length : 1));
    setNegative(neg / (props.result.length ? props.result.length : 1));
  }, [props.result]);

  const onChange: TextareaProps["onChange"] = (ev, data) => {
    props.setValue(data.value);
  };

  const analyzeSentiment = async (documents: Documents[]) => {
    setLoading(true);

    const response = await fetch("/api/rule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ documents }),
    });

    console.log(JSON.stringify({ documents }));

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.results;
  };

  const sentimentHybrid = async (text: string) => {
    setLoading(true);
    const response = await fetch("/api/hybrid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.results;
  };

  const sentimentMachine = async (text: string) => {
    setLoading(true);
    const response = await fetch("/api/machine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.results;
  }


  const analyze = () => {
    if (!props.value) {
      return;
    }
    if (props.type === "rule") {
      analyzeSentiment([{ id: 1, text: props.value, language: "en" }]).then(
        (data) => {
          props.setResult(data);
          setLoading(false);
        }
      );
    } else if (props.type === "ml") {
      sentimentMachine(props.value).then((data) => {
        props.setResult(data);
        setLoading(false);
      });
    } else {
      sentimentHybrid(props.value).then((data) => {
        props.setResult(data);
        setLoading(false);
      });
    }
  };

  const clear = () => {
    props.setValue("");
    props.setResult([]);
    setPositive(0);
    setNegative(0);
  };

  const [label, setLabel] = React.useState("SImple mode");
  const [advanced, setAdvanced] = React.useState(false);

  const onChangeSwitch = (
    ev: React.ChangeEvent<HTMLInputElement>,
    data: SwitchOnChangeData
  ) => {
    setAdvanced(data.checked);
    setLabel(data.checked ? "Advanced mode" : "Simple mode");
  };


  return (
    <div className="flex flex-col gap-8 mt-2">
      <Card>
        <CardHeader
          header={
            <Text size={500} weight="semibold">
              Input sentence you want to analyze. sample love positive. sample
              neutral
              {/* I can’t believe how amazing this day has been! The weather is just perfect today. I’m feeling a bit under the weather. This movie was absolutely fantastic! I’m not sure how I feel about this. The food at that restaurant was terrible. I had a wonderful time at the party. I’m really disappointed with the service. This book is so captivating! I don’t have any strong feelings about this. The concert was an unforgettable experience. I’m feeling quite neutral about the whole situation. The customer support was very helpful. I’m not impressed with the new update. This is the best coffee I’ve ever had! I’m feeling indifferent about the results. The new policy changes are very frustrating. I’m so excited for the weekend! The presentation was just okay. I’m really happy with my purchase. */}
            </Text>
          }
        />
        <Textarea
          className="h-56"
          placeholder="Type here ..."
          size="large"
          value={props.value}
          onChange={onChange}
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
          <Switch
            label={label}
            labelPosition="after"
            checked={advanced}
            onChange={onChangeSwitch}
          />
        </CardFooter>
      </Card>

      {(props.result.length === 0 && loading == false)? (
        <Card className="w-28 m-auto">
          <Body1Stronger>No results</Body1Stronger>
        </Card>
      ) : (

        loading == true ? (  
          <ResultsSkeleton  />
        ):(
          <Results positive={positive} negative={negative} result={props.result} advanced={advanced}/>
        )
        
      )}
    </div>
  );
};
