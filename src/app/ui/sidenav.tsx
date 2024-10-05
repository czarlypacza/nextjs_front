'use client';

//import { useIsSSR } from "@fluentui/react-components";
import * as React from "react";
import {
  Hamburger,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
} from "@fluentui/react-nav-preview";

import {
  Tooltip,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import {
  BookLetter20Filled,
  BookLetter20Regular,
  BrainCircuit20Filled,
  BrainCircuit20Regular,
  Home20Filled,
  Home20Regular,
  bundleIcon,
  createFluentIcon,
} from "@fluentui/react-icons";

import Link from "next/link";
import { usePathname } from "next/navigation";

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    display: "flex",
    height: "100%",
    borderRadius: tokens.borderRadiusMedium,
    zIndex: 1000,
    opacity: 0.92,
    position: "relative",
  },
  content: {
    flex: "1",
    padding: "16px",
    display: "grid",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    zIndex: 1000,
  },
  field: {
    display: "flex",
    marginTop: "4px",
    marginLeft: "8px",
    flexDirection: "column",
    gridRowGap: tokens.spacingVerticalS,
  },
  nav: {
    borderRadius: tokens.borderRadiusXLarge,
    zIndex: 1000,
  },
});

const Dashboard = bundleIcon(Home20Filled, Home20Regular);
const Announcements = bundleIcon(BrainCircuit20Filled, BrainCircuit20Regular);
const EmployeeSpotlight = bundleIcon(
  BookLetter20Filled,
  BookLetter20Regular
);


const HybridRegular = createFluentIcon("HybridRegular", "24", [
  "M 11.13 -2.2 A 3.9 3.9 0 0 1 13.5 -3 a 0.9 0.9 0 0 1 0.54 0.21 c 0.13 0.1 0.24 0.22 0.35 0.35 c 0.07 0.09 0.11 0.2 0.11 0.32 V 1.5 H 13.41 a 1.5 1.5 0 1 0 0 1 H 14.5 v 9.42 a 0.5 0.5 0 0 1 -0.18 0.38 c -0.47 0.38 -1.08 0.7 -1.82 0.7 c -1.19 0 -2.07 -0.6 -2.64 -1.31 a 4.06 4.06 0 0 1 -0.82 -1.76 c -0.33 -0.08 -0.7 -0.25 -1.05 -0.55 A 3 3 0 0 1 7 7 c 0 -0.56 0.04 -1.06 0.12 -1.5 h 3.13 c 0.64 0 1.16 0.47 1.24 1.09 a 1.5 1.5 0 1 0 1 0 A 2.25 2.25 0 0 0 10.25 4.5 h -2.8 a 1.9 1.9 0 0 1 0.83 -0.85 c -0.29 -0.83 -0.21 -1.8 0.06 -2.57 c 0.18 -0.49 0.45 -0.96 0.84 -1.27 c 0.25 -0.2 0.55 -0.34 0.88 -0.36 c 0.14 -0.68 0.55 -1.25 1.07 -1.66 Z m 4.37 11.7 h 0.75 c 1.24 0 2.25 -1 2.25 -2.25 v -1.84 a 1.5 1.5 0 1 0 -1 0 v 1.84 c 0 0.69 -0.56 1.25 -1.25 1.25 h -0.75 V -2.12 a 0.5 0.5 0 0 1 0.11 -0.32 c 0.1 -0.13 0.22 -0.25 0.35 -0.35 A 0.9 0.9 0 0 1 16.5 -3 c 0.85 0 1.71 0.28 2.37 0.8 c 0.52 0.4 0.93 0.97 1.07 1.65 c 0.33 0.02 0.63 0.16 0.88 0.36 c 0.39 0.31 0.66 0.78 0.84 1.27 c 0.27 0.77 0.35 1.74 0.06 2.57 l 0.21 0.12 c 0.28 0.19 0.49 0.45 0.64 0.76 c 0.3 0.6 0.43 1.44 0.43 2.47 a 3 3 0 0 1 -0.99 2.38 c -0.34 0.3 -0.72 0.47 -1.05 0.55 c -0.1 0.56 -0.38 1.2 -0.82 1.76 A 3.34 3.34 0 0 1 17.5 13 c -0.74 0 -1.35 -0.32 -1.82 -0.7 a 0.5 0.5 0 0 1 -0.18 -0.38 V 9.5 Z M 12 1.5 a 0.5 0.5 0 1 0 0 1 a 0.5 0.5 0 0 0 0 -1 Z m 0 6 a 0.5 0.5 0 1 0 0 1 a 0.5 0.5 0 0 0 0 -1 Z m 6 -3 a 0.5 0.5 0 1 0 0 -1 a 0.5 0.5 0 0 0 0 1 Z M 1 8 v 12 c 0 1.1 0.9 2 2 2 h 9.5 a 0.5 0.5 0 0 0 0 -1 H 3 a 1 1 0 0 1 -1 -1 h 10 a 1 1 0 0 0 1 -1 V 8 a 2 2 0 0 0 -2 -2 H 3 a 2 2 0 0 0 -2 2 Z m 10 -1 a 1 1 0 0 1 1 1 v 11 H 2 V 8 a 1 1 0 0 1 1 -1 h 8 Z m -4 2 c 0.2 0 0.38 0.12 0.46 0.3 l 3 7 a 0.5 0.5 0 0 1 -0.92 0.4 l -0.73 -1.7 H 5.2 l -0.73 1.7 a 0.5 0.5 0 0 1 -0.92 -0.4 l 3 -7 A 0.5 0.5 0 0 1 7 9 Z m -1.38 5 h 2.76 L 7 10.77 L 5.62 14 Z",
]);

