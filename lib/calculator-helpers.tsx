import type { Metadata } from 'next';
import type { CalculatorType } from './calculator-configs';
import type { Locale } from './i18n';
import { getCalculatorContent } from './calculator-content';
import { getDictionary } from './dictionaries';

export function generateCalculatorMetadata(
  type: CalculatorType,
  locale: Locale,
  canonicalPath: string,
  alternatePath: string
): Metadata {
  const content = getCalculatorContent(type, locale);

  return {
    title: content.meta.title,
    description: content.meta.description,
    keywords: content.meta.keywords,
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en': canonicalPath,
        'es': alternatePath,
      },
    },
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      url: canonicalPath,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'es_ES',
      alternateLocale: locale === 'en' ? 'es_ES' : 'en_US',
    },
  };
}

export function generateCalculatorSchema(type: CalculatorType, locale: Locale) {
  const content = getCalculatorContent(type, locale);
  const dict = getDictionary(locale);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: content.hero.title,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: content.meta.description,
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: dict.faq.q1.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: dict.faq.q1.answer,
            },
          },
          {
            '@type': 'Question',
            name: dict.faq.q2.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: dict.faq.q2.answer,
            },
          },
          {
            '@type': 'Question',
            name: dict.faq.q3.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: dict.faq.q3.answer,
            },
          },
        ],
      },
    ],
  };
}

type RelatedLink = {
  href: string;
  title: string;
  description: string;
};

export function getRelatedLinks(locale: Locale, excludeType?: CalculatorType): RelatedLink[] {
  const isEnglish = locale === 'en';

  const allLinks: Record<CalculatorType, RelatedLink> = {
    general: {
      href: isEnglish ? '/en' : '/es',
      title: isEnglish ? 'Credit Calculator' : 'Calculadora de Crédito',
      description: isEnglish
        ? 'General loan payment calculator'
        : 'Calculadora de pagos de préstamos generales',
    },
    mortgage: {
      href: isEnglish ? '/en/mortgage-calculator' : '/es/calculadora-hipoteca',
      title: isEnglish ? 'Mortgage Calculator' : 'Calculadora de Hipoteca',
      description: isEnglish
        ? 'Calculate home loan payments'
        : 'Calcula pagos de préstamos hipotecarios',
    },
    auto: {
      href: isEnglish ? '/en/auto-loan-calculator' : '/es/calculadora-auto',
      title: isEnglish ? 'Auto Loan Calculator' : 'Calculadora de Préstamo de Auto',
      description: isEnglish
        ? 'Calculate car loan payments'
        : 'Calcula pagos de préstamos de auto',
    },
    student: {
      href: isEnglish ? '/en/student-loan-calculator' : '/es/calculadora-estudiante',
      title: isEnglish ? 'Student Loan Calculator' : 'Calculadora de Préstamo Estudiantil',
      description: isEnglish
        ? 'Estimate education loan payments'
        : 'Estima pagos de préstamos educativos',
    },
    'debt-consolidation': {
      href: isEnglish ? '/en/debt-consolidation-calculator' : '/es/calculadora-consolidacion',
      title: isEnglish ? 'Debt Consolidation Calculator' : 'Calculadora de Consolidación de Deudas',
      description: isEnglish
        ? 'Consolidate multiple debts'
        : 'Consolida múltiples deudas',
    },
  };

  // Return all links except the one matching excludeType
  return Object.entries(allLinks)
    .filter(([type]) => type !== excludeType)
    .map(([_, link]) => link)
    .slice(0, 3); // Show max 3 related calculators
}
