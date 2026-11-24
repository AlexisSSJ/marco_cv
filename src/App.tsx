import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Moon, Printer, Sun } from 'lucide-react';
import { motion, MotionConfig } from 'motion/react';
import { CV_DATA } from './data/cvData';
import { Header } from './components/Header';
import { ExperienceSection } from './components/ExperienceSection';
import {
  EDITORIAL_EASE,
  EditorialSection,
  HairlineRule,
  MaskedLineReveal,
  ScrollProgressLine,
} from './components/MotionPrimitives';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const handleCopy = async (value: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => {
        setCopiedField((current) => (current === field ? null : current));
      }, 2000);
    } catch {
      setCopiedField(null);
    }
  };

  const handleToggleSkill = (skillId: string) => {
    setActiveSkillId((current) => (current === skillId ? null : skillId));
  };

  const contactRows = [
    {
      label: 'Currículum PDF',
      detail: CV_DATA.pdfFileName,
      href: CV_DATA.pdfPath,
      download: CV_DATA.pdfFileName,
      external: false,
      onClick: undefined,
    },
    {
      label: 'Correo electrónico',
      detail: CV_DATA.email,
      href: `mailto:${CV_DATA.email}`,
      download: undefined,
      external: false,
      onClick: undefined,
    },
    {
      label: 'Teléfono directo',
      detail: CV_DATA.phoneDisplay,
      href: `tel:${CV_DATA.phoneRaw}`,
      download: undefined,
      external: false,
      onClick: undefined,
    },
    {
      label: 'Versión imprimible',
      detail: 'Imprimir o exportar página',
      href: undefined,
      download: undefined,
      external: false,
      onClick: () => window.print(),
    },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgressLine />

      <div
        id="top"
        className="min-h-screen w-full bg-[#d8d8d6] dark:bg-[#111111] text-neutral-950 dark:text-neutral-100 transition-colors duration-300"
      >
        <div className="mx-auto max-w-[1160px] px-6 sm:px-10 lg:px-14 pt-8 md:pt-11 pb-20 md:pb-24">
          {/* Top Bar matching reference image 3-column architectural layout */}
          <Header copiedField={copiedField} onCopy={handleCopy} />

          {/* Hero Statement with generous Swiss editorial whitespace */}
          <section
            aria-label="Presentación"
            className="pt-24 pb-20 sm:pt-32 sm:pb-24 md:pt-40 md:pb-28"
          >
            <h1 className="max-w-4xl text-[clamp(2.2rem,5.2vw,4.15rem)] font-normal tracking-[-0.032em] leading-[1.09] text-neutral-950 dark:text-neutral-50 [text-wrap:balance]">
              <MaskedLineReveal delay={0.08}>
                {CV_DATA.greetingLine}
              </MaskedLineReveal>
              <MaskedLineReveal delay={0.2}>
                {CV_DATA.roleLine}
              </MaskedLineReveal>
            </h1>
          </section>

          <main>
            {/* 1. Perfil profesional (matches "About me") */}
            <EditorialSection id="perfil" title="Perfil profesional">
              <p className="max-w-[66ch] text-[17px] md:text-[20px] font-normal leading-[1.52] tracking-[-0.012em] text-neutral-900 dark:text-neutral-100">
                {CV_DATA.profile}
              </p>
            </EditorialSection>

            {/* 2. Acceso directo y CV (matches "Portfolio" row structure with ↗ links) */}
            <EditorialSection id="contacto" title="Contacto y CV">
              <div className="space-y-1">
                {contactRows.map((row) => {
                  const rowContent = (
                    <div className="group grid grid-cols-1 sm:grid-cols-12 gap-y-1 sm:gap-x-6 items-baseline py-2.5 border-b border-transparent hover:border-neutral-900/12 dark:hover:border-neutral-100/12 transition-colors duration-150">
                      <span className="sm:col-span-5 text-[15px] text-neutral-900 dark:text-neutral-100">
                        {row.label}
                      </span>
                      <span className="sm:col-span-6 text-[14.5px] text-neutral-800 dark:text-neutral-200 underline decoration-neutral-900/45 dark:decoration-neutral-100/45 underline-offset-4 group-hover:decoration-neutral-950 dark:group-hover:decoration-neutral-50 truncate">
                        {row.detail}
                      </span>
                      <span className="hidden sm:flex sm:col-span-1 justify-end text-neutral-800 dark:text-neutral-200">
                        <ArrowUpRight
                          className="w-4 h-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  );

                  if (row.onClick) {
                    return (
                      <button
                        key={row.label}
                        type="button"
                        onClick={row.onClick}
                        className="block w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900 dark:focus-visible:outline-neutral-100"
                      >
                        {rowContent}
                      </button>
                    );
                  }

                  return (
                    <a
                      key={row.label}
                      href={row.href}
                      download={row.download}
                      className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900 dark:focus-visible:outline-neutral-100"
                    >
                      {rowContent}
                    </a>
                  );
                })}
              </div>
            </EditorialSection>

            {/* 3. Competencias (matches "Competences": prose + soft skills center, right-aligned technical skills list) */}
            <EditorialSection id="competencias" title="Competencias">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-8 sm:gap-x-8 items-start">
                {/* Center Column: Editorial summary + structured soft competencies */}
                <div className="sm:col-span-8 space-y-5">
                  <div className="space-y-4 text-[14.5px] md:text-[15px] leading-[1.64] text-neutral-800 dark:text-neutral-200">
                    {CV_DATA.competencesIntro.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="pt-2">
                    <p className="text-[12.5px] text-neutral-600 dark:text-neutral-400 mb-2.5">
                      Fortalezas profesionales
                    </p>
                    <p className="text-[14px] leading-[1.75] text-neutral-900 dark:text-neutral-100">
                      {CV_DATA.softSkills.map((skill, idx) => (
                        <span key={skill}>
                          {skill}
                          {idx < CV_DATA.softSkills.length - 1 ? (
                            <span
                              aria-hidden="true"
                              className="mx-2 text-neutral-500 dark:text-neutral-500"
                            >
                              ·
                            </span>
                          ) : null}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                {/* Right Column: Right-aligned vertical list of Technical Skills (matches right stack in reference layout) */}
                <div className="sm:col-span-4 flex flex-col sm:items-end">
                  <p className="text-[12.5px] text-neutral-600 dark:text-neutral-400 mb-2.5 sm:text-right">
                    Habilidades técnicas
                  </p>
                  <ul className="w-full space-y-1.5">
                    {CV_DATA.technicalSkills.map((skill) => {
                      const isActive = activeSkillId === skill.id;
                      return (
                        <li
                          key={skill.id}
                          className="flex sm:justify-end"
                        >
                          <button
                            type="button"
                            onClick={() => handleToggleSkill(skill.id)}
                            aria-pressed={isActive}
                            title="Haz clic para resaltar logros y cursos relacionados"
                            className={`group inline-flex items-baseline gap-2 py-0.5 text-[14.5px] transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900 dark:focus-visible:outline-neutral-100 ${
                              isActive
                                ? 'text-neutral-950 dark:text-neutral-50 font-medium underline underline-offset-4'
                                : 'text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-neutral-50 hover:underline hover:underline-offset-4'
                            }`}
                          >
                            <span>{skill.name}</span>
                            {skill.level ? (
                              <span className="text-[12px] text-neutral-600 dark:text-neutral-400 font-normal">
                                / {skill.level}
                              </span>
                            ) : null}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  {activeSkillId ? (
                    <button
                      type="button"
                      onClick={() => setActiveSkillId(null)}
                      className="no-print mt-3 text-[12px] text-neutral-600 dark:text-neutral-400 underline underline-offset-4 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors cursor-pointer"
                    >
                      Quitar filtro
                    </button>
                  ) : (
                    <p className="no-print mt-3 text-[12px] text-neutral-600/80 dark:text-neutral-400/80 sm:text-right">
                      Selecciona una herramienta para ver su relación
                    </p>
                  )}
                </div>
              </div>
            </EditorialSection>

            {/* 4. Experiencia (matches "Work History") */}
            <EditorialSection id="experiencia" title="Experiencia">
              <ExperienceSection activeSkillId={activeSkillId} />
            </EditorialSection>

            {/* 5. Formación complementaria (matches "Education") */}
            <EditorialSection
              id="formacion"
              title="Formación"
              subtitle="Formación complementaria"
            >
              <ul className="space-y-2.5">
                {CV_DATA.education.map((edu, index) => {
                  const isHighlighted =
                    activeSkillId !== null && edu.skillId === activeSkillId;
                  const isDimmed =
                    activeSkillId !== null && !isHighlighted;

                  return (
                    <motion.li
                      key={edu.id}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 'some' }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.04,
                        ease: EDITORIAL_EASE,
                      }}
                      className={`grid grid-cols-1 sm:grid-cols-12 gap-y-0.5 sm:gap-x-6 items-baseline py-1 transition-all duration-200 ${
                        isDimmed ? 'opacity-35' : 'opacity-100'
                      } ${
                        isHighlighted
                          ? 'text-neutral-950 dark:text-neutral-50 font-medium'
                          : 'text-neutral-900 dark:text-neutral-100'
                      }`}
                    >
                      <span className="sm:col-span-6 text-[15px]">
                        {edu.program}
                      </span>
                      <span className="sm:col-span-4 text-[14px] text-neutral-700 dark:text-neutral-300">
                        {edu.institution} · {edu.location}
                      </span>
                      <span className="sm:col-span-2 sm:text-right font-mono text-[13.5px] tabular-nums text-neutral-700 dark:text-neutral-300">
                        {edu.year}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </EditorialSection>

            {/* 6. Idiomas (matches "Languages") */}
            <EditorialSection id="idiomas" title="Idiomas">
              <ul className="space-y-2.5">
                {CV_DATA.languages.map((lang) => (
                  <li
                    key={lang.language}
                    className="grid grid-cols-2 sm:grid-cols-12 gap-x-6 items-baseline py-0.5"
                  >
                    <span className="sm:col-span-6 text-[15px] text-neutral-900 dark:text-neutral-100">
                      {lang.language}
                    </span>
                    <span className="sm:col-span-6 text-right text-[14.5px] text-neutral-700 dark:text-neutral-300">
                      {lang.proficiency}
                    </span>
                  </li>
                ))}
              </ul>
            </EditorialSection>
          </main>

          {/* Quiet Editorial Footer with real utilities (Print, Download PDF, Theme switch) */}
          <footer className="mt-4">
            <HairlineRule className="mb-7" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[13px] text-neutral-700 dark:text-neutral-400">
              <div className="flex items-center gap-3">
                <span>{CV_DATA.fullName}</span>
                <span aria-hidden="true">·</span>
                <span>{CV_DATA.titleShort}</span>
              </div>

              <div className="no-print flex flex-wrap items-center gap-5">
                {copiedField ? (
                  <span
                    role="status"
                    aria-live="polite"
                    className="inline-flex items-center gap-1.5 text-neutral-950 dark:text-neutral-100 font-medium"
                  >
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    {copiedField === 'email'
                      ? 'Correo copiado'
                      : 'Teléfono copiado'}
                  </span>
                ) : null}

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900 dark:focus-visible:outline-neutral-100"
                >
                  <Printer className="w-3.5 h-3.5" strokeWidth={1.6} aria-hidden="true" />
                  <span>Imprimir</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDarkMode((prev) => !prev)}
                  aria-label={
                    darkMode ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'
                  }
                  className="inline-flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900 dark:focus-visible:outline-neutral-100"
                >
                  {darkMode ? (
                    <>
                      <Sun className="w-3.5 h-3.5" strokeWidth={1.6} aria-hidden="true" />
                      <span>Modo papel</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5" strokeWidth={1.6} aria-hidden="true" />
                      <span>Modo oscuro</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </MotionConfig>
  );
}
