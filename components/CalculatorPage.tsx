import CreditCalculator from './CreditCalculator';
import type { CalculatorType } from '@/lib/calculator-configs';
import type { CalculatorContent } from '@/lib/calculator-content';
import type { Locale } from '@/lib/i18n';

interface CalculatorPageProps {
  dict: any;
  content: CalculatorContent;
  defaults: any;
  type: CalculatorType;
  locale: Locale;
  relatedLinks: {
    href: string;
    title: string;
    description: string;
  }[];
}

export default function CalculatorPage({
  dict,
  content,
  defaults,
  relatedLinks,
}: CalculatorPageProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="text-center mb-8 sm:mb-12 px-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          {content.hero.title}
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-2 sm:mb-3">
          {content.hero.subtitle}
        </p>
        <p className="text-sm sm:text-base text-gray-500 max-w-3xl mx-auto">
          {content.hero.description}
        </p>
      </section>

      {/* Calculator */}
      <section className="mb-8 sm:mb-12">
        <CreditCalculator dict={dict.calculator} defaults={defaults} />
      </section>

      {/* How to Use */}
      <section className="mb-8 sm:mb-12 px-4">
        <div className="card p-6 sm:p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            {dict.howToUse.title}
          </h2>
          <ol className="space-y-3 sm:space-y-4 list-decimal list-inside text-gray-700">
            <li className="text-base sm:text-lg">{dict.howToUse.step1}</li>
            <li className="text-base sm:text-lg">{dict.howToUse.step2}</li>
            <li className="text-base sm:text-lg">{dict.howToUse.step3}</li>
            <li className="text-base sm:text-lg">{dict.howToUse.step4}</li>
          </ol>
        </div>
      </section>

      {/* Features */}
      <section className="mb-8 sm:mb-12 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
          {dict.features.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          <div className="card p-5 sm:p-6 text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
              {dict.features.instant.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              {dict.features.instant.description}
            </p>
          </div>
          <div className="card p-5 sm:p-6 text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
              {dict.features.detailed.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              {dict.features.detailed.description}
            </p>
          </div>
          <div className="card p-5 sm:p-6 text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
              {dict.features.free.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              {dict.features.free.description}
            </p>
          </div>
          <div className="card p-5 sm:p-6 text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
              {dict.features.accurate.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              {dict.features.accurate.description}
            </p>
          </div>
        </div>
      </section>

      {/* SEO Content - What Is */}
      <section className="mb-8 sm:mb-12 px-4">
        <div className="card p-6 sm:p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {content.seo.whatIs.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            {content.seo.whatIs.content}
          </p>
        </div>
      </section>

      {/* SEO Content - Who Can Use */}
      <section className="mb-8 sm:mb-12 px-4">
        <div className="card p-6 sm:p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {content.seo.whoCanUse.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            {content.seo.whoCanUse.content}
          </p>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="mb-8 sm:mb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            {content.relatedCalculators.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="card p-5 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-primary-600 mb-2">
                  {link.title}
                </h3>
                <p className="text-sm text-gray-600">{link.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-8 sm:mb-12 px-4">
        <div className="card p-6 sm:p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            {dict.faq.title}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {dict.faq.q1.question}
              </h3>
              <p className="text-base text-gray-700">{dict.faq.q1.answer}</p>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {dict.faq.q2.question}
              </h3>
              <p className="text-base text-gray-700">{dict.faq.q2.answer}</p>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {dict.faq.q3.question}
              </h3>
              <p className="text-base text-gray-700">{dict.faq.q3.answer}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Disclaimer */}
      <footer className="text-center px-4 py-6 text-sm text-gray-500">
        <p className="mb-2">{dict.footer.disclaimer}</p>
        <p>&copy; {new Date().getFullYear()} {dict.footer.rights}</p>
      </footer>
    </>
  );
}
