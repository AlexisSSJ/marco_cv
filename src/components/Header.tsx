import { Check, Copy } from 'lucide-react';
import { motion } from 'motion/react';
import { CV_DATA } from '../data/cvData';
import { EDITORIAL_EASE } from './MotionPrimitives';

interface HeaderProps {
  copiedField: 'email' | 'phone' | null;
  onCopy: (value: string, field: 'email' | 'phone') => void;
}

const NAV_LINKS = [
  { label: 'Perfil', href: '#perfil' },
  { label: 'Competencias', href: '#competencias' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Formación', href: '#formacion' },
];

export function Header({ copiedField, onCopy }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EDITORIAL_EASE }}
      className="grid grid-cols-2 md:grid-cols-12 gap-y-6 md:gap-x-8 items-start text-[13px] md:text-[13.5px] leading-[1.6] text-neutral-900 dark:text-neutral-100"
    >
      {/* Zone 1: Minimalist document title (matches "Resume" top-left in reference layout) */}
      <div className="col-span-1 md:col-span-4">
        <a
          href="#top"
          className="inline-block font-normal tracking-[-0.01em] text-neutral-950 dark:text-neutral-50 hover:opacity-65 transition-opacity whitespace-nowrap"
        >
          Currículum
        </a>
      </div>

      {/* Zone 2: Contact links aligned in middle-right track (matches phone & email block in reference layout) */}
      <div className="col-span-2 order-3 md:order-2 md:col-span-5 flex flex-col items-start md:items-end gap-1">
        <div className="inline-flex items-center gap-2">
          <a
            href={`tel:${CV_DATA.phoneRaw}`}
            className="editorial-link font-mono text-[12.5px] tabular-nums whitespace-nowrap"
          >
            {CV_DATA.phoneDisplay}
          </a>
          <button
            type="button"
            onClick={() => onCopy(CV_DATA.phoneDisplay, 'phone')}
            aria-label="Copiar número de teléfono"
            title="Copiar teléfono"
            className="no-print inline-flex items-center justify-center w-6 h-6 rounded text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:focus-visible:outline-neutral-100 cursor-pointer"
          >
            {copiedField === 'phone' ? (
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Copy className="w-3 h-3 opacity-60 hover:opacity-100" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="inline-flex items-center gap-2 max-w-full">
          <a
            href={`mailto:${CV_DATA.email}`}
            className="editorial-link text-[13px] truncate max-w-[260px] sm:max-w-none"
          >
            {CV_DATA.email}
          </a>
          <button
            type="button"
            onClick={() => onCopy(CV_DATA.email, 'email')}
            aria-label="Copiar correo electrónico"
            title="Copiar correo"
            className="no-print inline-flex items-center justify-center w-6 h-6 shrink-0 rounded text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:focus-visible:outline-neutral-100 cursor-pointer"
          >
            {copiedField === 'email' ? (
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Copy className="w-3 h-3 opacity-60 hover:opacity-100" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Zone 3: Right-aligned vertical editorial nav stack (matches right link column in reference layout) */}
      <nav
        aria-label="Navegación principal"
        className="no-print col-span-1 order-2 md:order-3 md:col-span-3 flex flex-col items-end gap-0.5"
      >
        {NAV_LINKS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="editorial-link whitespace-nowrap"
          >
            {item.label}
          </a>
        ))}
        <a
          href={CV_DATA.pdfPath}
          download={CV_DATA.pdfFileName}
          className="editorial-link whitespace-nowrap mt-0.5 font-medium"
        >
          CV en PDF
        </a>
      </nav>
    </motion.header>
  );
}
