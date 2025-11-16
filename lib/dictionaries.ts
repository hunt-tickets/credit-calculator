import type { Locale } from './i18n';

const dictionaries = {
  en: {
    meta: {
      title: 'Credit Calculator - Free Online Loan & Mortgage Simulator',
      description: 'Calculate your loan payments instantly with our free credit calculator. Estimate monthly payments, total interest, and amortization schedules for mortgages, auto loans, and personal loans.',
      keywords: 'credit calculator, loan calculator, mortgage calculator, payment calculator, amortization calculator, interest calculator, free loan calculator',
    },
    hero: {
      title: 'Credit Calculator',
      subtitle: 'Calculate your loan payments instantly and plan your finances with confidence',
      description: 'Free online tool to simulate loans, mortgages, and credits with detailed amortization schedules.',
    },
    calculator: {
      amount: 'Loan Amount',
      amountPlaceholder: 'Enter amount',
      rate: 'Annual Interest Rate (%)',
      ratePlaceholder: 'Enter rate',
      term: 'Loan Term (months)',
      termPlaceholder: 'Enter months',
      calculate: 'Calculate Payment',
      results: 'Results',
      monthlyPayment: 'Monthly Payment',
      totalInterest: 'Total Interest',
      totalAmount: 'Total Amount to Pay',
      amortization: 'Amortization Schedule',
      month: 'Month',
      payment: 'Payment',
      principal: 'Principal',
      interest: 'Interest',
      balance: 'Balance',
      showSchedule: 'Show Amortization Schedule',
      hideSchedule: 'Hide Amortization Schedule',
    },
    features: {
      title: 'Why Use Our Credit Calculator?',
      instant: {
        title: 'Instant Results',
        description: 'Get immediate calculations for your loan payments and total costs.',
      },
      detailed: {
        title: 'Detailed Breakdown',
        description: 'View complete amortization schedules showing principal and interest for each payment.',
      },
      free: {
        title: '100% Free',
        description: 'No registration required. Use our calculator as many times as you need.',
      },
      accurate: {
        title: 'Accurate Calculations',
        description: 'Precise financial calculations using standard loan formulas.',
      },
    },
    faq: {
      title: 'Frequently Asked Questions',
      q1: {
        question: 'How is the monthly payment calculated?',
        answer: 'The monthly payment is calculated using the standard amortization formula: M = P × [r(1+r)^n] / [(1+r)^n-1], where M is the monthly payment, P is the principal loan amount, r is the monthly interest rate, and n is the number of payments.',
      },
      q2: {
        question: 'What types of loans can I calculate?',
        answer: 'You can use this calculator for any type of loan including mortgages, auto loans, personal loans, student loans, and business loans. The calculator works for any loan with fixed monthly payments.',
      },
      q3: {
        question: 'What is an amortization schedule?',
        answer: 'An amortization schedule is a table showing each loan payment over time. It breaks down how much of each payment goes toward the principal balance versus interest, and shows the remaining balance after each payment.',
      },
      q4: {
        question: 'Can I use this calculator for my mortgage?',
        answer: 'Yes! This calculator is perfect for mortgage calculations. Enter your loan amount, interest rate, and term (typically 180, 240, or 360 months for 15, 20, or 30-year mortgages) to see your monthly payment and total interest.',
      },
    },
    footer: {
      disclaimer: 'This calculator provides estimates for educational purposes only. Actual loan terms may vary. Consult with a financial advisor for personalized advice.',
      rights: 'All rights reserved.',
    },
  },
  es: {
    meta: {
      title: 'Calculadora de Crédito - Simulador Gratuito de Préstamos e Hipotecas',
      description: 'Calcula tus pagos de préstamo al instante con nuestra calculadora de crédito gratuita. Estima pagos mensuales, intereses totales y tablas de amortización para hipotecas, préstamos de auto y préstamos personales.',
      keywords: 'calculadora de crédito, calculadora de préstamos, calculadora de hipoteca, calculadora de pagos, calculadora de amortización, calculadora de intereses, calculadora de préstamos gratis',
    },
    hero: {
      title: 'Calculadora de Crédito',
      subtitle: 'Calcula tus pagos de préstamo al instante y planifica tus finanzas con confianza',
      description: 'Herramienta gratuita en línea para simular préstamos, hipotecas y créditos con tablas de amortización detalladas.',
    },
    calculator: {
      amount: 'Monto del Préstamo',
      amountPlaceholder: 'Ingrese el monto',
      rate: 'Tasa de Interés Anual (%)',
      ratePlaceholder: 'Ingrese la tasa',
      term: 'Plazo del Préstamo (meses)',
      termPlaceholder: 'Ingrese meses',
      calculate: 'Calcular Pago',
      results: 'Resultados',
      monthlyPayment: 'Pago Mensual',
      totalInterest: 'Interés Total',
      totalAmount: 'Monto Total a Pagar',
      amortization: 'Tabla de Amortización',
      month: 'Mes',
      payment: 'Pago',
      principal: 'Capital',
      interest: 'Interés',
      balance: 'Saldo',
      showSchedule: 'Mostrar Tabla de Amortización',
      hideSchedule: 'Ocultar Tabla de Amortización',
    },
    features: {
      title: '¿Por Qué Usar Nuestra Calculadora de Crédito?',
      instant: {
        title: 'Resultados Instantáneos',
        description: 'Obtén cálculos inmediatos de tus pagos de préstamo y costos totales.',
      },
      detailed: {
        title: 'Desglose Detallado',
        description: 'Visualiza tablas de amortización completas mostrando capital e interés para cada pago.',
      },
      free: {
        title: '100% Gratis',
        description: 'No requiere registro. Usa nuestra calculadora tantas veces como necesites.',
      },
      accurate: {
        title: 'Cálculos Precisos',
        description: 'Cálculos financieros precisos utilizando fórmulas estándar de préstamos.',
      },
    },
    faq: {
      title: 'Preguntas Frecuentes',
      q1: {
        question: '¿Cómo se calcula el pago mensual?',
        answer: 'El pago mensual se calcula usando la fórmula estándar de amortización: M = P × [r(1+r)^n] / [(1+r)^n-1], donde M es el pago mensual, P es el monto principal del préstamo, r es la tasa de interés mensual, y n es el número de pagos.',
      },
      q2: {
        question: '¿Qué tipos de préstamos puedo calcular?',
        answer: 'Puedes usar esta calculadora para cualquier tipo de préstamo incluyendo hipotecas, préstamos de auto, préstamos personales, préstamos estudiantiles y préstamos comerciales. La calculadora funciona para cualquier préstamo con pagos mensuales fijos.',
      },
      q3: {
        question: '¿Qué es una tabla de amortización?',
        answer: 'Una tabla de amortización es una tabla que muestra cada pago del préstamo a lo largo del tiempo. Detalla cuánto de cada pago se destina al saldo principal versus los intereses, y muestra el saldo restante después de cada pago.',
      },
      q4: {
        question: '¿Puedo usar esta calculadora para mi hipoteca?',
        answer: '¡Sí! Esta calculadora es perfecta para cálculos de hipotecas. Ingresa el monto de tu préstamo, tasa de interés y plazo (típicamente 180, 240 o 360 meses para hipotecas de 15, 20 o 30 años) para ver tu pago mensual e interés total.',
      },
    },
    footer: {
      disclaimer: 'Esta calculadora proporciona estimaciones solo con fines educativos. Los términos reales del préstamo pueden variar. Consulta con un asesor financiero para obtener asesoramiento personalizado.',
      rights: 'Todos los derechos reservados.',
    },
  },
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
