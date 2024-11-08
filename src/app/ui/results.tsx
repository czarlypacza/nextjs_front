/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Card,
    Body1,
    Body1Strong,
    Text,
  } from "@fluentui/react-components";
  import React from "react";
  import { Table } from "./table";
  
  type singleProps = {
    positive: number;
    negative: number;
    result: any;
    advanced: boolean;
  };
  

  export const Results = (props: singleProps) => {
    
  
    return (
      
          <>
            <div className="flex justify-center gap-5">
              <Card className="flex flex-col items-center">
                <Text size={400}>Sentiment</Text>
                <Text size={500} weight="semibold">
                  {props.positive > props.negative * -1
                    ? "Positive"
                    : props.positive < props.negative * -1
                    ? "Negative"
                    : "Neutral"}
                </Text>
              </Card>

              {props.advanced && <Card className="flex flex-col items-center" appearance="filled-alternative">
                <Body1>Positive</Body1>
                <Body1Strong>{props.positive.toFixed(6)}</Body1Strong>
              </Card>}
            
              {props.advanced && <Card className="flex flex-col items-center" appearance="filled-alternative">
                <Body1>Negative</Body1>
                <Body1Strong>{props.negative.toFixed(6)}</Body1Strong>
              </Card>}
            </div>
  
            <div className="flex justify-center flex-col gap-4 flex-grow">
              <Table items={props.result} advanced={props.advanced}/>
            </div>
          </>
    );
  };
  