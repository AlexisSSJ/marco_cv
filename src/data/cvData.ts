export interface TechnicalSkill {
  id: string;
  name: string;
  level?: string;
  relatedCourses: string[];
}

export interface Achievement {
  id: string;
  metric: string;
  metricLabel: string;
  summary: string;
  relatedSkills: string[];
}

export interface WorkItem {
  company: string;
  role: string;
  period: string;
  responsibilities: string[];
  achievements: Achievement[];
}

export interface EducationItem {
  id: string;
  institution: string;
  location: string;
  program: string;
  year: string;
  skillId?: string;
}

export interface LanguageItem {
  language: string;
  proficiency: string;
}

export const CV_DATA = {
  fullName: 'Marco Ramírez López',
  greetingLine: 'Marco Ramírez López',
  roleLine: '— Actuario & Analista de Datos.',
  titleShort: 'Actuario',
  phoneDisplay: '+(52) 442 230 2502',
  phoneRaw: '+524422302502',
  email: 'marco.ramirez.lopez1328@gmail.com',
  pdfPath: '/assets/aistudio/CV_daa5ee46.pdf',
  pdfFileName: 'CV_Marco_Ramirez_Lopez.pdf',

  profile:
    'Soy un profesional interesado por la industria del Data Science y Data Analysis, comprometido con la optimización de procesos para impulsar resultados diferenciales y disruptivos. Con una mente crítica y observadora, tengo la capacidad de identificar oportunidades de mejora y eficiencia en cualquier entorno empresarial.',

  competencesIntro: [
    'Mi formación actuarial y enfoque analítico me permiten estructurar problemas complejos con pensamiento matemático riguroso, limpiar y modelar datos de negocio, y diseñar tableros automatizados que transforman información operativa en decisiones estratégicas.',
    'Me integro con facilidad a equipos multidisciplinarios, combinando organización, aprendizaje autodidacta y gestión efectiva bajo presión para proponer soluciones creativas y adaptables a cada reto empresarial.',
  ],

  softSkills: [
    'Pensamiento Matemático y Estructurado',
    'Fácil interacción con Equipos formados',
    'Trabajo en Equipo',
    'Gestión Efectiva bajo Presión',
    'Soluciones Creativas',
    'Curiosidad intelectual',
    'Organizado',
    'Autodidacta',
    'Adaptabilidad',
  ],

  technicalSkills: [
    { id: 'excel', name: 'Excel', level: 'Avanzado', relatedCourses: ['amat-excel'] },
    { id: 'r', name: 'Lenguaje R', level: 'Medio', relatedCourses: ['amat-r'] },
    { id: 'python', name: 'Python', relatedCourses: ['amat-python'] },
    { id: 'powerbi', name: 'Power BI', relatedCourses: ['amat-powerbi'] },
    { id: 'sql', name: 'SQL', relatedCourses: ['amat-sql'] },
  ] as TechnicalSkill[],

  workHistory: [
    {
      company: 'Empresa de Seguros',
      role: 'Analista de Datos y Soporte en Ventas',
      period: '1 año',
      achievements: [
        {
          id: 'ventas-dashboards',
          metric: '+$400k',
          metricLabel: 'en más de 3 ventas cerradas',
          summary:
            'Cerré más de 3 ventas con un valor superior a $400k mediante el análisis y control de dashboards, proporcionando información de clientes que permitió implementar medidas de disminución de riesgos y ajuste de coberturas, reduciendo el costo de adquisición de su seguro empresarial.',
          relatedSkills: ['powerbi', 'excel', 'sql'],
        },
        {
          id: 'eficiencia-cobranza',
          metric: '+300%',
          metricLabel: 'eficiencia de cobranza · 90% < 25 días',
          summary:
            'Optimicé los procesos obsoletos de reporte de cobranza mediante la implementación de tableros automáticos, logrando un incremento del 300% en la eficiencia y un crecimiento de liquidez con el 90% de las facturas cobradas antes de cumplir 25 días.',
          relatedSkills: ['powerbi', 'excel', 'python'],
        },
        {
          id: 'automatizacion-pymes',
          metric: '< 2.6%',
          metricLabel: 'incidencias por atención',
          summary:
            'Implementé la automatización en procesos operativos relacionados con los tiempos de respuesta hacia las PyMES, agilizando la interacción y disminuyendo las incidencias por atención a menos del 2.6%.',
          relatedSkills: ['python', 'sql', 'excel'],
        },
      ],
      responsibilities: [
        'Gestionar cuentas PyMES, atendiendo a sus necesidades y actividades específicas.',
        'Administrar estratégicamente las ventas de seguros de gastos médicos y vida adaptados a las PyMES, ofreciendo nuevas soluciones adecuadas a sus requerimientos.',
        'Optimizar la cobranza y gestión efectiva de pagos, asegurando la continuidad de la cobertura para las PyMES.',
        'Analizar detalladamente los datos relacionados con la siniestralidad de cada empresa asegurada, identificando tendencias y patrones para mejorar la eficiencia y precisión en la gestión de riesgos.',
        'Depurar y limpiar datos en relación con la siniestralidad, garantizando la exactitud y fiabilidad de la información utilizada en el proceso de toma de decisiones.',
      ],
    },
  ] as WorkItem[],

  education: [
    {
      id: 'amat-powerbi',
      institution: 'AMAT',
      location: 'CDMX',
      program: 'Power BI',
      year: '2024',
      skillId: 'powerbi',
    },
    {
      id: 'amat-sql',
      institution: 'AMAT',
      location: 'CDMX',
      program: 'SQL',
      year: '2023',
      skillId: 'sql',
    },
    {
      id: 'amat-python',
      institution: 'AMAT',
      location: 'CDMX',
      program: 'Python',
      year: '2023',
      skillId: 'python',
    },
    {
      id: 'amat-r',
      institution: 'AMAT',
      location: 'CDMX',
      program: 'Lenguaje R',
      year: '2021',
      skillId: 'r',
    },
    {
      id: 'amat-excel',
      institution: 'AMAT',
      location: 'CDMX',
      program: 'Excel Avanzado',
      year: '2020',
      skillId: 'excel',
    },
    {
      id: 'inlingua-en',
      institution: 'Instituto Inlingua',
      location: 'Canadá, CB',
      program: 'Inglés',
      year: '2017',
    },
  ] as EducationItem[],

  languages: [
    { language: 'Español', proficiency: 'Nativo' },
    { language: 'Inglés', proficiency: 'Intermedio Alto (B2)' },
  ] as LanguageItem[],
} as const;
