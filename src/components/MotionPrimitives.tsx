import type { ReactNode } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const EDITORIAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ScrollProgressLine() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="no-print fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-neutral-900 dark:bg-neutral-100 pointer-events-none"
    />
  );
}

interface HairlineRuleProps {
  delay?: number;
  className?: string;
}

export function HairlineRule({ delay = 0, className = '' }: HairlineRuleProps) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleX: 0, opacity: 0.35 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{ duration: 0.7, delay, ease: EDITORIAL_EASE }}
      className={`h-px w-full origin-left bg-neutral-900/18 dark:bg-neutral-100/18 ${className}`}
    />
  );
}

interface MaskedLineRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function MaskedLineReveal({
  children,
  delay = 0,
  className = '',
}: MaskedLineRevealProps) {
  return (
    <span className={`block overflow-hidden py-0.5 ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '105%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 0.72, delay, ease: EDITORIAL_EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

interface EditorialSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  subtitle?: string;
}

export function EditorialSection({
  id,
  title,
  subtitle,
  children,
}: EditorialSectionProps) {
  return (
    <section id={id} className="scroll-mt-10 pt-0 pb-12 md:pb-16">
      <HairlineRule className="mb-7 md:mb-9" />
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 'some' }}
        transition={{ duration: 0.55, ease: EDITORIAL_EASE }}
        className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-8 items-start"
      >
        <div className="md:col-span-4">
          <h2 className="text-[22px] md:text-[26px] font-normal tracking-[-0.025em] leading-tight text-neutral-950 dark:text-neutral-50">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1.5 text-[13px] text-neutral-600 dark:text-neutral-400">
              {subtitle}
            </p>
          ) : null}
        </div>
        <div className="md:col-span-8">{children}</div>
      </motion.div>
    </section>
  );
}
