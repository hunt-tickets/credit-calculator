'use client';

import { useState, useMemo, useCallback } from 'react';

interface CreditCalculatorProps {
  dict: {
    currency: string;
    amount: string;
    amountPlaceholder: string;
    rate: string;
    ratePlaceholder: string;
    term: string;
    termPlaceholder: string;
    termMonths: string;
    termYears: string;
    frequency: string;
    monthly: string;
    biweekly: string;
    weekly: string;
    calculationMode: string;
    calculatePayment: string;
    calculateMaxAmount: string;
    calculate: string;
    advancedOptions: string;
    downPayment: string;
    downPaymentPlaceholder: string;
    originationFee: string;
    originationFeePlaceholder: string;
    insurance: string;
    insurancePlaceholder: string;
    tooltipRate: string;
    tooltipTerm: string;
    tooltipFrequency: string;
    tooltipDownPayment: string;
    tooltipFee: string;
    tooltipInsurance: string;
    tooltipExtraPayment: string;
    results: string;
    payment: string;
    totalInterest: string;
    totalAmount: string;
    maxLoanAmount: string;
    amortization: string;
    period: string;
    principal: string;
    interest: string;
    balance: string;
    showSchedule: string;
    hideSchedule: string;
    summary: string;
    effectiveRate: string;
    extraPayment: string;
    extraPaymentPlaceholder: string;
    whatIfScenario: string;
    withExtraPayment: string;
    payoffTime: string;
    monthsEarlier: string;
    interestSaved: string;
    downloadPDF: string;
    downloadCSV: string;
    totalPaid: string;
  };
}

interface AmortizationRow {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

type TermUnit = 'months' | 'years';
type PaymentFrequency = 'monthly' | 'biweekly' | 'weekly';
type CalculationMode = 'payment' | 'maxAmount';

const CURRENCIES = {
  USD: { symbol: '$', name: 'US Dollar' },
  EUR: { symbol: '€', name: 'Euro' },
  GBP: { symbol: '£', name: 'British Pound' },
  MXN: { symbol: '$', name: 'Mexican Peso' },
  COP: { symbol: '$', name: 'Colombian Peso' },
  ARS: { symbol: '$', name: 'Argentine Peso' },
  BRL: { symbol: 'R$', name: 'Brazilian Real' },
  CLP: { symbol: '$', name: 'Chilean Peso' },
} as const;

type CurrencyCode = keyof typeof CURRENCIES;

// Tooltip component
function Tooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block ml-1">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        className="inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-gray-400 hover:bg-gray-500 rounded-full cursor-help transition-colors"
        aria-label="More information"
      >
        ?
      </button>
      {show && (
        <div className="absolute z-50 w-64 p-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg shadow-lg left-0 bottom-6 sm:left-auto sm:right-0">
          {text}
        </div>
      )}
    </div>
  );
}

