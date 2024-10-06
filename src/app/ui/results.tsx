/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Card,
    Body1,
    Body1Strong,
  } from "@fluentui/react-components";
  import React from "react";
  import { Table } from "./table";
  
  type singleProps = {
    positive: number;
    negative: number;
    result: any;
  };
  

  export const Results = (props: singleProps) => {
 
  
    return (
      
          <>
            <div className="flex justify-center gap-5">
              <Card className="flex flex-col items-center">
                <Body1>Positive</Body1>
                <Body1Strong>{props.positive}</Body1Strong>
              </Card>
              <Card className="flex flex-col items-center">
                <Body1>Negative</Body1>
                <Body1Strong>{props.negative}</Body1Strong>
              </Card>
              <Card className="flex flex-col items-center">
                <Body1>Sentiment</Body1>
                <Body1Strong>
                  {props.positive > props.negative * -1
                    ? "Positive"
                    : props.positive < props.negative * -1
                    ? "Negative"
                    : "Neutral"}
                </Body1Strong>
              </Card>
            </div>
  
            <Table items={props.result} />
          </>
    );
  };
  