import { BreakpointMap } from '../../utils/constants/breakpoints';

export interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
  breakpoint: BreakpointMap;
}
