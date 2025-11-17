import { getDictionary } from '@/lib/dictionaries';
import { getCalculatorContent } from '@/lib/calculator-content';
import { getCalculatorConfig } from '@/lib/calculator-configs';
import { generateCalculatorMetadata, generateCalculatorSchema, getRelatedLinks } from '@/lib/calculator-helpers';
import CalculatorPage from '@/components/CalculatorPage';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(
    'debt-consolidation',
    'en',
    '/en/debt-consolidation-calculator',
    '/es/calculadora-consolidacion'
  );
}

export default async function DebtConsolidationCalculatorPage() {
  const dict = getDictionary('en');
  const content = getCalculatorContent('debt-consolidation', 'en');
  const config = getCalculatorConfig('debt-consolidation');
  const relatedLinks = getRelatedLinks('en', 'debt-consolidation');
  const schema = generateCalculatorSchema('debt-consolidation', 'en');

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
        type="debt-consolidation"
        locale="en"
        relatedLinks={relatedLinks}
      />
    </>
  );
}
