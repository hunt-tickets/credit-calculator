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
    calculate: string;
    results: string;
    monthlyPayment: string;
    totalInterest: string;
    totalAmount: string;
    amortization: string;
    month: string;
    payment: string;
    principal: string;
    interest: string;
    balance: string;
    showSchedule: string;
    hideSchedule: string;
  };
}

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export default function CreditCalculator({ dict }: CreditCalculatorProps) {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalAmount: number;
    schedule: AmortizationRow[];
  } | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);

  const calculateLoan = () => {
    const principal = parseFloat(amount);
    const annualRate = parseFloat(rate);
    const months = parseInt(term);

    if (isNaN(principal) || isNaN(annualRate) || isNaN(months) || principal <= 0 || annualRate < 0 || months <= 0) {
      return;
    }

    // Calculate monthly interest rate
    const monthlyRate = annualRate / 100 / 12;

    // Calculate monthly payment using amortization formula
    let monthlyPayment: number;
    if (monthlyRate === 0) {
      monthlyPayment = principal / months;
    } else {
      monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalAmount = monthlyPayment * months;
    const totalInterest = totalAmount - principal;

    // Generate amortization schedule
    const schedule: AmortizationRow[] = [];
    let balance = principal;

    for (let i = 1; i <= months; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month: i,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
      });
    }

    setResults({
      monthlyPayment,
      totalInterest,
      totalAmount,
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
      <div className="card p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {dict.amount}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={dict.amountPlaceholder}
              className="input-field"
              min="0"
              step="1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {dict.rate}
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder={dict.ratePlaceholder}
              className="input-field"
              min="0"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {dict.term}
            </label>
            <input
              type="number"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder={dict.termPlaceholder}
              className="input-field"
              min="1"
              step="1"
            />
          </div>
        </div>

        <div className="mt-6">
          <button onClick={calculateLoan} className="btn-primary">
            {dict.calculate}
          </button>
        </div>
      </div>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="card p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{dict.results}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">{dict.monthlyPayment}</p>
                <p className="text-3xl font-bold text-primary-700">
                  {formatCurrency(results.monthlyPayment)}
                </p>
              </div>

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

          <div className="card p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-800">{dict.amortization}</h3>
              <button
                onClick={() => setShowSchedule(!showSchedule)}
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                {showSchedule ? dict.hideSchedule : dict.showSchedule}
              </button>
            </div>

            {showSchedule && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {dict.month}
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {dict.payment}
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {dict.principal}
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {dict.interest}
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {dict.balance}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {results.schedule.map((row) => (
                      <tr key={row.month} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {row.month}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                          {formatCurrency(row.payment)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                          {formatCurrency(row.principal)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                          {formatCurrency(row.interest)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                          {formatCurrency(row.balance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
