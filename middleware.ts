import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, isValidLocale } from './lib/i18n';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect to default locale if no locale is present
  if (pathname === '/') {
    // Get preferred language from Accept-Language header
    const acceptLanguage = request.headers.get('accept-language');
    let locale = defaultLocale;

    if (acceptLanguage) {
      // Simple language detection
      if (acceptLanguage.toLowerCase().includes('es')) {
        locale = 'es';
      }
    }

    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // For other paths without locale, redirect to default locale
  return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
