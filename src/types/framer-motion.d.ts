// Type declarations untuk framer-motion
declare module 'framer-motion' {
  import { ReactElement } from 'react';
  
  export const motion: {
    [key: string]: (props: any) => ReactElement;
  };
  
  export interface AnimatePresenceProps {
    children?: ReactElement | ReactElement[] | boolean | null;
    initial?: boolean;
    onExitComplete?: () => void;
    mode?: 'sync' | 'popLayout' | 'wait';
    propagate?: boolean;
    custom?: any;
  }
  
  export const AnimatePresence: (props: AnimatePresenceProps) => ReactElement;
  
  export function useMotionValue<T>(defaultValue: T): { get: () => T; set: (v: T) => void };
  export function useTransform<T, U>(value: any, fn: (v: T) => U): U;
  export function useSpring(value: any, config?: any): any;
  export function useScroll(): { get: () => any };
  export function useInView(ref: any, options?: any): boolean;
  export function useAnimation(): { start: (definition: any) => Promise<void>; stop: () => void; set: (definition: any) => void };
  export function useReducedMotion(): boolean;
  export function useMotionTemplate(strings: TemplateStringsArray, ...values: any[]): string;
  export function useMotionValueEvent(value: any, event: string, callback: (v: any) => void): void;
  export function usePresence(): [boolean, { enter: () => void; exit: () => void }];
}
