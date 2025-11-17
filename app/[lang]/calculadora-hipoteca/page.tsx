import { getDictionary } from '@/lib/dictionaries';
import { getCalculatorContent } from '@/lib/calculator-content';
import { getCalculatorConfig } from '@/lib/calculator-configs';
import { generateCalculatorMetadata, generateCalculatorSchema, getRelatedLinks } from '@/lib/calculator-helpers';
import CalculatorPage from '@/components/CalculatorPage';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(
    'mortgage',
    'es',
    '/es/calculadora-hipoteca',
    '/en/mortgage-calculator'
  );
}

export default async function CalculadoraHipotecaPage() {
  const dict = getDictionary('es');
  const content = getCalculatorContent('mortgage', 'es');
  const config = getCalculatorConfig('mortgage');
  const relatedLinks = getRelatedLinks('es', 'mortgage');
  const schema = generateCalculatorSchema('mortgage', 'es');

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
        locale="es"
        relatedLinks={relatedLinks}
      />
    </>
  );
}
