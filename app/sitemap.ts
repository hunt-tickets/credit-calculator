import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://creditcalculator.com';
  const lastModified = new Date();

  return [
    // Main pages
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          es: `${baseUrl}/es`,
        },
      },
    },
    {
      url: `${baseUrl}/es`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          es: `${baseUrl}/es`,
        },
      },
    },

    // Mortgage Calculator
    {
      url: `${baseUrl}/en/mortgage-calculator`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/mortgage-calculator`,
          es: `${baseUrl}/es/calculadora-hipoteca`,
        },
      },
    },
    {
      url: `${baseUrl}/es/calculadora-hipoteca`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/mortgage-calculator`,
          es: `${baseUrl}/es/calculadora-hipoteca`,
        },
      },
    },

    // Auto Loan Calculator
    {
      url: `${baseUrl}/en/auto-loan-calculator`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/auto-loan-calculator`,
          es: `${baseUrl}/es/calculadora-auto`,
        },
      },
    },
    {
      url: `${baseUrl}/es/calculadora-auto`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/auto-loan-calculator`,
          es: `${baseUrl}/es/calculadora-auto`,
        },
      },
    },

    // Student Loan Calculator
    {
      url: `${baseUrl}/en/student-loan-calculator`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/student-loan-calculator`,
          es: `${baseUrl}/es/calculadora-estudiante`,
        },
      },
    },
    {
      url: `${baseUrl}/es/calculadora-estudiante`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/student-loan-calculator`,
          es: `${baseUrl}/es/calculadora-estudiante`,
        },
      },
    },

    // Debt Consolidation Calculator
    {
      url: `${baseUrl}/en/debt-consolidation-calculator`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/debt-consolidation-calculator`,
          es: `${baseUrl}/es/calculadora-consolidacion`,
        },
      },
    },
    {
      url: `${baseUrl}/es/calculadora-consolidacion`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/debt-consolidation-calculator`,
          es: `${baseUrl}/es/calculadora-consolidacion`,
        },
      },
    },
  ];
}
