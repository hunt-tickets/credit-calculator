import { getDictionary } from '@/lib/dictionaries';
import { getCalculatorContent } from '@/lib/calculator-content';
import { getCalculatorConfig } from '@/lib/calculator-configs';
import { generateCalculatorMetadata, generateCalculatorSchema, getRelatedLinks } from '@/lib/calculator-helpers';
import CalculatorPage from '@/components/CalculatorPage';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(
    'student',
    'en',
    '/en/student-loan-calculator',
    '/es/calculadora-estudiante'
  );
}

export default async function StudentLoanCalculatorPage() {
  const dict = getDictionary('en');
  const content = getCalculatorContent('student', 'en');
  const config = getCalculatorConfig('student');
  const relatedLinks = getRelatedLinks('en', 'student');
  const schema = generateCalculatorSchema('student', 'en');

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
        locale="en"
        relatedLinks={relatedLinks}
      />
    </>
  );
}
