import { getDictionary } from '@/lib/dictionaries';
import { getCalculatorContent } from '@/lib/calculator-content';
import { getCalculatorConfig } from '@/lib/calculator-configs';
import { generateCalculatorMetadata, generateCalculatorSchema, getRelatedLinks } from '@/lib/calculator-helpers';
import CalculatorPage from '@/components/CalculatorPage';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(
    'auto',
    'es',
    '/es/calculadora-auto',
    '/en/auto-loan-calculator'
  );
}

export default async function CalculadoraAutoPage() {
  const dict = getDictionary('es');
  const content = getCalculatorContent('auto', 'es');
  const config = getCalculatorConfig('auto');
  const relatedLinks = getRelatedLinks('es', 'auto');
  const schema = generateCalculatorSchema('auto', 'es');

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
        locale="es"
        relatedLinks={relatedLinks}
      />
    </>
  );
}
