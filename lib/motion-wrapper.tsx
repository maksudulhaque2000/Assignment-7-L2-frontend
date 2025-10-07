'use client';

import { HTMLMotionProps, motion as framerMotion } from 'framer-motion';
import { forwardRef } from 'react';


const motionDiv = forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>((props, ref) => (
  <framerMotion.div {...props} ref={ref} />
));
motionDiv.displayName = 'motion.div';

const motionH1 = forwardRef<HTMLHeadingElement, HTMLMotionProps<'h1'>>((props, ref) => (
  <framerMotion.h1 {...props} ref={ref} />
));
motionH1.displayName = 'motion.h1';

const motionH2 = forwardRef<HTMLHeadingElement, HTMLMotionProps<'h2'>>((props, ref) => (
  <framerMotion.h2 {...props} ref={ref} />
));
motionH2.displayName = 'motion.h2';

const motionP = forwardRef<HTMLParagraphElement, HTMLMotionProps<'p'>>((props, ref) => (
  <framerMotion.p {...props} ref={ref} />
));
motionP.displayName = 'motion.p';

const motionSpan = forwardRef<HTMLSpanElement, HTMLMotionProps<'span'>>((props, ref) => (
  <framerMotion.span {...props} ref={ref} />
));
motionSpan.displayName = 'motion.span';

const motionUl = forwardRef<HTMLUListElement, HTMLMotionProps<'ul'>>((props, ref) => (
  <framerMotion.ul {...props} ref={ref} />
));
motionUl.displayName = 'motion.ul';

const motionLi = forwardRef<HTMLLIElement, HTMLMotionProps<'li'>>((props, ref) => (
  <framerMotion.li {...props} ref={ref} />
));
motionLi.displayName = 'motion.li';

const motionA = forwardRef<HTMLAnchorElement, HTMLMotionProps<'a'>>((props, ref) => (
  <framerMotion.a {...props} ref={ref} />
));
motionA.displayName = 'motion.a';

const motionButton = forwardRef<HTMLButtonElement, HTMLMotionProps<'button'>>((props, ref) => (
  <framerMotion.button {...props} ref={ref} />
));
motionButton.displayName = 'motion.button';

const motionSection = forwardRef<HTMLElement, HTMLMotionProps<'section'>>((props, ref) => (
  <framerMotion.section {...props} ref={ref} />
));
motionSection.displayName = 'motion.section';

export const motion = {
  div: motionDiv,
  h1: motionH1,
  h2: motionH2,
  p: motionP,
  span: motionSpan,
  ul: motionUl,
  li: motionLi,
  a: motionA,
  button: motionButton,
  section: motionSection,
};