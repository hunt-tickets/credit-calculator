import { getDictionary } from '@/lib/dictionaries';
import { getCalculatorContent } from '@/lib/calculator-content';
import { getCalculatorConfig } from '@/lib/calculator-configs';
import { generateCalculatorMetadata, generateCalculatorSchema, getRelatedLinks } from '@/lib/calculator-helpers';
import CalculatorPage from '@/components/CalculatorPage';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(
    'debt-consolidation',
    'es',
    '/es/calculadora-consolidacion',
    '/en/debt-consolidation-calculator'
  );
}

export default async function CalculadoraConsolidacionPage() {
  const dict = getDictionary('es');
  const content = getCalculatorContent('debt-consolidation', 'es');
  const config = getCalculatorConfig('debt-consolidation');
  const relatedLinks = getRelatedLinks('es', 'debt-consolidation');
  const schema = generateCalculatorSchema('debt-consolidation', 'es');

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
        locale="es"
        relatedLinks={relatedLinks}
      />
    </>
  );
}
