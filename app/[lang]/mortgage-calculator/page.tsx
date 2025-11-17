import { getDictionary } from '@/lib/dictionaries';
import { getCalculatorContent } from '@/lib/calculator-content';
import { getCalculatorConfig } from '@/lib/calculator-configs';
import { generateCalculatorMetadata, generateCalculatorSchema, getRelatedLinks } from '@/lib/calculator-helpers';
import CalculatorPage from '@/components/CalculatorPage';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(
    'mortgage',
    'en',
    '/en/mortgage-calculator',
    '/es/calculadora-hipoteca'
  );
}

export default async function MortgageCalculatorPage() {
  const dict = getDictionary('en');
  const content = getCalculatorContent('mortgage', 'en');
  const config = getCalculatorConfig('mortgage');
  const relatedLinks = getRelatedLinks('en', 'mortgage');
  const schema = generateCalculatorSchema('mortgage', 'en');

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
        type="mortgage"
        locale="en"
        relatedLinks={relatedLinks}
      />
    </>
  );
}
