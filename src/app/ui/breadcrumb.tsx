"use client";

import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
} from "@fluentui/react-components";
import Link from "next/link";

type Breadcrumb = {
    text: string;
    href: string;
    icon?: React.ReactNode;
};

type BreadcrumbProps = {
    breadcrumbs: Breadcrumb[];
};

export const Breadcrumbs = (props: BreadcrumbProps) => {
  return (
    <Breadcrumb aria-label="Breadcrumbs">
        {props.breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={index}>
                <BreadcrumbItem key={`item-${index}`} >
                    
                      <BreadcrumbButton   icon={breadcrumb.icon ? breadcrumb.icon as "span" : null}>
                        
                        <Link href={breadcrumb.href}>{breadcrumb.text}</Link>

                      </BreadcrumbButton>
                    
                </BreadcrumbItem>
                {index < props.breadcrumbs.length - 1 && <BreadcrumbDivider key={`divider-${index}`} />}
            </React.Fragment>
        ))}
    </Breadcrumb>
  );
};