export default function CreditCalculator({ dict }: CreditCalculatorProps) {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [amount, setAmount] = useState('');
  const [desiredPayment, setDesiredPayment] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [termUnit, setTermUnit] = useState<TermUnit>('months');
  const [frequency, setFrequency] = useState<PaymentFrequency>('monthly');
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('payment');

  // Advanced options
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [downPayment, setDownPayment] = useState('');
  const [originationFee, setOriginationFee] = useState('');
  const [insurance, setInsurance] = useState('');
  const [extraPayment, setExtraPayment] = useState('');

  const [results, setResults] = useState<{
    payment: number;
    totalInterest: number;
    totalAmount: number;
    maxLoanAmount?: number;
    schedule: AmortizationRow[];
    effectiveRate?: number;
    loanAmount: number;
    termInMonths: number;
    extraPaymentScenario?: {
      newPayoffMonths: number;
      monthsSaved: number;
      interestSaved: number;
    };
  } | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);

  // Format number with thousands separator (Latin American format: . for thousands, , for decimals)
  const formatNumberWithThousands = (value: string): string => {
    // Remove all characters except digits, dots, and commas
    const cleaned = value.replace(/[^\d.,]/g, '');

    // Split by comma (decimal separator)
    const parts = cleaned.replace(/\./g, '').split(',');

    // Format the integer part with thousands separator (dots)
    if (parts[0]) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    // Return formatted number (integer + optional decimal part with max 2 digits)
    if (parts.length > 1) {
      const decimalPart = parts[1].slice(0, 2);
      return parts[0] + (decimalPart.length > 0 ? ',' + decimalPart : ',');
    }

    return parts[0] || '';
  };

  // Parse formatted number to float
  const parseFormattedNumber = (value: string): number => {
    if (!value) return 0;

    // Remove thousands separators (dots) and replace comma with dot for decimal
    const cleaned = value.replace(/\./g, '').replace(',', '.');

    return parseFloat(cleaned) || 0;
  };

  // Handle formatted input change
  const handleFormattedInputChange = (
    value: string,
    setter: (value: string) => void
  ) => {
    // Allow empty value
    if (value === '') {
      setter('');
      return;
    }

    // Format and set the value
    const formatted = formatNumberWithThousands(value);
    setter(formatted);
  };

  const calculateLoan = () => {
    // Parse inputs
    let loanAmount = parseFormattedNumber(amount);
    const desiredPmt = parseFormattedNumber(desiredPayment);
    const annualRate = parseFloat(rate);
    let termValue = parseInt(term);
    const down = parseFormattedNumber(downPayment);
    const fee = parseFormattedNumber(originationFee);
    const monthlyInsurance = parseFormattedNumber(insurance);

    // Validate basic inputs
    if (isNaN(annualRate) || annualRate < 0 || isNaN(termValue) || termValue <= 0) {
      return;
    }

    if (calculationMode === 'payment' && (isNaN(loanAmount) || loanAmount <= 0)) {
      return;
    }

    if (calculationMode === 'maxAmount' && (isNaN(desiredPmt) || desiredPmt <= 0)) {
      return;
    }

    // Convert term to months
    const termInMonths = termUnit === 'years' ? termValue * 12 : termValue;

    // Get payment frequency factor
    let paymentsPerYear: number;
    let periodLabel: string;
    switch (frequency) {
      case 'weekly':
        paymentsPerYear = 52;
        periodLabel = 'week';
        break;
      case 'biweekly':
        paymentsPerYear = 26;
        periodLabel = 'biweek';
        break;
      case 'monthly':
      default:
        paymentsPerYear = 12;
        periodLabel = 'month';
        break;
    }

    // Calculate period interest rate
    const periodRate = annualRate / 100 / paymentsPerYear;
    const totalPeriods = Math.round((termInMonths / 12) * paymentsPerYear);

    let payment: number;
    let calculatedMaxAmount: number | undefined;

    if (calculationMode === 'payment') {
      // Standard calculation: calculate payment from loan amount
      const netLoanAmount = loanAmount - down + fee;

      // Calculate base payment using amortization formula
      if (periodRate === 0) {
        payment = netLoanAmount / totalPeriods;
      } else {
        payment = netLoanAmount * (periodRate * Math.pow(1 + periodRate, totalPeriods)) / (Math.pow(1 + periodRate, totalPeriods) - 1);
      }

      // Add insurance to payment
      const insurancePerPeriod = monthlyInsurance * (12 / paymentsPerYear);
      payment += insurancePerPeriod;

      loanAmount = netLoanAmount;
    } else {
      // Reverse calculation: calculate max loan amount from desired payment
      const insurancePerPeriod = monthlyInsurance * (12 / paymentsPerYear);
      const availableForPrincipal = desiredPmt - insurancePerPeriod;

      if (availableForPrincipal <= 0) {
        return; // Insurance eats all the payment
      }

      // Calculate max loan using reverse formula
      if (periodRate === 0) {
        loanAmount = availableForPrincipal * totalPeriods;
      } else {
        loanAmount = availableForPrincipal * (Math.pow(1 + periodRate, totalPeriods) - 1) / (periodRate * Math.pow(1 + periodRate, totalPeriods));
      }

      // Account for down payment and fees
      calculatedMaxAmount = loanAmount + down - fee;
      payment = desiredPmt;
    }

    // Generate amortization schedule
    const schedule: AmortizationRow[] = [];
    let balance = loanAmount;
    const basePayment = calculationMode === 'payment' ? payment - (monthlyInsurance * (12 / paymentsPerYear)) : payment - (monthlyInsurance * (12 / paymentsPerYear));

    for (let i = 1; i <= totalPeriods; i++) {
      const interestPayment = balance * periodRate;
      const principalPayment = basePayment - interestPayment;
      balance -= principalPayment;

      schedule.push({
        period: i,
        payment: basePayment + (monthlyInsurance * (12 / paymentsPerYear)),
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
      });
    }

    // Calculate totals
    const totalPayments = payment * totalPeriods;
    const totalInterest = totalPayments - loanAmount - (monthlyInsurance * (12 / paymentsPerYear) * totalPeriods);

    // Calculate effective rate (APR including fees)
    let effectiveRate: number | undefined;
    if (fee > 0 && calculationMode === 'payment') {
      // Effective rate calculation: find rate where PV of payments = loan amount - down + fee
      // Simple approximation: (total interest + fees) / principal / years * 100
      const principal = loanAmount + down - fee;
      const years = termInMonths / 12;
      const totalCost = totalInterest + fee;
      effectiveRate = (totalCost / principal / years) * 100;
    }

    // Calculate "What If" scenario with extra payment
    let extraPaymentScenario: typeof results extends null ? never : NonNullable<typeof results>['extraPaymentScenario'];
    const extraPmt = parseFormattedNumber(extraPayment);
    if (extraPmt > 0 && calculationMode === 'payment') {
      // Calculate how many periods it takes to pay off with extra payment
      let whatIfBalance = loanAmount;
      let whatIfPeriods = 0;
      const whatIfPayment = basePayment + extraPmt;
      let whatIfTotalInterest = 0;

      while (whatIfBalance > 0.01 && whatIfPeriods < totalPeriods * 2) {
        whatIfPeriods++;
        const interestPayment = whatIfBalance * periodRate;
        whatIfTotalInterest += interestPayment;
        const principalPayment = Math.min(whatIfPayment - interestPayment, whatIfBalance);
        whatIfBalance -= principalPayment;

        if (whatIfBalance < 0.01) break;
      }

      const savedInterest = totalInterest - whatIfTotalInterest;
      const savedMonths = totalPeriods - whatIfPeriods;

      if (savedMonths > 0) {
        extraPaymentScenario = {
          newPayoffMonths: whatIfPeriods,
          monthsSaved: savedMonths,
          interestSaved: savedInterest,
        };
      }
    }

    setResults({
      payment,
      totalInterest,
      totalAmount: totalPayments,
      maxLoanAmount: calculatedMaxAmount,
      schedule,
      effectiveRate,
      loanAmount,
      termInMonths,
      extraPaymentScenario,
    });
  };

  const currencySymbol = useMemo(() => CURRENCIES[currency].symbol, [currency]);

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }, [currency]);

  const downloadCSV = () => {
    if (!results) return;

    let csv = `${dict.period},${dict.payment},${dict.principal},${dict.interest},${dict.balance}\n`;
    results.schedule.forEach((row) => {
      csv += `${row.period},${row.payment.toFixed(2)},${row.principal.toFixed(2)},${row.interest.toFixed(2)},${row.balance.toFixed(2)}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'amortization-schedule.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    if (!results) return;

    // Create a simple HTML representation for printing
    const printWindow = window.open('', '', 'height=600,width=800');
    if (!printWindow) return;

    const html = `
      <html>
        <head>
          <title>${dict.amortization}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #0284c7; }
            table { border-collapse: collapse; width: 100%; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
            th { background-color: #0284c7; color: white; }
            .summary { margin: 20px 0; padding: 15px; background: #f0f9ff; border-radius: 8px; }
            .summary-item { margin: 8px 0; }
          </style>
        </head>
        <body>
          <h1>${dict.amortization}</h1>
          <div class="summary">
            <div class="summary-item"><strong>${dict.payment}:</strong> ${formatCurrency(results.payment)}</div>
            <div class="summary-item"><strong>${dict.totalInterest}:</strong> ${formatCurrency(results.totalInterest)}</div>
            <div class="summary-item"><strong>${dict.totalAmount}:</strong> ${formatCurrency(results.totalAmount)}</div>
            ${results.effectiveRate ? `<div class="summary-item"><strong>${dict.effectiveRate}:</strong> ${results.effectiveRate.toFixed(2)}%</div>` : ''}
          </div>
          <table>
            <thead>
              <tr>
                <th>${dict.period}</th>
                <th>${dict.payment}</th>
                <th>${dict.principal}</th>
                <th>${dict.interest}</th>
                <th>${dict.balance}</th>
              </tr>
            </thead>
            <tbody>
              ${results.schedule.map(row => `
                <tr>
                  <td>${row.period}</td>
                  <td>${formatCurrency(row.payment)}</td>
                  <td>${formatCurrency(row.principal)}</td>
                  <td>${formatCurrency(row.interest)}</td>
                  <td>${formatCurrency(row.balance)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <div className="w-full">
      <div className="card p-4 sm:p-6 lg:p-8">
        {/* Currency Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {dict.currency}
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            className="input-field max-w-xs"
          >
            {Object.entries(CURRENCIES).map(([code, { symbol, name }]) => (
              <option key={code} value={code}>
                {symbol} {name} ({code})
              </option>
            ))}
          </select>
        </div>

        {/* Calculation Mode */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {dict.calculationMode}
          </label>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <label className="flex items-center cursor-pointer p-3 sm:p-2 border-2 border-gray-200 rounded-lg hover:border-primary-300 transition-colors has-[:checked]:border-primary-600 has-[:checked]:bg-primary-50">
              <input
                type="radio"
                checked={calculationMode === 'payment'}
                onChange={() => setCalculationMode('payment')}
                className="w-5 h-5 text-primary-600 focus:ring-primary-500 focus:ring-2"
              />
              <span className="ml-3 text-gray-700 text-sm sm:text-base">{dict.calculatePayment}</span>
            </label>
            <label className="flex items-center cursor-pointer p-3 sm:p-2 border-2 border-gray-200 rounded-lg hover:border-primary-300 transition-colors has-[:checked]:border-primary-600 has-[:checked]:bg-primary-50">
              <input
                type="radio"
                checked={calculationMode === 'maxAmount'}
                onChange={() => setCalculationMode('maxAmount')}
                className="w-5 h-5 text-primary-600 focus:ring-primary-500 focus:ring-2"
              />
              <span className="ml-3 text-gray-700 text-sm sm:text-base">{dict.calculateMaxAmount}</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Loan Amount or Desired Payment */}
          {calculationMode === 'payment' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {dict.amount}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none z-10">{currencySymbol}</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => handleFormattedInputChange(e.target.value, setAmount)}
                  placeholder={dict.amountPlaceholder}
                  className="input-field input-with-symbol"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {dict.payment}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none z-10">{currencySymbol}</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={desiredPayment}
                  onChange={(e) => handleFormattedInputChange(e.target.value, setDesiredPayment)}
                  placeholder={dict.amountPlaceholder}
                  className="input-field input-with-symbol"
                />
              </div>
            </div>
          )}

          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {dict.rate}
              <Tooltip text={dict.tooltipRate} />
            </label>
            <div className="relative">
              <input
                type="text"
                inputMode="decimal"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder={dict.ratePlaceholder}
                className="input-field input-with-symbol-right"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none z-10">%</span>
            </div>
          </div>

          {/* Loan Term with Unit Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {dict.term}
              <Tooltip text={dict.tooltipTerm} />
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  inputMode="numeric"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder={dict.termPlaceholder}
                  className="input-field"
                />
              </div>
              <div className="flex-shrink-0" style={{ width: '100px' }}>
                <select
                  value={termUnit}
                  onChange={(e) => setTermUnit(e.target.value as TermUnit)}
                  className="input-field"
                >
                  <option value="months">{dict.termMonths}</option>
                  <option value="years">{dict.termYears}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {dict.frequency}
              <Tooltip text={dict.tooltipFrequency} />
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as PaymentFrequency)}
              className="input-field"
            >
              <option value="monthly">{dict.monthly}</option>
              <option value="biweekly">{dict.biweekly}</option>
              <option value="weekly">{dict.weekly}</option>
            </select>
          </div>
        </div>

        {/* Advanced Options Accordion */}
        <div className="mt-6">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm sm:text-base p-2 -ml-2 touch-manipulation"
          >
            <svg
              className={`w-5 h-5 transition-transform ${showAdvanced ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {dict.advancedOptions}
          </button>

          {showAdvanced && (
            <div className="mt-4 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {dict.downPayment}
                    <Tooltip text={dict.tooltipDownPayment} />
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none z-10">{currencySymbol}</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={downPayment}
                      onChange={(e) => handleFormattedInputChange(e.target.value, setDownPayment)}
                      placeholder={dict.downPaymentPlaceholder}
                      className="input-field input-with-symbol"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {dict.originationFee}
                    <Tooltip text={dict.tooltipFee} />
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none z-10">{currencySymbol}</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={originationFee}
                      onChange={(e) => handleFormattedInputChange(e.target.value, setOriginationFee)}
                      placeholder={dict.originationFeePlaceholder}
                      className="input-field input-with-symbol"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {dict.insurance}
                    <Tooltip text={dict.tooltipInsurance} />
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none z-10">{currencySymbol}</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={insurance}
                      onChange={(e) => handleFormattedInputChange(e.target.value, setInsurance)}
                      placeholder={dict.insurancePlaceholder}
                      className="input-field input-with-symbol"
                    />
                  </div>
                </div>
              </div>

              {/* Extra Payment for "What If" scenario */}
              <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-lg">
                <div className="max-w-md">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {dict.extraPayment}
                    <Tooltip text={dict.tooltipExtraPayment} />
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none z-10">{currencySymbol}</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={extraPayment}
                      onChange={(e) => handleFormattedInputChange(e.target.value, setExtraPayment)}
                      placeholder={dict.extraPaymentPlaceholder}
                      className="input-field input-with-symbol"
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    {dict.whatIfScenario}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <button onClick={calculateLoan} className="btn-primary">
            {dict.calculate}
          </button>
        </div>
      </div>

      {results && (
        <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
          {/* Premium Results Summary Panel */}
          <div className="card p-6 sm:p-8 bg-gradient-to-br from-primary-50 via-white to-primary-50">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">{dict.summary}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {calculationMode === 'payment' ? (
                <div className="text-center p-5 bg-white border-2 border-primary-200 rounded-xl shadow-sm">
                  <p className="text-sm font-medium text-gray-600 mb-2">{dict.payment}</p>
                  <p className="text-3xl sm:text-4xl font-bold text-primary-700">
                    {formatCurrency(results.payment)}
                  </p>
                </div>
              ) : (
                <div className="text-center p-5 bg-white border-2 border-primary-200 rounded-xl shadow-sm">
                  <p className="text-sm font-medium text-gray-600 mb-2">{dict.maxLoanAmount}</p>
                  <p className="text-3xl sm:text-4xl font-bold text-primary-700">
                    {formatCurrency(results.maxLoanAmount || 0)}
                  </p>
                </div>
              )}

              <div className="text-center p-5 bg-white border-2 border-amber-200 rounded-xl shadow-sm">
                <p className="text-sm font-medium text-gray-600 mb-2">{dict.totalInterest}</p>
                <p className="text-3xl sm:text-4xl font-bold text-amber-700">
                  {formatCurrency(results.totalInterest)}
                </p>
              </div>

              <div className="text-center p-5 bg-white border-2 border-emerald-200 rounded-xl shadow-sm">
                <p className="text-sm font-medium text-gray-600 mb-2">{dict.totalPaid}</p>
                <p className="text-3xl sm:text-4xl font-bold text-emerald-700">
                  {formatCurrency(results.totalAmount)}
                </p>
              </div>

              {results.effectiveRate && (
                <div className="text-center p-5 bg-white border-2 border-purple-200 rounded-xl shadow-sm">
                  <p className="text-sm font-medium text-gray-600 mb-2">{dict.effectiveRate}</p>
                  <p className="text-3xl sm:text-4xl font-bold text-purple-700">
                    {results.effectiveRate.toFixed(2)}%
                  </p>
                </div>
              )}
            </div>

            {/* "What If" Scenario */}
            {results.extraPaymentScenario && (
              <div className="mt-6 p-5 bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300 rounded-xl">
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {dict.whatIfScenario} - {dict.withExtraPayment}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">{dict.payoffTime}</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {results.extraPaymentScenario.newPayoffMonths} months
                    </p>
                    <p className="text-sm text-emerald-600 font-medium mt-1">
                      ({results.extraPaymentScenario.monthsSaved} {dict.monthsEarlier})
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">{dict.interestSaved}</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {formatCurrency(results.extraPaymentScenario.interestSaved)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="card p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{dict.amortization}</h3>
              <div className="flex flex-wrap items-center gap-2 -ml-2 sm:ml-0">
                <button
                  onClick={downloadCSV}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg transition-colors flex items-center gap-2 touch-manipulation"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {dict.downloadCSV}
                </button>
                <button
                  onClick={downloadPDF}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-lg transition-colors flex items-center gap-2 touch-manipulation"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  {dict.downloadPDF}
                </button>
                <button
                  onClick={() => setShowSchedule(!showSchedule)}
                  className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium text-sm hover:bg-primary-50 rounded-lg transition-colors touch-manipulation"
                >
                  {showSchedule ? dict.hideSchedule : dict.showSchedule}
                </button>
              </div>
            </div>

            {showSchedule && (
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50">
                          {dict.period}
                        </th>
                        <th className="px-3 sm:px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {dict.payment}
                        </th>
                        <th className="px-3 sm:px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {dict.principal}
                        </th>
                        <th className="px-3 sm:px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {dict.interest}
                        </th>
                        <th className="px-3 sm:px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {dict.balance}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {results.schedule.map((row) => (
                        <tr key={row.period} className="hover:bg-gray-50">
                          <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900 font-medium sticky left-0 bg-white">
                            {row.period}
                          </td>
                          <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900 text-right">
                            {formatCurrency(row.payment)}
                          </td>
                          <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900 text-right">
                            {formatCurrency(row.principal)}
                          </td>
                          <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900 text-right">
                            {formatCurrency(row.interest)}
                          </td>
                          <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900 text-right">
                            {formatCurrency(row.balance)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
