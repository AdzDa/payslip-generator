import React from 'react';

const details = {
  company: {
    registrationNo: '123456-A',
    companyName: 'Tech Innovations Sdn Bhd',
    address: '123, Jalan Teknologi, Kuala Lumpur, Malaysia',
    bankName: 'Maybank',
    logoImage: null
  },
  employee: {
    employeeId: 'EMP001',
    employeeName: 'Ahmad bin Ali',
    nric: '900101-14-5678',
    incomeTaxNo: 'TX1234567',
    epfNo: 'EPF987654',
    socsoNo: 'SOCSO123456'
  },
  payroll: {
    periodType: 'Month',
    period: 'August 2025',
    payrollDate: '2025-08-31',
    paymentMethod: 'Bank Transfer',
    employeeBank: 'Maybank'
  },
  salary: {
    currency: 'RM',
    basicSalary: '5000',
    overtime: { rateType: 'Hourly', totalHours: '10', amount: '300' },
    additionalCredits: [
      { title: 'Travel Allowance', amount: '200' },
      { title: 'Meal Allowance', amount: '150' },
      { title: 'Performance Bonus', amount: '500' }
    ],
    deductions: [
      { title: 'Late Penalty', amount: '50' },
      { title: 'Unpaid Leave', amount: '300' }
    ]
  },
  advanced: {
    employerContributions: {
      employerSocso: '150',
      employerEpf: '550',
      employerEis: '20'
    }
  }
};

