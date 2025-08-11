const periodType = [
  { label: "Day", value: "day",  disabled: true},
  { label: "Month", value: "month" },
  { label: "Year", value: "year", disabled: true }
];

const paymentMethod = [
  { label: "Bank Transfer", value: "bank_transfer" },
  { label: "Cheque", value: "cheque" },
  { label: "Cash", value: "cash" },
  { label: "e-Wallet", value: "ewallet" }
];

const currency = [
  { label: "RM", value: "MYR" },
  { label: "USD", value: "USD" },
  { label: "SGD", value: "SGD" },
  { label: "IDR", value: "IDR" },
  { label: "EUR", value: "EUR" }
]

const overtimeRateType = [
  { label: "Normal", value: "normal" },
  { label: "Public Holiday", value: "publicHoliday" }
];

export const payrollDetails = {
  periodType,
  paymentMethod,
  currency,
  overtimeRateType
};