export const HybridFilled = createFluentIcon("HybridFilled", "24", [
  "M 10.13 -3.2 A 3.9 3.9 0 0 1 12.5 -4 a 1.76 1.76 0 0 1 1.5 0.78 A 1.76 1.76 0 0 1 15.5 -4 c 0.85 0 1.71 0.28 2.37 0.8 c 0.52 0.4 0.93 0.97 1.07 1.65 c 0.33 0.02 0.63 0.16 0.88 0.36 c 0.39 0.31 0.66 0.78 0.84 1.27 c 0.27 0.77 0.35 1.74 0.06 2.57 l 0.21 0.12 c 0.28 0.19 0.49 0.45 0.64 0.76 c 0.3 0.6 0.43 1.44 0.43 2.47 a 3 3 0 0 1 -0.99 2.38 c -0.34 0.3 -0.72 0.47 -1.05 0.55 c -0.1 0.56 -0.38 1.2 -0.82 1.76 A 3.34 3.34 0 0 1 16.5 12 c -0.94 0 -1.69 -0.52 -2.17 -1.03 a 4.25 4.25 0 0 1 -0.33 -0.38 c -0.1 0.12 -0.2 0.25 -0.33 0.38 A 3.06 3.06 0 0 1 11.5 12 c -1.19 0 -2.07 -0.6 -2.64 -1.31 a 4.06 4.06 0 0 1 -0.82 -1.76 c -0.33 -0.08 -0.7 -0.25 -1.05 -0.55 A 3 3 0 0 1 6 6 c 0 -1.03 0.13 -1.87 0.43 -2.47 a 1.91 1.91 0 0 1 0.85 -0.88 c -0.29 -0.83 -0.21 -1.8 0.06 -2.57 c 0.18 -0.49 0.45 -0.96 0.84 -1.27 c 0.25 -0.2 0.55 -0.34 0.88 -0.36 c 0.14 -0.68 0.55 -1.25 1.07 -1.66 Z M 13.5 -1.5 V -1.5 a 1.78 1.78 0 0 0 -0.02 -0.24 a 2.58 2.58 0 0 0 -0.14 -0.57 c -0.07 -0.2 -0.17 -0.38 -0.3 -0.5 A 0.76 0.76 0 0 0 12.5 -3 c -0.65 0 -1.29 0.22 -1.76 0.58 C 10.28 -2.06 10 -1.57 10 -1 a 0.5 0.5 0 0 1 -0.66 0.47 c -0.19 -0.06 -0.35 -0.02 -0.53 0.12 c -0.2 0.16 -0.39 0.45 -0.53 0.83 c -0.28 0.78 -0.25 1.73 0.14 2.3 A 0.5 0.5 0 0 1 8.5 3 h 0.75 c 1.24 0 2.25 1 2.25 2.25 v 0.34 a 1.5 1.5 0 1 1 -1 0 v -0.34 c 0 -0.69 -0.56 -1.25 -1.25 -1.25 H 7.5 a 0.5 0.5 0 0 1 -0.18 -0.03 c -0.2 0.4 -0.32 1.06 -0.32 2.03 c 0 0.86 0.31 1.34 0.64 1.62 c 0.34 0.3 0.73 0.38 0.86 0.38 c 0.28 0 0.5 0.22 0.5 0.5 c 0 0.37 0.2 1.01 0.64 1.56 c 0.43 0.54 1.05 0.94 1.86 0.94 c 0.56 0 1.06 -0.31 1.45 -0.72 a 3.12 3.12 0 0 0 0.55 -0.81 V 1.5 H 12.41 a 1.5 1.5 0 1 1 0 -1 H 13.5 v -2 Z m 1 10 v 0.97 l 0.01 0.03 l 0.1 0.2 c 0.1 0.17 0.25 0.38 0.44 0.58 c 0.39 0.4 0.9 0.72 1.45 0.72 c 0.81 0 1.43 -0.4 1.86 -0.94 c 0.44 -0.55 0.64 -1.2 0.64 -1.56 c 0 -0.28 0.22 -0.5 0.5 -0.5 c 0.13 0 0.52 -0.08 0.86 -0.38 c 0.33 -0.28 0.64 -0.76 0.64 -1.62 c 0 -0.97 -0.12 -1.63 -0.32 -2.03 c -0.1 -0.19 -0.2 -0.3 -0.3 -0.37 a 0.66 0.66 0 0 0 -0.38 -0.1 a 0.5 0.5 0 0 1 -0.42 -0.78 c 0.39 -0.57 0.42 -1.52 0.14 -2.3 a 1.89 1.89 0 0 0 -0.53 -0.83 c -0.18 -0.14 -0.34 -0.18 -0.53 -0.12 A 0.5 0.5 0 0 1 18 -1 c 0 -0.57 -0.28 -1.06 -0.74 -1.42 A 2.91 2.91 0 0 0 15.5 -3 a 0.76 0.76 0 0 0 -0.54 0.19 c -0.13 0.11 -0.23 0.28 -0.3 0.49 a 2.58 2.58 0 0 0 -0.16 0.81 v 9.01 h 0.75 c 0.69 0 1.25 -0.56 1.25 -1.25 v -1.84 a 1.5 1.5 0 1 1 1 0 v 1.84 c 0 1.24 -1 2.25 -2.25 2.25 h -0.75 Z M 10.5 1 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 0 0 -1 0 Z M 17 3.5 a 0.5 0.5 0 1 0 0 -1 a 0.5 0.5 0 0 0 0 1 Z m -6 3 a 0.5 0.5 0 1 0 0 1 a 0.5 0.5 0 0 0 0 -1 Z M 3 5 a 2 2 0 0 0 -2 2 v 12 c 0 1.1 0.9 2 2 2 h 9.5 a 0.5 0.5 0 0 0 0 -1 H 3 a 1 1 0 0 1 -1 -1 h 10 a 1 1 0 0 0 1 -1 V 7 a 2 2 0 0 0 -2 -2 H 3 Z m 4 3 c 0.2 0 0.38 0.12 0.46 0.3 l 3 7 a 0.5 0.5 0 0 1 -0.92 0.4 l -0.73 -1.7 H 5.2 l -0.73 1.7 a 0.5 0.5 0 0 1 -0.92 -0.4 l 3 -7 A 0.5 0.5 0 0 1 7 8 Z m -1.38 5 h 2.76 L 7 9.77 L 5.62 13 Z",
]);

