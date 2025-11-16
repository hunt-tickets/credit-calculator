'use client';

import { useState } from 'react';

interface CreditCalculatorProps {
  dict: {
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

export default function CreditCalculator({ dict }: CreditCalculatorProps) {
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

  const [results, setResults] = useState<{
    payment: number;
    totalInterest: number;
    totalAmount: number;
    maxLoanAmount?: number;
    schedule: AmortizationRow[];
  } | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);

  // Format number with thousands separator
  const formatNumberWithThousands = (value: string): string => {
    // Remove all non-digit and non-decimal characters
    const cleaned = value.replace(/[^\d.]/g, '');

    // Split by decimal point
    const parts = cleaned.split('.');

    // Format the integer part with thousands separator
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Return formatted number (keep only first decimal part if exists)
    return parts.length > 1 ? parts[0] + '.' + parts.slice(1).join('').slice(0, 2) : parts[0];
  };

  // Parse formatted number to float
  const parseFormattedNumber = (value: string): number => {
    // Remove thousands separators (dots) but keep decimal point
    // We'll treat the last dot as decimal if there are multiple
    const parts = value.split('.');
    if (parts.length <= 1) {
      return parseFloat(value) || 0;
    }
    // Join all parts except the last with '' (removing thousand separators)
    // The last part is the decimal part if it has 1-2 digits, otherwise it's also thousands
    const lastPart = parts[parts.length - 1];
    if (lastPart.length <= 2 && parts.length > 1) {
      // Last part is decimal
      const integerPart = parts.slice(0, -1).join('');
      return parseFloat(integerPart + '.' + lastPart) || 0;
    } else {
      // All dots are thousands separators
      return parseFloat(parts.join('')) || 0;
    }
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

    setResults({
      payment,
      totalInterest,
      totalAmount: totalPayments,
      maxLoanAmount: calculatedMaxAmount,
      schedule,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="w-full">
      <div className="card p-4 sm:p-6 lg:p-8">
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
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none">$</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => handleFormattedInputChange(e.target.value, setAmount)}
                  placeholder={dict.amountPlaceholder}
                  className="input-field pl-10"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {dict.payment}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none">$</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={desiredPayment}
                  onChange={(e) => handleFormattedInputChange(e.target.value, setDesiredPayment)}
                  placeholder={dict.amountPlaceholder}
                  className="input-field pl-10"
                />
              </div>
            </div>
          )}

          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {dict.rate}
            </label>
            <div className="relative">
              <input
                type="text"
                inputMode="decimal"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder={dict.ratePlaceholder}
                className="input-field pr-8"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">%</span>
            </div>
          </div>

          {/* Loan Term with Unit Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {dict.term}
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
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {dict.downPayment}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none">$</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={downPayment}
                    onChange={(e) => handleFormattedInputChange(e.target.value, setDownPayment)}
                    placeholder={dict.downPaymentPlaceholder}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {dict.originationFee}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none">$</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={originationFee}
                    onChange={(e) => handleFormattedInputChange(e.target.value, setOriginationFee)}
                    placeholder={dict.originationFeePlaceholder}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {dict.insurance}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none">$</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={insurance}
                    onChange={(e) => handleFormattedInputChange(e.target.value, setInsurance)}
                    placeholder={dict.insurancePlaceholder}
                    className="input-field pl-10"
                  />
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
          <div className="card p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">{dict.results}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {calculationMode === 'payment' ? (
                <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
                  <p className="text-sm text-gray-600 mb-2">{dict.payment}</p>
                  <p className="text-3xl font-bold text-primary-700">
                    {formatCurrency(results.payment)}
                  </p>
                </div>
              ) : (
                <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
                  <p className="text-sm text-gray-600 mb-2">{dict.maxLoanAmount}</p>
                  <p className="text-3xl font-bold text-primary-700">
                    {formatCurrency(results.maxLoanAmount || 0)}
                  </p>
                </div>
              )}

              <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">{dict.totalInterest}</p>
                <p className="text-3xl font-bold text-amber-700">
                  {formatCurrency(results.totalInterest)}
                </p>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">{dict.totalAmount}</p>
                <p className="text-3xl font-bold text-emerald-700">
                  {formatCurrency(results.totalAmount)}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{dict.amortization}</h3>
              <button
                onClick={() => setShowSchedule(!showSchedule)}
                className="text-primary-600 hover:text-primary-700 font-medium text-sm sm:text-base p-2 -ml-2 sm:ml-0 text-left sm:text-right touch-manipulation"
              >
                {showSchedule ? dict.hideSchedule : dict.showSchedule}
              </button>
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
