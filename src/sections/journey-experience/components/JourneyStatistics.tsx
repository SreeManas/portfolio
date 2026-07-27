import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, type ReactElement } from "react";

import type { JourneyStatistic } from "@/journey/types";

interface AnimatedStatProps {
  item: JourneyStatistic;
}

function AnimatedStat({ item }: AnimatedStatProps): ReactElement {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 80,
    damping: 24,
  });
  const display = useTransform(spring, (value) => Math.round(value).toString());

  useEffect(() => {
    if (!isInView) {
      return;
    }

    if (prefersReducedMotion) {
      motionValue.set(item.value);
      return;
    }

    motionValue.set(0);
    const frame = requestAnimationFrame(() => {
      motionValue.set(item.value);
    });

    return () => cancelAnimationFrame(frame);
  }, [isInView, item.value, motionValue, prefersReducedMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefersReducedMotion ? item.value : <motion.span>{display}</motion.span>}
      {item.suffix ?? ""}
    </span>
  );
}

interface JourneyStatisticsProps {
  items: readonly JourneyStatistic[];
}

export function JourneyStatistics({
  items,
}: JourneyStatisticsProps): ReactElement {
  return (
    <ul className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
      {items.map((item) => (
        <li
          key={item.id}
          className="border border-border bg-paper px-5 py-6 transition-all duration-200 ease-dossier hover:-translate-y-0.5 hover:shadow-soft"
        >
          <p className="font-display text-4xl leading-none text-ink md:text-5xl">
            <AnimatedStat item={item} />
          </p>
          <p className="mt-3 font-mono text-xs uppercase leading-6 text-muted-foreground">
            {item.label}
          </p>
        </li>
      ))}
    </ul>
  );
}
