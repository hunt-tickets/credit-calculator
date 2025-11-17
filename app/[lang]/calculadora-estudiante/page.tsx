import { getDictionary } from '@/lib/dictionaries';
import { getCalculatorContent } from '@/lib/calculator-content';
import { getCalculatorConfig } from '@/lib/calculator-configs';
import { generateCalculatorMetadata, generateCalculatorSchema, getRelatedLinks } from '@/lib/calculator-helpers';
import CalculatorPage from '@/components/CalculatorPage';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(
    'student',
    'es',
    '/es/calculadora-estudiante',
    '/en/student-loan-calculator'
  );
}

export default async function CalculadoraEstudiantePage() {
  const dict = getDictionary('es');
  const content = getCalculatorContent('student', 'es');
  const config = getCalculatorConfig('student');
  const relatedLinks = getRelatedLinks('es', 'student');
  const schema = generateCalculatorSchema('student', 'es');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <CalculatorPage
        dict={dict}
        content={content}
        defaults={config.defaults}
        type="student"
        locale="es"
        relatedLinks={relatedLinks}
      />
    </>
  );
}