const HybridIcon = bundleIcon(HybridFilled, HybridRegular);


const links = [
  {id:"1", name: 'Home', href: '/sentiment', icon: <Dashboard/> },
  {id:"2",
    name: 'Machine Learning',
    href: '/sentiment/machine',
    icon: <Announcements/>,
  },
  {id:"3", name: 'Rule-based', href: '/sentiment/rule', icon: <EmployeeSpotlight/> },
  {id:"4", name: 'Hybrid', href: '/sentiment/hybrid', icon: <HybridIcon/>},
];

export const NavDrawerDefault = () => {
  const pathname = usePathname();

  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);
  // const isSSR = useIsSSR();

  // React.useEffect(() => {
  //   if (!isSSR) {
  //     setIsOpen(true);
  //   }
  // }, [isSSR]);


  const renderHamburgerWithToolTip = () => {
    return (
      <Tooltip content="Navigation" relationship="label">
        <Hamburger onClick={() => setIsOpen(!isOpen)} />
      </Tooltip>
    );
  };

  return (
    <div className={styles.root}>
      <NavDrawer
        selectedValue={links.find((link) => link.href === pathname)?.id}
        defaultSelectedCategoryValue=""
        open={isOpen}
        onOpenChange={(e, data) => setIsOpen(data.open)}
        type={"inline"}
        multiple={true}
        className={styles.nav}
        id="sidenav-id"
      >
        <NavDrawerHeader>
          {renderHamburgerWithToolTip()}

        </NavDrawerHeader>

        <NavDrawerBody>
          {links.map((link) => {
            return (
              <Link
                key={link.name}
                href={link.href}
              >
                <NavItem icon={link.icon} value={link.id} >  
                  {link.name}
                </NavItem>
              </Link>
              
            );
          })}
          
        </NavDrawerBody>
      </NavDrawer>
      <div className={styles.content}>
        {!isOpen && renderHamburgerWithToolTip()}
      </div>
    </div>
  );
};