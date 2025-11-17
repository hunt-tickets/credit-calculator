import { getDictionary } from '@/lib/dictionaries';
import { isValidLocale, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import CreditCalculator from '@/components/CreditCalculator';
import Link from 'next/link';

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang as Locale);

  return (
    <main className="min-h-screen">
      {/* Language Switcher */}
      <div className="container-custom py-4">
        <div className="flex justify-end gap-2">
          <Link
            href="/en"
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              lang === 'en'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            English
          </Link>
          <Link
            href="/es"
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              lang === 'es'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Español
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container-custom py-12 sm:py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {dict.hero.title}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-4">
            {dict.hero.subtitle}
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {dict.hero.description}
          </p>
        </div>
      </section>

      {/* AD PLACEHOLDER #1 - In-content ad before calculator */}
      {/* Recommended: 728x90 leaderboard on desktop, 320x100 on mobile */}
      {/* <div className="container-custom py-4">
        <div className="flex justify-center">
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-400">
            Ad Space: 728x90 (Desktop) / 320x100 (Mobile)
          </div>
        </div>
      </div> */}

      {/* Calculator Section */}
      <section className="container-custom py-8">
        <CreditCalculator dict={dict.calculator} />
      </section>

      {/* How to Use Section */}
      <section className="container-custom py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            {dict.howToUse.title}
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <p className="text-lg text-gray-700">{dict.howToUse.step1}</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <p className="text-lg text-gray-700">{dict.howToUse.step2}</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <p className="text-lg text-gray-700">{dict.howToUse.step3}</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div className="flex-1">
                <p className="text-lg text-gray-700">{dict.howToUse.step4}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AD PLACEHOLDER #2 - Between "How to Use" and "Features" */}
      {/* Recommended: 336x280 medium rectangle or 300x250 */}
      {/* <div className="container-custom py-8">
        <div className="flex justify-center">
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-400 w-full max-w-md">
            Ad Space: 336x280 / 300x250
          </div>
        </div>
      </div> */}

      {/* Features Section */}
      <section className="container-custom py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
          {dict.features.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="card p-6 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {dict.features.instant.title}
            </h3>
            <p className="text-gray-600">{dict.features.instant.description}</p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {dict.features.detailed.title}
            </h3>
            <p className="text-gray-600">{dict.features.detailed.description}</p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {dict.features.free.title}
            </h3>
            <p className="text-gray-600">{dict.features.free.description}</p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {dict.features.accurate.title}
            </h3>
            <p className="text-gray-600">{dict.features.accurate.description}</p>
          </div>
        </div>
      </section>

      {/* SEO Content Sections */}
      <section className="container-custom py-16 bg-white">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {dict.seo.whatIs.title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {dict.seo.whatIs.content}
            </p>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {dict.seo.whoCanUse.title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {dict.seo.whoCanUse.content}
            </p>
          </div>
        </div>
      </section>

      {/* Related Calculators Section */}
      <section className="container-custom py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-4">
            {dict.relatedCalculators.title}
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            {dict.relatedCalculators.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href={`/${lang}/mortgage-calculator`}
              className="card p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {dict.relatedCalculators.mortgage.title}
              </h3>
              <p className="text-sm text-gray-600">
                {dict.relatedCalculators.mortgage.description}
              </p>
            </Link>

            <Link
              href={`/${lang === 'en' ? 'en/auto-loan-calculator' : 'es/calculadora-auto'}`}
              className="card p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {dict.relatedCalculators.auto.title}
              </h3>
              <p className="text-sm text-gray-600">
                {dict.relatedCalculators.auto.description}
              </p>
            </Link>

            <Link
              href={`/${lang === 'en' ? 'en/student-loan-calculator' : 'es/calculadora-estudiante'}`}
              className="card p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {dict.relatedCalculators.student.title}
              </h3>
              <p className="text-sm text-gray-600">
                {dict.relatedCalculators.student.description}
              </p>
            </Link>

            <Link
              href={`/${lang === 'en' ? 'en/debt-consolidation-calculator' : 'es/calculadora-consolidacion'}`}
              className="card p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {dict.relatedCalculators.debtConsolidation.title}
              </h3>
              <p className="text-sm text-gray-600">
                {dict.relatedCalculators.debtConsolidation.description}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container-custom py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
          {dict.faq.title}
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {dict.faq.q1.question}
            </h3>
            <p className="text-gray-600">{dict.faq.q1.answer}</p>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {dict.faq.q2.question}
            </h3>
            <p className="text-gray-600">{dict.faq.q2.answer}</p>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {dict.faq.q3.question}
            </h3>
            <p className="text-gray-600">{dict.faq.q3.answer}</p>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {dict.faq.q4.question}
            </h3>
            <p className="text-gray-600">{dict.faq.q4.answer}</p>
          </div>
        </div>
      </section>

      {/* AD PLACEHOLDER #3 - After FAQs, before footer */}
      {/* Recommended: 728x90 leaderboard */}
      {/* <div className="container-custom py-8">
        <div className="flex justify-center">
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-400">
            Ad Space: 728x90 Leaderboard
          </div>
        </div>
      </div> */}

      {/* Footer */}
      <footer className="container-custom py-12 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">{dict.footer.disclaimer}</p>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Credit Calculator. {dict.footer.rights}
          </p>
        </div>
      </footer>

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebApplication',
                name: dict.hero.title,
                description: dict.meta.description,
                url: `https://creditcalculator.com/${lang}`,
                applicationCategory: 'FinanceApplication',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD',
                },
                featureList: [
                  dict.features.instant.title,
                  dict.features.detailed.title,
                  dict.features.free.title,
                  dict.features.accurate.title,
                ],
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: dict.faq.q1.question,
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: dict.faq.q1.answer,
                    },
                  },
                  {
                    '@type': 'Question',
                    name: dict.faq.q2.question,
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: dict.faq.q2.answer,
                    },
                  },
                  {
                    '@type': 'Question',
                    name: dict.faq.q3.question,
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: dict.faq.q3.answer,
                    },
                  },
                  {
                    '@type': 'Question',
                    name: dict.faq.q4.question,
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: dict.faq.q4.answer,
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />
    </main>
  );
}
