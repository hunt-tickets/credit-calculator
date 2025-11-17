import type { CalculatorType } from './calculator-configs';
import type { Locale } from './i18n';

export interface CalculatorContent {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  seo: {
    whatIs: {
      title: string;
      content: string;
    };
    whoCanUse: {
      title: string;
      content: string;
    };
  };
  relatedCalculators: {
    title: string;
  };
}

type ContentByType = Record<CalculatorType, Record<Locale, CalculatorContent>>;

export const calculatorContent: ContentByType = {
  general: {
    en: {
      meta: {
        title: 'Credit Calculator | Loan Payment & Amortization Schedule',
        description: 'Calculate your loan payments instantly with our free credit calculator. Estimate monthly payments, total interest, and amortization schedules for mortgages, auto loans, and personal loans.',
        keywords: 'credit calculator, loan calculator, mortgage calculator, payment calculator, amortization calculator, interest calculator, free loan calculator',
      },
      hero: {
        title: 'Credit Calculator – Loan Payment & Amortization Schedule',
        subtitle: 'Calculate your loan payments instantly and plan your finances with confidence',
        description: 'Free online tool to simulate personal loans, mortgages, and credits with detailed amortization tables.',
      },
      seo: {
        whatIs: {
          title: 'What Is a Loan Payment Calculator?',
          content: 'A loan payment calculator is a financial tool that helps you estimate your monthly payments for various types of loans including personal loans, mortgages, auto loans, and business financing. Our credit calculator uses standard amortization formulas to calculate how much you\'ll pay each month, the total interest cost over the life of the loan, and provides a detailed payment schedule showing how each payment is split between principal and interest. Whether you\'re planning for a mortgage loan calculator scenario, an auto loan, or a personal loan calculator calculation, this tool gives you accurate estimates to help with your financial planning.',
        },
        whoCanUse: {
          title: 'Who Can Use This Credit Calculator?',
          content: 'This loan calculator is perfect for anyone considering taking out a loan or credit. Homebuyers can use it as a mortgage calculator to estimate monthly payments for home loans. Car shoppers can calculate auto loan payments and compare different financing options. Small business owners can estimate business loan costs. Students can plan student loan repayment strategies. Personal loan applicants can compare offers from different lenders. Financial advisors can use it to demonstrate loan scenarios to clients. The calculator works for any fixed-rate installment loan, making it a versatile personal loan simulator for various credit needs.',
        },
      },
      relatedCalculators: {
        title: 'Related Loan Calculators',
      },
    },
    es: {
      meta: {
        title: 'Calculadora de Crédito | Simulador de Préstamos y Tabla de Amortización',
        description: 'Calcula tus pagos de préstamo al instante con nuestra calculadora de crédito gratuita. Estima pagos mensuales, intereses totales y tablas de amortización para hipotecas, préstamos de auto y préstamos personales.',
        keywords: 'calculadora de crédito, calculadora de préstamos, calculadora de hipoteca, calculadora de pagos, calculadora de amortización, calculadora de intereses, calculadora de préstamos gratis',
      },
      hero: {
        title: 'Calculadora de Crédito – Simulador de Préstamos y Tabla de Amortización',
        subtitle: 'Calcula tus pagos de préstamo al instante y planifica tus finanzas con confianza',
        description: 'Herramienta gratuita en línea para simular préstamos personales, créditos e hipotecas con tablas de amortización detalladas.',
      },
      seo: {
        whatIs: {
          title: '¿Qué es una Calculadora de Préstamos?',
          content: 'Una calculadora de préstamos es una herramienta financiera que te ayuda a estimar tus pagos mensuales para varios tipos de créditos incluyendo préstamos personales, hipotecas, préstamos de auto y financiamiento empresarial. Nuestra calculadora de crédito usa fórmulas estándar de amortización para calcular cuánto pagarás cada mes, el costo total de intereses durante la vida del préstamo, y proporciona un cronograma detallado de pagos mostrando cómo cada pago se divide entre capital e interés. Ya sea que estés planeando un escenario de calculadora de hipoteca, un préstamo de auto, o un cálculo de simulador de préstamos personales, esta herramienta te da estimaciones precisas para ayudar con tu planificación financiera.',
        },
        whoCanUse: {
          title: '¿Quién Puede Usar Esta Calculadora de Crédito?',
          content: 'Esta calculadora de préstamos es perfecta para cualquier persona que esté considerando obtener un préstamo o crédito. Los compradores de vivienda pueden usarla como calculadora de hipoteca para estimar pagos mensuales de préstamos hipotecarios. Los compradores de autos pueden calcular pagos de préstamos de auto y comparar diferentes opciones de financiamiento. Los dueños de pequeñas empresas pueden estimar costos de préstamos comerciales. Los estudiantes pueden planificar estrategias de pago de préstamos estudiantiles. Los solicitantes de préstamos personales pueden comparar ofertas de diferentes prestamistas. Los asesores financieros pueden usarla para demostrar escenarios de préstamos a clientes. La calculadora funciona para cualquier préstamo a plazo fijo con tasa de interés fija, convirtiéndola en un simulador de préstamos personales versátil para diversas necesidades crediticias.',
        },
      },
      relatedCalculators: {
        title: 'Calculadoras de Préstamos Relacionadas',
      },
    },
  },
  mortgage: {
    en: {
      meta: {
        title: 'Mortgage Calculator | Home Loan Payment & Amortization Calculator',
        description: 'Calculate your mortgage payments with our free mortgage calculator. Estimate monthly payments, total interest, and amortization schedules for 15-year and 30-year home loans.',
        keywords: 'mortgage calculator, home loan calculator, mortgage payment calculator, mortgage amortization calculator, house payment calculator, home mortgage calculator',
      },
      hero: {
        title: 'Mortgage Calculator – Home Loan Payment Estimator',
        subtitle: 'Calculate your monthly mortgage payments and plan your home purchase with confidence',
        description: 'Free mortgage calculator to estimate monthly payments for 15-year, 20-year, and 30-year home loans with detailed amortization schedules.',
      },
      seo: {
        whatIs: {
          title: 'What Is a Mortgage Calculator?',
          content: 'A mortgage calculator is a specialized loan payment calculator designed specifically for home loans. It helps prospective homebuyers estimate their monthly mortgage payments based on the home price, down payment, interest rate, and loan term. Our mortgage payment calculator takes into account principal, interest, and optionally property insurance and origination fees to give you an accurate picture of your total monthly housing costs. Whether you\'re considering a 15-year mortgage for faster equity building or a 30-year mortgage for lower monthly payments, this home loan calculator provides detailed amortization schedules showing how each payment reduces your loan balance over time. The calculator is essential for anyone shopping for a home, refinancing an existing mortgage, or comparing different mortgage offers from lenders.',
        },
        whoCanUse: {
          title: 'Who Should Use This Mortgage Calculator?',
          content: 'This mortgage payment calculator is perfect for first-time homebuyers who need to understand what monthly payment they can afford before house hunting. Real estate investors can use it to calculate potential rental property mortgage costs and determine if rental income will cover the mortgage. Homeowners considering refinancing can compare their current mortgage with new offers to see potential savings. Financial planners can demonstrate different mortgage scenarios to clients, showing how down payment size, interest rates, and loan terms affect monthly payments and total interest paid. The calculator is also invaluable for anyone trying to decide between a 15-year and 30-year mortgage, or between different down payment amounts. By adjusting the inputs, you can see exactly how each factor impacts your monthly payment and total loan cost.',
        },
      },
      relatedCalculators: {
        title: 'Related Loan Calculators',
      },
    },
    es: {
      meta: {
        title: 'Calculadora de Hipoteca | Calculadora de Préstamos Hipotecarios',
        description: 'Calcula tus pagos de hipoteca con nuestra calculadora de hipoteca gratuita. Estima pagos mensuales, intereses totales y tablas de amortización para préstamos hipotecarios de 15 y 30 años.',
        keywords: 'calculadora de hipoteca, calculadora de préstamo hipotecario, calculadora de pagos hipotecarios, calculadora de amortización hipotecaria, calculadora de casa',
      },
      hero: {
        title: 'Calculadora de Hipoteca – Estimador de Pagos de Préstamos Hipotecarios',
        subtitle: 'Calcula tus pagos mensuales de hipoteca y planifica la compra de tu casa con confianza',
        description: 'Calculadora de hipoteca gratuita para estimar pagos mensuales de préstamos hipotecarios a 15, 20 y 30 años con tablas de amortización detalladas.',
      },
      seo: {
        whatIs: {
          title: '¿Qué es una Calculadora de Hipoteca?',
          content: 'Una calculadora de hipoteca es una calculadora de pagos de préstamos especializada diseñada específicamente para préstamos hipotecarios. Ayuda a los futuros compradores de vivienda a estimar sus pagos mensuales de hipoteca basándose en el precio de la casa, el enganche, la tasa de interés y el plazo del préstamo. Nuestra calculadora de pagos hipotecarios toma en cuenta el capital, los intereses, y opcionalmente el seguro de la propiedad y las comisiones de apertura para darte una imagen precisa de tus costos mensuales totales de vivienda. Ya sea que estés considerando una hipoteca a 15 años para construir capital más rápido o una hipoteca a 30 años para pagos mensuales más bajos, esta calculadora de préstamos hipotecarios proporciona tablas de amortización detalladas que muestran cómo cada pago reduce el saldo de tu préstamo con el tiempo.',
        },
        whoCanUse: {
          title: '¿Quién Debería Usar Esta Calculadora de Hipoteca?',
          content: 'Esta calculadora de pagos hipotecarios es perfecta para compradores de vivienda por primera vez que necesitan entender qué pago mensual pueden pagar antes de buscar casa. Los inversionistas inmobiliarios pueden usarla para calcular los costos potenciales de hipoteca de propiedades de alquiler y determinar si los ingresos por alquiler cubrirán la hipoteca. Los propietarios que consideran refinanciar pueden comparar su hipoteca actual con nuevas ofertas para ver ahorros potenciales. Los planificadores financieros pueden demostrar diferentes escenarios de hipoteca a los clientes, mostrando cómo el tamaño del enganche, las tasas de interés y los plazos del préstamo afectan los pagos mensuales y el interés total pagado.',
        },
      },
      relatedCalculators: {
        title: 'Calculadoras de Préstamos Relacionadas',
      },
    },
  },
  auto: {
    en: {
      meta: {
        title: 'Auto Loan Calculator | Car Payment & Financing Calculator',
        description: 'Calculate your car loan payments with our free auto loan calculator. Estimate monthly payments, total interest, and amortization schedules for new and used car financing.',
        keywords: 'auto loan calculator, car loan calculator, car payment calculator, auto financing calculator, vehicle loan calculator, car finance calculator',
      },
      hero: {
        title: 'Auto Loan Calculator – Car Payment Estimator',
        subtitle: 'Calculate your monthly car payments and plan your auto purchase with confidence',
        description: 'Free auto loan calculator to estimate monthly payments for new and used car financing with detailed amortization schedules.',
      },
      seo: {
        whatIs: {
          title: 'What Is an Auto Loan Calculator?',
          content: 'An auto loan calculator is a financial tool designed to help car buyers estimate their monthly payments for vehicle financing. This car payment calculator takes into account the vehicle price, down payment, trade-in value, interest rate, and loan term to calculate your monthly auto loan payment. Whether you\'re buying a new car or a used vehicle, this auto financing calculator helps you understand the total cost of your car loan including interest charges over the life of the loan. The calculator generates a detailed amortization schedule showing how each payment is divided between principal and interest, helping you make informed decisions about your car purchase. Most auto loans range from 36 to 72 months, and this calculator lets you compare different loan terms to find the best option for your budget.',
        },
        whoCanUse: {
          title: 'Who Should Use This Auto Loan Calculator?',
          content: 'This car loan calculator is essential for anyone shopping for a new or used vehicle. First-time car buyers can use it to determine what monthly payment fits their budget before visiting dealerships. Used car shoppers can compare financing options from dealers, banks, and credit unions to find the best auto loan rates. Car enthusiasts looking to upgrade their vehicle can calculate the impact of different down payment amounts and loan terms on their monthly payment. Parents helping their teenagers buy their first car can demonstrate how loan terms and interest rates affect the total cost. The calculator is also valuable for those considering whether to lease or buy, as it shows the total cost of ownership through financing. By experimenting with different scenarios—such as larger down payments or shorter loan terms—you can find the most affordable path to your next vehicle.',
        },
      },
      relatedCalculators: {
        title: 'Related Loan Calculators',
      },
    },
    es: {
      meta: {
        title: 'Calculadora de Préstamo de Auto | Calculadora de Pagos de Carro',
        description: 'Calcula tus pagos de préstamo de auto con nuestra calculadora de préstamo de auto gratuita. Estima pagos mensuales, intereses totales y tablas de amortización para financiamiento de autos nuevos y usados.',
        keywords: 'calculadora de préstamo de auto, calculadora de préstamo de carro, calculadora de pagos de auto, calculadora de financiamiento de auto, calculadora de vehículo',
      },
      hero: {
        title: 'Calculadora de Préstamo de Auto – Estimador de Pagos de Carro',
        subtitle: 'Calcula tus pagos mensuales de auto y planifica tu compra de vehículo con confianza',
        description: 'Calculadora de préstamo de auto gratuita para estimar pagos mensuales de financiamiento de autos nuevos y usados con tablas de amortización detalladas.',
      },
      seo: {
        whatIs: {
          title: '¿Qué es una Calculadora de Préstamo de Auto?',
          content: 'Una calculadora de préstamo de auto es una herramienta financiera diseñada para ayudar a los compradores de autos a estimar sus pagos mensuales para el financiamiento de vehículos. Esta calculadora de pagos de auto toma en cuenta el precio del vehículo, el enganche, el valor del intercambio, la tasa de interés y el plazo del préstamo para calcular tu pago mensual de préstamo de auto. Ya sea que estés comprando un auto nuevo o un vehículo usado, esta calculadora de financiamiento de auto te ayuda a entender el costo total de tu préstamo de auto incluyendo los cargos por intereses durante la vida del préstamo. La mayoría de los préstamos de auto van de 36 a 72 meses, y esta calculadora te permite comparar diferentes plazos de préstamo para encontrar la mejor opción para tu presupuesto.',
        },
        whoCanUse: {
          title: '¿Quién Debería Usar Esta Calculadora de Préstamo de Auto?',
          content: 'Esta calculadora de préstamo de auto es esencial para cualquier persona que esté comprando un vehículo nuevo o usado. Los compradores de autos por primera vez pueden usarla para determinar qué pago mensual se ajusta a su presupuesto antes de visitar concesionarios. Los compradores de autos usados pueden comparar opciones de financiamiento de concesionarios, bancos y cooperativas de crédito para encontrar las mejores tasas de préstamo de auto. Los entusiastas de los autos que buscan actualizar su vehículo pueden calcular el impacto de diferentes montos de enganche y plazos de préstamo en su pago mensual. Los padres que ayudan a sus adolescentes a comprar su primer auto pueden demostrar cómo los plazos de préstamo y las tasas de interés afectan el costo total.',
        },
      },
      relatedCalculators: {
        title: 'Calculadoras de Préstamos Relacionadas',
      },
    },
  },
  student: {
    en: {
      meta: {
        title: 'Student Loan Calculator | Education Loan Payment Calculator',
        description: 'Calculate your student loan payments with our free student loan calculator. Estimate monthly payments, total interest, and repayment schedules for education financing.',
        keywords: 'student loan calculator, education loan calculator, student loan payment calculator, college loan calculator, student debt calculator, education financing calculator',
      },
      hero: {
        title: 'Student Loan Calculator – Education Loan Payment Estimator',
        subtitle: 'Calculate your student loan payments and plan your education financing strategy',
        description: 'Free student loan calculator to estimate monthly payments and total costs for education loans with detailed repayment schedules.',
      },
      seo: {
        whatIs: {
          title: 'What Is a Student Loan Calculator?',
          content: 'A student loan calculator is a financial planning tool that helps students, recent graduates, and parents estimate monthly payments for education loans. This education loan calculator takes into account the total loan amount (which may include multiple loans from different years), interest rate, and repayment term to calculate your monthly student loan payment. Whether you have federal student loans, private student loans, or a combination of both, this calculator helps you understand how long it will take to pay off your student debt and how much interest you\'ll pay over the life of the loan. The calculator is particularly useful for students planning their education budget, as it can show how borrowing different amounts will affect your post-graduation monthly payments. Standard student loan repayment terms are typically 10 years, but this calculator allows you to explore extended repayment options or accelerated payoff scenarios.',
        },
        whoCanUse: {
          title: 'Who Should Use This Student Loan Calculator?',
          content: 'This student loan payment calculator is invaluable for high school students and their parents planning for college expenses. Current college students can use it to estimate their future monthly payments based on loans already taken and anticipated future borrowing. Recent graduates can calculate their monthly payment obligations and plan their post-college budget accordingly. Those considering graduate school can evaluate the financial impact of additional student loans on top of existing undergraduate debt. Parents taking out parent PLUS loans can determine if the monthly payments fit their budget. The calculator is also useful for borrowers considering student loan refinancing, as they can compare their current payment with potential new terms from private lenders. By using the extra payment feature, borrowers can also see how making additional payments can reduce their total interest and pay off student loans faster.',
        },
      },
      relatedCalculators: {
        title: 'Related Loan Calculators',
      },
    },
    es: {
      meta: {
        title: 'Calculadora de Préstamo Estudiantil | Calculadora de Préstamo Educativo',
        description: 'Calcula tus pagos de préstamo estudiantil con nuestra calculadora de préstamo estudiantil gratuita. Estima pagos mensuales, intereses totales y cronogramas de pago para financiamiento educativo.',
        keywords: 'calculadora de préstamo estudiantil, calculadora de préstamo educativo, calculadora de pagos de préstamo estudiantil, calculadora de préstamo universitario, calculadora de deuda estudiantil',
      },
      hero: {
        title: 'Calculadora de Préstamo Estudiantil – Estimador de Pagos de Préstamo Educativo',
        subtitle: 'Calcula tus pagos de préstamo estudiantil y planifica tu estrategia de financiamiento educativo',
        description: 'Calculadora de préstamo estudiantil gratuita para estimar pagos mensuales y costos totales de préstamos educativos con cronogramas de pago detallados.',
      },
      seo: {
        whatIs: {
          title: '¿Qué es una Calculadora de Préstamo Estudiantil?',
          content: 'Una calculadora de préstamo estudiantil es una herramienta de planificación financiera que ayuda a estudiantes, recién graduados y padres a estimar los pagos mensuales de préstamos educativos. Esta calculadora de préstamo educativo toma en cuenta el monto total del préstamo (que puede incluir múltiples préstamos de diferentes años), la tasa de interés y el plazo de pago para calcular tu pago mensual de préstamo estudiantil. Ya sea que tengas préstamos estudiantiles federales, préstamos estudiantiles privados o una combinación de ambos, esta calculadora te ayuda a entender cuánto tiempo te tomará pagar tu deuda estudiantil y cuánto interés pagarás durante la vida del préstamo.',
        },
        whoCanUse: {
          title: '¿Quién Debería Usar Esta Calculadora de Préstamo Estudiantil?',
          content: 'Esta calculadora de pagos de préstamos estudiantiles es invaluable para estudiantes de preparatoria y sus padres que están planificando gastos universitarios. Los estudiantes universitarios actuales pueden usarla para estimar sus futuros pagos mensuales basándose en préstamos ya tomados y préstamos futuros anticipados. Los recién graduados pueden calcular sus obligaciones de pago mensuales y planificar su presupuesto después de la universidad en consecuencia. Aquellos que consideran estudios de posgrado pueden evaluar el impacto financiero de préstamos estudiantiles adicionales además de la deuda de pregrado existente.',
        },
      },
      relatedCalculators: {
        title: 'Calculadoras de Préstamos Relacionadas',
      },
    },
  },
  'debt-consolidation': {
    en: {
      meta: {
        title: 'Debt Consolidation Calculator | Loan Consolidation Payment Calculator',
        description: 'Calculate your debt consolidation loan payments with our free calculator. Estimate monthly payments, interest savings, and payoff time for consolidating multiple debts.',
        keywords: 'debt consolidation calculator, debt consolidation loan calculator, consolidation payment calculator, debt payoff calculator, multiple debt calculator, consolidate debt calculator',
      },
      hero: {
        title: 'Debt Consolidation Calculator – Simplify Your Debt Payments',
        subtitle: 'Calculate potential savings from consolidating multiple debts into one monthly payment',
        description: 'Free debt consolidation calculator to estimate payments and interest savings when combining multiple loans into a single consolidation loan.',
      },
      seo: {
        whatIs: {
          title: 'What Is a Debt Consolidation Calculator?',
          content: 'A debt consolidation calculator is a financial tool that helps you evaluate whether combining multiple debts into a single loan makes financial sense. This consolidation loan calculator takes the total amount of your existing debts (credit cards, personal loans, medical bills, etc.) and calculates what your monthly payment would be if you consolidated them into one loan with a potentially lower interest rate. Debt consolidation can simplify your finances by reducing multiple monthly payments to just one, and may save you money if the consolidation loan has a lower interest rate than your current average rate. The calculator shows you the potential monthly payment, total interest over the life of the loan, and helps you compare the consolidated scenario with your current debt situation. This is especially useful for managing high-interest credit card debt, where consolidation into a lower-rate personal loan can result in significant interest savings.',
        },
        whoCanUse: {
          title: 'Who Should Use This Debt Consolidation Calculator?',
          content: 'This debt consolidation payment calculator is ideal for anyone juggling multiple debt payments each month. Credit card holders with balances on multiple cards can see how much they could save by consolidating into a single personal loan with a lower interest rate. Those struggling to keep track of different payment due dates can evaluate whether consolidation would simplify their financial life. People with good credit who have improved their credit score since taking out original loans can calculate potential savings from refinancing at better rates. Small business owners with multiple business debts can explore consolidation options. The calculator is also useful for anyone considering a home equity loan or line of credit to pay off other debts, as it helps visualize the new payment structure. By seeing the total interest comparison between keeping separate debts and consolidating, you can make an informed decision about whether debt consolidation is the right strategy for your situation.',
        },
      },
      relatedCalculators: {
        title: 'Related Loan Calculators',
      },
    },
    es: {
      meta: {
        title: 'Calculadora de Consolidación de Deudas | Calculadora de Préstamo de Consolidación',
        description: 'Calcula tus pagos de préstamo de consolidación de deudas con nuestra calculadora gratuita. Estima pagos mensuales, ahorros en intereses y tiempo de pago para consolidar múltiples deudas.',
        keywords: 'calculadora de consolidación de deudas, calculadora de préstamo de consolidación, calculadora de pago de consolidación, calculadora de pago de deudas, calculadora de múltiples deudas',
      },
      hero: {
        title: 'Calculadora de Consolidación de Deudas – Simplifica tus Pagos de Deuda',
        subtitle: 'Calcula los ahorros potenciales de consolidar múltiples deudas en un solo pago mensual',
        description: 'Calculadora de consolidación de deudas gratuita para estimar pagos y ahorros en intereses al combinar múltiples préstamos en un solo préstamo de consolidación.',
      },
      seo: {
        whatIs: {
          title: '¿Qué es una Calculadora de Consolidación de Deudas?',
          content: 'Una calculadora de consolidación de deudas es una herramienta financiera que te ayuda a evaluar si combinar múltiples deudas en un solo préstamo tiene sentido financiero. Esta calculadora de préstamo de consolidación toma el monto total de tus deudas existentes (tarjetas de crédito, préstamos personales, facturas médicas, etc.) y calcula cuál sería tu pago mensual si las consolidaras en un préstamo con una tasa de interés potencialmente más baja. La consolidación de deudas puede simplificar tus finanzas al reducir múltiples pagos mensuales a solo uno, y puede ahorrarte dinero si el préstamo de consolidación tiene una tasa de interés más baja que tu tasa promedio actual.',
        },
        whoCanUse: {
          title: '¿Quién Debería Usar Esta Calculadora de Consolidación de Deudas?',
          content: 'Esta calculadora de pagos de consolidación de deudas es ideal para cualquier persona que esté manejando múltiples pagos de deuda cada mes. Los titulares de tarjetas de crédito con saldos en múltiples tarjetas pueden ver cuánto podrían ahorrar al consolidar en un solo préstamo personal con una tasa de interés más baja. Aquellos que luchan por hacer un seguimiento de diferentes fechas de vencimiento de pagos pueden evaluar si la consolidación simplificaría su vida financiera. Las personas con buen crédito que han mejorado su puntaje de crédito desde que tomaron los préstamos originales pueden calcular los ahorros potenciales de refinanciar a mejores tasas.',
        },
      },
      relatedCalculators: {
        title: 'Calculadoras de Préstamos Relacionadas',
      },
    },
  },
};

export function getCalculatorContent(type: CalculatorType, locale: Locale): CalculatorContent {
  return calculatorContent[type][locale];
}
