export type CalculatorType = 'general' | 'mortgage' | 'auto' | 'student' | 'debt-consolidation';

export interface CalculatorDefaults {
  amount?: string;
  rate?: string;
  term?: string;
  termUnit?: 'months' | 'years';
  downPayment?: string;
  currency?: string;
}

export interface CalculatorConfig {
  type: CalculatorType;
  defaults: CalculatorDefaults;
  slug: {
    en: string;
    es: string;
  };
}

export const calculatorConfigs: Record<CalculatorType, CalculatorConfig> = {
  general: {
    type: 'general',
    defaults: {
      term: '12',
      termUnit: 'months',
    },
    slug: {
      en: '',
      es: '',
    },
  },
  mortgage: {
    type: 'mortgage',
    defaults: {
      amount: '300.000',
      rate: '6.5',
      term: '30',
      termUnit: 'years',
      downPayment: '60.000',
    },
    slug: {
      en: 'mortgage-calculator',
      es: 'calculadora-hipoteca',
    },
  },
  auto: {
    type: 'auto',
    defaults: {
      amount: '30.000',
      rate: '5.5',
      term: '5',
      termUnit: 'years',
      downPayment: '5.000',
    },
    slug: {
      en: 'auto-loan-calculator',
      es: 'calculadora-auto',
    },
  },
  student: {
    type: 'student',
    defaults: {
      amount: '50.000',
      rate: '4.5',
      term: '10',
      termUnit: 'years',
    },
    slug: {
      en: 'student-loan-calculator',
      es: 'calculadora-estudiante',
    },
  },
  'debt-consolidation': {
    type: 'debt-consolidation',
    defaults: {
      amount: '25.000',
      rate: '8.5',
      term: '5',
      termUnit: 'years',
    },
    slug: {
      en: 'debt-consolidation-calculator',
      es: 'calculadora-consolidacion',
    },
  },
};

export function getCalculatorConfig(type: CalculatorType): CalculatorConfig {
  return calculatorConfigs[type];
}
