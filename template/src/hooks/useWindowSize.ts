import { useState, useEffect } from 'react';
import breakpoints, { BreakpointMap } from '../utils/constants/breakpoints';

interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
  breakpoint: BreakpointMap;
}

function getBreakpointMap(size: number) {
  let breakpoint = {};

  Object.keys(breakpoints).map((key) => {
    if (breakpoints[key] > size) {
      breakpoint = { ...breakpoint, [key]: true };
    } else {
      breakpoint = { ...breakpoint, [key]: false };
    }
    return key;
  });

  return breakpoint;
}

function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState(() => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
      isMobile: width <= breakpoints.md,
      breakpoint: getBreakpointMap(width),
    };
  });

  function onResize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: window.innerWidth <= breakpoints.md,
      breakpoint: getBreakpointMap(window.innerWidth),
    });
  }

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  });

  return windowSize;
}

export default useWindowSize;
