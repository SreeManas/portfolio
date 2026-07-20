import { motion, useReducedMotion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactElement } from "react";

import { motionEase, motionTiming, revealViewport } from "@/lib/motion";

interface RevealProps extends HTMLMotionProps<"div"> {
  distance?: number;
}

export function Reveal({
  distance = 12,
  transition,
  children,
  ...props
}: RevealProps): ReactElement {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: distance }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{
        duration: motionTiming.patient,
        ease: motionEase,
        ...transition,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
