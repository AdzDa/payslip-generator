type Company = {
  companyName: string;
  registrationNo: string;
  address: string;
  bankName: string;
  logoImage: string | null;
};

type Employee = {
  employeeName: string;
  employeeId: string;
  nric: string;
  incomeTaxNo: string;
  epfNo: string;
  socsoNo: string;
};

type Payroll = {
  periodType: string;
  period: string;
  paymentMethod: string;
  employeeBank: string;
};

type Salary = {
  basicSalary: number;
  overtime: Overtime;
  additionalCredits: Credit[];
  deductions: Deduction[];
  currency: string;
};

type Advanced = {
  employerContributions: EmployerContributions;
};

type Credit = {
  title: string;
  amount: number;
};

type Deduction = {
  title: string;
  amount: number;
};

type Overtime = {
  amount: number;
  rateType: string;
  totalHours: number;
};

type EmployerContributions = {
  employerSocso: number;
  employerEpf: number;
  employerEis: number;
};

type Details = {
  company: Company;
  employee: Employee;
  payroll: Payroll;
  salary: Salary;
  advanced: Advanced;
};

type PdfPayslipProps = {
  details: Details;
};

export type {
    Credit,
    Deduction,
    Overtime,
    EmployerContributions,
    Salary,
    Company,
    Employee,
    Payroll,
    Advanced,
    Details,
    PdfPayslipProps
}