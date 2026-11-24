import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CV_DATA } from '../data/cvData';
import { EDITORIAL_EASE } from './MotionPrimitives';

type DetailFilter = 'all' | 'achievements' | 'responsibilities';

interface ExperienceSectionProps {
  activeSkillId: string | null;
}

const FILTER_OPTIONS: { id: DetailFilter; label: string }[] = [
  { id: 'all', label: 'Vista completa' },
  { id: 'achievements', label: 'Logros' },
  { id: 'responsibilities', label: 'Responsabilidades' },
];

export function ExperienceSection({ activeSkillId }: ExperienceSectionProps) {
  const [filter, setFilter] = useState<DetailFilter>('all');

  const showAchievements = filter === 'all' || filter === 'achievements';
  const showResponsibilities = filter === 'all' || filter === 'responsibilities';

  return (
    <div className="space-y-8">
      {CV_DATA.workHistory.map((item) => (
        <article key={item.company} className="space-y-6">
          {/* Primary Work History row matching reference image 3-column axis */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-1 sm:gap-x-6 items-baseline">
            <h3 className="sm:col-span-5 text-[16px] md:text-[17px] font-medium tracking-[-0.015em] text-neutral-950 dark:text-neutral-50">
              {item.company}
            </h3>
            <p className="sm:col-span-5 text-[15px] text-neutral-800 dark:text-neutral-200">
              {item.role}
            </p>
            <p className="sm:col-span-2 sm:text-right font-mono text-[13px] tabular-nums text-neutral-700 dark:text-neutral-300">
              {item.period}
            </p>
          </div>

          {/* Minimalist editorial view filter */}
          <div
            role="tablist"
            aria-label="Filtrar detalles de experiencia"
            className="no-print flex flex-wrap items-center gap-5 border-b border-neutral-900/12 dark:border-neutral-100/12 pb-2.5"
          >
            {FILTER_OPTIONS.map((option) => {
              const isSelected = filter === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setFilter(option.id)}
                  className={`relative pb-1 text-[13px] whitespace-nowrap transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900 dark:focus-visible:outline-neutral-100 ${
                    isSelected
                      ? 'text-neutral-950 dark:text-neutral-50 font-medium'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                  }`}
                >
                  {option.label}
                  {isSelected ? (
                    <motion.span
                      layoutId="experience-filter-indicator"
                      transition={{ duration: 0.25, ease: EDITORIAL_EASE }}
                      className="absolute left-0 right-0 -bottom-[11px] h-[1.5px] bg-neutral-950 dark:bg-neutral-50"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: EDITORIAL_EASE }}
              className="space-y-8"
            >
              {/* Quantitative Achievements */}
              {showAchievements ? (
                <div className="space-y-4">
                  <p className="text-[13px] font-medium text-neutral-600 dark:text-neutral-400">
                    Logros cuantificables
                  </p>
                  <div className="divide-y divide-neutral-900/10 dark:divide-neutral-100/10 border-t border-neutral-900/10 dark:border-neutral-100/10">
                    {item.achievements.map((achievement) => {
                      const isRelated =
                        activeSkillId !== null &&
                        achievement.relatedSkills.includes(activeSkillId);
                      const isDimmed =
                        activeSkillId !== null && !isRelated;

                      return (
                        <div
                          key={achievement.id}
                          className={`grid grid-cols-1 sm:grid-cols-12 gap-y-2 sm:gap-x-6 py-4 transition-opacity duration-200 ${
                            isDimmed ? 'opacity-40' : 'opacity-100'
                          }`}
                        >
                          <div className="sm:col-span-4">
                            <p className="font-mono text-[22px] md:text-[24px] font-medium tracking-[-0.03em] tabular-nums text-neutral-950 dark:text-neutral-50 leading-none">
                              {achievement.metric}
                            </p>
                            <p className="mt-1.5 text-[12.5px] text-neutral-600 dark:text-neutral-400 leading-snug">
                              {achievement.metricLabel}
                            </p>
                          </div>
                          <p className="sm:col-span-8 text-[14.5px] leading-[1.62] text-neutral-800 dark:text-neutral-200">
                            {achievement.summary}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {/* Responsibilities */}
              {showResponsibilities ? (
                <div className="space-y-3.5">
                  <p className="text-[13px] font-medium text-neutral-600 dark:text-neutral-400">
                    Responsabilidades clave
                  </p>
                  <ul className="space-y-2.5 text-[14.5px] leading-[1.62] text-neutral-800 dark:text-neutral-200">
                    {item.responsibilities.map((responsibility, index) => (
                      <li
                        key={index}
                        className="grid grid-cols-[18px_1fr] gap-2.5 items-baseline"
                      >
                        <span
                          aria-hidden="true"
                          className="text-neutral-500 dark:text-neutral-400 select-none"
                        >
                          —
                        </span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </article>
      ))}
    </div>
  );
}
