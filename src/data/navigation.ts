import CompanyDetails from "@/components/forms/CompanyDetails";
import EmployeeDetails from "@/components/forms/EmployeeDetails";
import PayslipDetails from "@/components/forms/PayslipDetails";
import SalaryDetails from "@/components/forms/SalaryDetails";
import AdvancedDetails from "@/components/forms/AdvancedDetails";
import Settings from "@/components/forms/Settings";

const sections = [
    { id: "section1", label: "Company Details", component: CompanyDetails },
    { id: "section2", label: "Employee Details", component: EmployeeDetails },
    { id: "section3", label: "Payslip/ Payroll Details", component: PayslipDetails },
    { id: "section4", label: "Salary Details", component: SalaryDetails },
    { id: "section5", label: "Advanced Details", component: AdvancedDetails },
    { id: "section6", label: "Settings", component: Settings }
];

export const navigation = {
    sections
};