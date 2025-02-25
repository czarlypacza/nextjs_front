'use client';

import * as React from 'react';
import {
  FluentProvider,
  webDarkTheme,
  webLightTheme,
  SSRProvider,
  RendererProvider,
  createDOMRenderer,
  renderToStyleElements,
  BrandVariants,
  Theme,
  createLightTheme,
  createDarkTheme,
  Switch,
} from '@fluentui/react-components';
import { useServerInsertedHTML } from 'next/navigation';

export function Providers({ children }: { children: React.ReactNode }) {
  const [renderer] = React.useState(() => createDOMRenderer());
  const didRenderRef = React.useRef(false);


  const [label, setLabel] = React.useState("☀️");
  // Track OS scheme changes:
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = () => setIsDarkMode(mediaQuery.matches);
    updateTheme();
    mediaQuery.addEventListener('change', updateTheme);
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, []);

  React.useEffect(() => {
    if (!isDarkMode) {
      setLabel("☀️");
    } else {
      setLabel("🌑");
    }
  }, [isDarkMode]);

  // Optional manual toggle:
  function toggleTheme() {
    setIsDarkMode((prev) => !prev);
  }

  useServerInsertedHTML(() => {
    if (didRenderRef.current) {
      return;
    }
    didRenderRef.current = true;
    return <>{renderToStyleElements(renderer)}</>;
  });

  const myNewTheme: BrandVariants = { 
      10: "#050205",
      20: "#211220",
      30: "#381B38",
      40: "#4B214C",
      50: "#5F2760",
      60: "#742D75",
      70: "#89338B",
      80: "#9C3D9E",
      90: "#A651A7",
      100: "#B163B0",
      110: "#BB76B9",
      120: "#C488C3",
      130: "#CE9ACC",
      140: "#D7ACD5",
      150: "#E0BEDE",
      160: "#E9D0E8"
  };
    
  const lightTheme: Theme = {
      ...createLightTheme(myNewTheme), 
  };
  
  const darkTheme: Theme = {
      ...createDarkTheme(myNewTheme), 
  };
    
  darkTheme.colorBrandForeground1 = myNewTheme[110];
  darkTheme.colorBrandForeground2 = myNewTheme[120];

  return (
    <RendererProvider renderer={renderer}>
      <SSRProvider>
        <div className={isDarkMode ? 'dark' : 'light'}>
          <FluentProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <Switch
              label={label}
              labelPosition="above"
              checked={isDarkMode}
              onChange={toggleTheme}
              className='themeButton'
            />
            {children}
          </FluentProvider>
        </div>
      </SSRProvider>
    </RendererProvider>
  );
}