export default function PDFLayout() {
  const grossSalary =
    parseFloat(details.salary.basicSalary) +
    parseFloat(details.salary.overtime.amount) +
    details.salary.additionalCredits.reduce((sum, c) => sum + parseFloat(c.amount), 0);

  const totalDeductions = details.salary.deductions.reduce((sum, d) => sum + parseFloat(d.amount), 0);

  const nettPay = grossSalary - totalDeductions;

  return (
    <div className="bg-gray-400 p-[20px] min-h-screen flex items-center justify-center">
      <div className="flex flex-col space-y-[20px] bg-white w-[595px] h-[842px] p-[40px]">
        {/* Company Header */}
        <div className="flex space-x-[20px]">
          <div className="w-[100px] h-[100px] bg-gray-200 flex items-center justify-center">
            {details.company.logoImage ? (
              <img
                src={details.company.logoImage}
                alt="Company Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[10px] text-gray-500">No Logo</span>
            )}
          </div>
          <div className="w-[360px] flex flex-col space-y-[4px]">
            <h2 className="text-[14px] font-bold">{details.company.companyName}</h2>
            <p className="!text-[12px]">({details.company.registrationNo})</p>
            <p className="!text-[10px]">{details.company.address}</p>
            <div className="flex space-x-[10px]">
              <p className="font-bold !text-[10px]">Bank:</p>
              <p className="!text-[10px]">{details.company.bankName}</p>
            </div>
          </div>
        </div>

        {/* Employee Info */}
        <div className="flex space-x-[10px]">
          <div className="w-full flex flex-col space-y-[10px]">
            <div className="flex flex-col">
              <p className="!text-[12px] font-bold">{details.employee.employeeName}</p>
              <div className="text-gray-700 flex space-x-[6px]">
                <div className="flex space-x-[4px]">
                  <p className="!text-[10px] font-bold">NRIC/ Passport</p>
                  <p className="!text-[10px]">: {details.employee.nric}</p>
                </div>
                <div className="flex align-center justify-center bg-gray-400 rounded-full w-[4px] h-[4px]"></div>
                <div className="text-gray-700 flex space-x-[4px]">
                  <p className="!text-[10px] font-bold">Employee ID</p>
                  <p className="!text-[10px]">: {details.employee.employeeId}</p>
                </div>
              </div>
            </div>

            <div className="p-[10px] rounded-[4.5px] bg-gray-200 flex space-x-[14px]">
              <div className="w-1/2 flex flex-col space-y-[2px]">
                <div className="text-gray-700 flex space-x-[4px]">
                  <p className="!text-[10px] font-bold">Income Tax No</p>
                  <p className="!text-[10px]">: {details.employee.incomeTaxNo}</p>
                </div>
                <div className="text-gray-700 flex space-x-[4px]">
                  <p className="!text-[10px] font-bold">EPF No</p>
                  <p className="!text-[10px]">: {details.employee.epfNo}</p>
                </div>
                <div className="text-gray-700 flex space-x-[4px]">
                  <p className="!text-[10px] font-bold">SOCSO No</p>
                  <p className="!text-[10px]">: {details.employee.socsoNo}</p>
                </div>
              </div>

              <div className="w-1/2 flex flex-col space-y-[2px]">
                <div className="text-gray-700 flex space-x-[4px]">
                  <p className="!text-[10px] font-bold">Period Type</p>
                  <p className="!text-[10px]">: {details.payroll.periodType}</p>
                </div>
                <div className="text-gray-700 flex space-x-[4px]">
                  <p className="!text-[10px] font-bold">Payroll Date</p>
                  <p className="!text-[10px]">: {details.payroll.payrollDate}</p>
                </div>
                <div className="text-gray-700 flex space-x-[4px]">
                  <p className="!text-[10px] font-bold">Payment Method</p>
                  <p className="!text-[10px]">: {details.payroll.paymentMethod}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Period & Nett Pay */}
          <div className="w-[133px] flex flex-col space-y-[10px]">
            <div className="flex space-x-[10px]">
              <p className="!text-[12px] font-bold">Period:</p>
              <p className="!text-[12px]">{details.payroll.period}</p>
            </div>
            <div className="p-[10px] border-blue-500 border rounded-[4.5px] items-center flex flex-col space-y-[2px]">
              <p className="!text-[12px] font-bold">Nett Pay</p>
              <p className="font-bold text-blue !text-[12px]">
                {details.salary.currency} {nettPay.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Earnings */}
        <div className="flex flex-col space-y-[10px]">
          <div className="flex px-[10px] py-[4px] rounded-[4.5px] bg-blue-700">
            <p className="font-bold w-2/3 !text-[10px] text-white">Earning/ Reimbursement</p>
            <p className="text-end font-bold w-1/3 !text-[10px] text-white">Amount ({details.salary.currency})</p>
          </div>

          <div className='px-[10px] flex flex-col space-y-[0px]'>
            <div className="flex">
                <p className="font-bold w-2/3 !text-[10px]">Basic Salary</p>
                <p className="font-bold text-end w-1/3 !text-[10px]"> {details.salary.basicSalary}</p>
            </div>

            {details.salary.additionalCredits.map((credit, idx) => (
                <div key={idx} className="flex">
                <p className="w-2/3 !text-[10px]">{credit.title}</p>
                <p className="text-end w-1/3 !text-[10px]">{credit.amount}</p>
                </div>
            ))}

            <div className="flex">
                <p className="w-2/3 !text-[10px]">Overtime ({details.salary.overtime.totalHours} hrs)</p>
                <p className="text-end w-1/3 !text-[10px]">{details.salary.overtime.amount}</p>
            </div>
          </div>

            <div className="px-[10px] flex">
                <p className="font-bold w-2/3 !text-[10px]">Gross Salary</p>
                <p className="font-bold text-end w-1/3 !text-[10px]">{grossSalary}</p>
            </div>
        </div>

        {/* Deductions */}
        <div className="flex flex-col space-y-[10px]">
          <div className="flex px-[10px] py-[4px] rounded-[4.5px] bg-blue-700">
            <p className="font-bold w-2/3 !text-[10px] text-white">Deduction(s)</p>
            <p className="text-end font-bold w-1/3 !text-[10px] text-white">Amount ({details.salary.currency})</p>
          </div>

          <div className='px-[10px] flex flex-col space-y-[0px]'>
            {details.salary.additionalCredits.map((credit, idx) => (
                <div key={idx} className="flex">
                <p className="w-2/3 !text-[10px]">{credit.title}</p>
                <p className="text-end w-1/3 !text-[10px]">{credit.amount}</p>
                </div>
            ))}
          </div>

            <div className="px-[10px] flex">
                <p className="font-bold w-2/3 !text-[10px]">Total Deduction(s)</p>
                <p className="font-bold text-end w-1/3 !text-[10px]">{grossSalary}</p>
            </div>
        </div>

        {/* Employer Contribution */}
        <div className="flex flex-col space-y-[10px]">
          <div className="flex px-[10px] py-[4px] rounded-[4.5px] bg-blue-700">
            <p className="font-bold w-2/3 !text-[10px] text-white">Employer Contribution</p>
            <p className="text-end font-bold w-1/3 !text-[10px] text-white">Amount ({details.salary.currency})</p>
          </div>

            <div className='px-[10px] flex flex-col space-y-[0px]'>
                {Object.entries(details.advanced.employerContributions).map(([key, value], idx) => (
                    <div key={idx} className="flex">
                    <p className="w-2/3 !text-[10px]">
                        {key
                        .replace(/([A-Z])/g, ' $1') // space before capital letters
                        .replace(/^./, str => str.toUpperCase())} {/* Capitalize first letter */}
                    </p>
                    <p className="text-end w-1/3 !text-[10px]">
                        {details.salary.currency} {value}
                    </p>
                    </div>
                ))}
            </div>

            <div className="px-[10px] flex">
                <p className="font-bold w-2/3 !text-[10px]">Total Contribution(s)</p>
                <p className="font-bold text-end w-1/3 !text-[10px]">{grossSalary}</p>
            </div>
        </div>

        {/* Footer */}
        <p className="text-center !text-[10px]">This is computer generated payslip</p>
      </div>
    </div>
  );
}


