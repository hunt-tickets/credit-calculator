import { getDictionary } from '@/lib/dictionaries';
import { getCalculatorContent } from '@/lib/calculator-content';
import { getCalculatorConfig } from '@/lib/calculator-configs';
import { generateCalculatorMetadata, generateCalculatorSchema, getRelatedLinks } from '@/lib/calculator-helpers';
import CalculatorPage from '@/components/CalculatorPage';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(
    'auto',
    'en',
    '/en/auto-loan-calculator',
    '/es/calculadora-auto'
  );
}

export default async function AutoLoanCalculatorPage() {
  const dict = getDictionary('en');
  const content = getCalculatorContent('auto', 'en');
  const config = getCalculatorConfig('auto');
  const relatedLinks = getRelatedLinks('en', 'auto');
  const schema = generateCalculatorSchema('auto', 'en');

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
        type="auto"
        locale="en"
        relatedLinks={relatedLinks}
      />
    </>
  );
}
