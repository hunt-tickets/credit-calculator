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

      {/* Footer */}
      <footer className="container-custom py-12 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">{dict.footer.disclaimer}</p>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Credit Calculator. {dict.footer.rights}
          </p>
        </div>
      </footer>
    </main>
  );
}
