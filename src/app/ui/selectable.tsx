"use client";

import * as React from "react";
import { clsx } from "clsx";
import {
  makeStyles,
  Button,
  tokens,
  Text,
} from "@fluentui/react-components";
import {
  Card,
  CardHeader,
  CardPreview,
} from "@fluentui/react-components";
import Link from "next/link";


const useStyles = makeStyles({
  card: {
    width: "32%",
    maxWidth: "100%",
    height: "fit-content",
  },

  caption: {
    color: tokens.colorNeutralForeground3,
  },

  smallRadius: {
    borderRadius: tokens.borderRadiusSmall,
  },

  grayBackgroundSelected: {
    backgroundColor: tokens.colorSubtleBackgroundInverted,
    maxHeight: "500px" /* Set a reasonable max-height */,
    overflow: "hidden",
    transition: "max-height 0.5s ease-in-out, padding 0.6s ease-out",
    padding: "1.2rem",
  },

  grayBackground: {
    backgroundColor: tokens.colorSubtleBackgroundInverted,
    maxHeight: 0,
    overflow: "hidden",
    padding: "0 1.2rem",
    transition: "max-height 0.5s ease-in-out, padding 0.6s ease-out",
  },

  logoBadge: {
    padding: "5px",
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground3,
    boxShadow:
      "0px 1px 2px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12)",
  },
});

type selectableProps = {
  text: string;
  logo: React.ReactNode;
  href: string;
  children?: React.ReactNode;
};

export const Selectable = (props: selectableProps) => {
  const styles = useStyles();

  const [selected1, setSelected1] = React.useState(false);

  return (
    <Card
      className={styles.card}
      selected={selected1}
      onSelectionChange={(_, { selected }) => setSelected1(selected)}
    >
      <CardPreview
        className={clsx({
          [styles.grayBackground]: !selected1,
          [styles.grayBackgroundSelected]: selected1,
        })}
      >
        {/* <Image
            width={800}
            height={600}
            className={styles.smallRadius}
            src={resolveAsset("office1.png")}
            alt="Presentation Preview"
          /> */}
        <Text size={400}>{props.text}</Text>
      </CardPreview>

      <CardHeader
        header={<Text weight="semibold">{props.children}</Text>}
        image={
          props.logo ? (
            <div className={styles.logoBadge}>{props.logo}</div>
          ) : undefined
        }
        action={
          <Link href={props.href}>
            <Button appearance="primary" aria-label="Start button">
              Start
            </Button>
          </Link>
        }
      />
    </Card>
  );
};
