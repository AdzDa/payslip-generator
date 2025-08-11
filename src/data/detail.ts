const details = {
  company: {
    registrationNo: '',
    companyName: '',
    address: '',
    bankName: '',
    logoImage: null
  },
  employee: {
    employeeId: '',
    employeeName: '',
    nric: '',
    incomeTaxNo: '',
    epfNo: '',
    socsoNo: ''
  },
  payroll: {
    periodType: 'Month',
    period: '',
    payrollDate: '',
    paymentMethod: '',
    employeeBank: ''
  },
  salary: {
    currency: 'RM',
    basicSalary: '',
    overtime: { rateType: '', totalHours: '', amount: '' },
    additionalCredits: [{
      title: '',
      amount: ''
    }],
    deductions: [{
      title: '',
      amount: ''
    }]
  },
  advanced: {
    employerContributions: {
        employerSocso: '',
        employerEpf: '',
        employerEis: ''
    }
  }
};

export default details;
