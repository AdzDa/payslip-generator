// // components/PdfPayslip.tsx
// import React from "react";
// import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
// import styles from "./style";
// import type { Credit, Deduction, PdfPayslipProps } from "./dataType";

// const toNumber = (val: any) => {
//   const num = Number(val);
//   return Number.isFinite(num) ? num : 0;
// };

// const PdfPayslip: React.FC<PdfPayslipProps> = ({ details }) => {
//   // Deep-safe data extraction
//   const additionalCredits: Credit[] = details?.salary?.additionalCredits ?? [];
//   const deductionsArr: Deduction[] = details?.salary?.deductions ?? [];
//   const employerContributions: Record<string, any> =
//     details?.advanced?.employerContributions ?? {};

//   // Calculations
//   const grossSalary =
//     toNumber(details?.salary?.basicSalary) +
//     toNumber(details?.salary?.overtime?.amount) +
//     additionalCredits.reduce((sum, c) => sum + toNumber(c.amount), 0);

//   const totalDeductions = deductionsArr.reduce(
//     (sum, d) => sum + toNumber(d.amount),
//     0
//   );

//   const netPay = grossSalary - totalDeductions;

//   // Lists
//   const earnings = [
//     { label: "Basic Salary", amount: toNumber(details?.salary?.basicSalary) },
//     ...additionalCredits.map((c) => ({
//       label: c?.title || "",
//       amount: toNumber(c?.amount),
//     })),
//     {
//       label: `Overtime (${toNumber(details?.salary?.overtime?.totalHours)} hrs)`,
//       amount: toNumber(details?.salary?.overtime?.amount),
//     },
//   ];

//   const deductions = deductionsArr.map((d) => ({
//     label: d?.title || "",
//     amount: toNumber(d?.amount),
//   }));

//   const contributions = Object.entries(employerContributions).map(
//     ([key, value]) => ({
//       label: key
//         .replace(/([A-Z])/g, " $1")
//         .replace(/^./, (str) => str.toUpperCase()),
//       amount: toNumber(value),
//     })
//   );

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         {/* ===== Company Header ===== */}
//         <View style={styles.companySection}>
//           {details?.company?.logoImage ? (
//             <Image
//               src={details.company.logoImage}
//               style={{ width: 80, height: 80 }}
//             />
//           ) : (
//             <View
//               style={{
//                 width: 80,
//                 height: 80,
//                 backgroundColor: "#eee",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Text style={{ fontSize: 8, color: "#999" }}>No Logo</Text>
//             </View>
//           )}
//           <View style={{ flex: 1, marginLeft: 10 }}>
//             <Text style={styles.companyName}>
//               {details?.company?.companyName}
//             </Text>
//             <Text>({details?.company?.registrationNo})</Text>
//             <Text style={{ fontSize: 9 }}>{details?.company?.address}</Text>
//             <Text style={{ fontSize: 9 }}>
//               Bank: {details?.company?.bankName}
//             </Text>
//           </View>
//         </View>

//         {/* ===== Employee Info ===== */}
//         <View style={styles.employeeSection}>
//           <View style={styles.EmployeeLeft}>
//             <Text style={{ fontSize: 11, fontWeight: "bold" }}>
//               {details?.employee?.employeeName}
//             </Text>
//             <Text style={{ fontSize: 9 }}>
//               NRIC/ Passport: {details?.employee?.nric} • Employee ID:{" "}
//               {details?.employee?.employeeId}
//             </Text>
//             <Text style={{ fontSize: 9 }}>
//               Income Tax No: {details?.employee?.incomeTaxNo}
//             </Text>
//             <Text style={{ fontSize: 9 }}>
//               EPF No: {details?.employee?.epfNo}
//             </Text>
//             <Text style={{ fontSize: 9 }}>
//               SOCSO No: {details?.employee?.socsoNo}
//             </Text>
//           </View>

//           <View style={styles.EmployeeRight}>
//             <Text style={{ fontSize: 9 }}>
//               Period Type: {details?.payroll?.periodType}
//             </Text>
//             <Text style={{ fontSize: 9 }}>
//               Period: {details?.payroll?.period}
//             </Text>
//             <Text style={{ fontSize: 9 }}>
//               Payment Method: {details?.payroll?.paymentMethod}
//             </Text>
//             <View style={styles.netPayBox}>
//               <Text style={styles.netPayLabel}>Nett Pay</Text>
//               <Text style={styles.netPayValue}>
//                 {details?.salary?.currency} {netPay.toFixed(2)}
//               </Text>
//             </View>
//           </View>
//         </View>

//         {/* ===== Earnings ===== */}
//         <View style={styles.tableSection}>
//           <View style={styles.tableHeader}>
//             <Text style={styles.headerCell}>Earning / Reimbursement</Text>
//             <Text style={styles.headerCell}>
//               Amount ({details?.salary?.currency})
//             </Text>
//           </View>
//           <View style={{ flexDirection: "column" }}>
//             {earnings.map((item, idx) => (
//               <View style={styles.row} key={`earning-${idx}`}>
//                 <Text style={styles.cell}>{item.label}</Text>
//                 <Text style={styles.cell}>
//                   {toNumber(item.amount).toFixed(2)}
//                 </Text>
//               </View>
//             ))}
//           </View>
//           <View style={styles.totalRow}>
//             <Text style={styles.cell}>Gross Salary</Text>
//             <Text style={styles.cell}>{grossSalary.toFixed(2)}</Text>
//           </View>
//         </View>

//         {/* ===== Deductions ===== */}
//         <View style={styles.tableSection}>
//           <View style={styles.tableHeader}>
//             <Text style={styles.headerCell}>Deduction(s)</Text>
//             <Text style={styles.headerCell}>
//               Amount ({details?.salary?.currency})
//             </Text>
//           </View>
//           <View style={{ flexDirection: "column" }}>
//             {deductions.map((item, idx) => (
//               <View style={styles.row} key={`deduction-${idx}`}>
//                 <Text style={styles.cell}>{item.label}</Text>
//                 <Text style={styles.cell}>
//                   {toNumber(item.amount).toFixed(2)}
//                 </Text>
//               </View>
//             ))}
//           </View>
//           <View style={styles.totalRow}>
//             <Text style={styles.cell}>Total Deduction(s)</Text>
//             <Text style={styles.cell}>{totalDeductions.toFixed(2)}</Text>
//           </View>
//         </View>

//         {/* ===== Employer Contributions ===== */}
//         <View style={styles.tableSection}>
//           <View style={styles.tableHeader}>
//             <Text style={styles.headerCell}>Employer Contribution</Text>
//             <Text style={styles.headerCell}>
//               Amount ({details?.salary?.currency})
//             </Text>
//           </View>
//           <View style={{ flexDirection: "column" }}>
//             {contributions.map((item, idx) => (
//               <View style={styles.row} key={`contribution-${idx}`}>
//                 <Text style={styles.cell}>{item.label}</Text>
//                 <Text style={styles.cell}>
//                   {toNumber(item.amount).toFixed(2)}
//                 </Text>
//               </View>
//             ))}
//           </View>
//           <View style={styles.totalRow}>
//             <Text style={styles.cell}>Total Contribution(s)</Text>
//             <Text style={styles.cell}>
//               {contributions
//                 .reduce((sum, c) => sum + toNumber(c.amount), 0)
//                 .toFixed(2)}
//             </Text>
//           </View>
//         </View>

//         {/* ===== Footer ===== */}
//         <Text style={styles.footer}>
//           This is a computer generated payslip
//         </Text>
//       </Page>
//     </Document>
//   );
// };

// export default PdfPayslip;


import React from "react";
import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import styles from "./style"; 
import type { PdfPayslipProps } from "./dataType";

// const details = {
//   company: {
//     registrationNo: "123456-A",
//     companyName: "Tech Innovations Sdn Bhd",
//     address: "123, Jalan Teknologi, Kuala Lumpur, Malaysia",
//     bankName: "Maybank",
//     logoImage: null,
//   },
//   employee: {
//     employeeId: "EMP001",
//     employeeName: "Ahmad bin Ali",
//     nric: "900101-14-5678",
//     incomeTaxNo: "TX1234567",
//     epfNo: "EPF987654",
//     socsoNo: "SOCSO123456",
//   },
//   payroll: {
//     periodType: "Month",
//     period: "August 2025",
//     payrollDate: "2025-08-31",
//     paymentMethod: "Bank Transfer",
//     employeeBank: "Maybank",
//   },
//   salary: {
//     currency: "RM",
//     basicSalary: "5000",
//     overtime: { rateType: "Hourly", totalHours: "10", amount: "300" },
//     additionalCredits: [
//       { title: "Travel Allowance", amount: "200" },
//       { title: "Meal Allowance", amount: "150" },
//       { title: "Performance Bonus", amount: "500" },
//     ],
//     deductions: [
//       { title: "Late Penalty", amount: "50" },
//       { title: "Unpaid Leave", amount: "300" },
//     ],
//   },
//   advanced: {
//     employerContributions: {
//       employerSocso: "150",
//       employerEpf: "550",
//       employerEis: "20",
//     },
//   },
// };

export default function PdfPayslip({details}:PdfPayslipProps) {
  const grossSalary =
    parseFloat(String(details.salary.basicSalary)) +
    parseFloat(String(details.salary.overtime.amount)) +
    details.salary.additionalCredits.reduce(
      (sum, c) => sum + parseFloat(String(c.amount)),
      0
    );

  const totalDeductions = details.salary.deductions.reduce(
    (sum, d) => sum + parseFloat(String(d.amount)),
    0
  );

  const nettPay = grossSalary - totalDeductions;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.pdfContainer}>
          {/* ===== Company Header ===== */}
          <View style={styles.companyHeader}>
            <View style={styles.companyLogo}>
              {details.company.logoImage ? (
                <Image src={details.company.logoImage} />
              ) : (
                <Text style={[styles.text10, styles.textGray]}>No Logo</Text>
              )}
            </View>
            <View style={styles.companyDetails}>
              <Text style={styles.text14}>{details.company.companyName}</Text>
              <Text style={styles.text12}>
                ({details.company.registrationNo})
              </Text>
              <Text style={styles.text10}>{details.company.address}</Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Text style={[styles.text10, styles.fontBold]}>Bank:</Text>
                <Text style={styles.text10}>{details.company.bankName}</Text>
              </View>
            </View>
          </View>

          {/* ===== Employee Section ===== */}
          <View style={styles.employeeSection}>
            {/* Left Side */}
            <View style={styles.employeeInfo}>
              <View>
                <Text style={[styles.text12, styles.fontBold]}>
                  {details.employee.employeeName}
                </Text>
                <View style={{ flexDirection: "row", gap: 6 }}>
                  <View style={{ flexDirection: "row", gap: 4 }}>
                    <Text style={[styles.text10, styles.fontBold]}>
                      NRIC/ Passport
                    </Text>
                    <Text style={styles.text10}>: {details.employee.nric}</Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: styles.textGray.color,
                      borderRadius: 50,
                      width: 4,
                      height: 4,
                      alignSelf: "center",
                    }}
                  />
                  <View style={{ flexDirection: "row", gap: 4 }}>
                    <Text style={[styles.text10, styles.fontBold]}>
                      Employee ID
                    </Text>
                    <Text style={styles.text10}>
                      : {details.employee.employeeId}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.employeeCards}>
                <View style={styles.employeeCardHalf}>
                  <View style={{ flexDirection: "row", gap: 4 }}>
                    <Text style={[styles.text10, styles.fontBold]}>
                      Income Tax No
                    </Text>

                    <Text style={styles.text10}>
                      : {details.employee.incomeTaxNo}
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row", gap: 4 }}>
                    <Text style={[styles.text10, styles.fontBold]}>EPF No</Text>
                    <Text style={styles.text10}>: {details.employee.epfNo}</Text>                    
                  </View>

                  <View style={{ flexDirection: "row", gap: 4 }}>
                    <Text style={[styles.text10, styles.fontBold]}>SOCSO No</Text>
                    <Text style={styles.text10}>: {details.employee.socsoNo}</Text>
                  </View>
                </View>

                <View style={styles.employeeCardHalf}>
                  <View style={{ flexDirection: "row", gap: 4 }}>
                    <Text style={[styles.text10, styles.fontBold]}>
                      Period Type
                    </Text>
                    <Text style={styles.text10}>
                      : {details.payroll.periodType}
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row", gap: 4 }}>
                    <Text style={[styles.text10, styles.fontBold]}>
                      Payroll Date
                    </Text>
                    <Text style={styles.text10}>
                      {/* : {details.payroll.payrollDate} */}
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row", gap: 4 }}>
                    <Text style={[styles.text10, styles.fontBold]}>
                      Payment Method
                    </Text>
                    <Text style={styles.text10}>
                      : {details.payroll.paymentMethod}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Right Side - Period & Nett Pay */}
            <View style={styles.periodPay}>
              <View style={styles.periodBox}>
                <Text style={[styles.text12, styles.fontBold]}>Period:</Text>
                <Text style={styles.text12}>{details.payroll.period}</Text>
              </View>
              <View style={styles.nettPayBox}>
                <Text style={styles.text12}>Nett Salary</Text>
                <Text style={[styles.text12, styles.nettBlue, styles.fontBold]}>
                  {details.salary.currency} {nettPay.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>

          {/* ===== Earnings ===== */}
          <View style={styles.sectionSpace}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.colTwoThirds, styles.sectionHeaderText]}>
                Earning / Reimbursement
              </Text>
              <Text style={[styles.colOneThird, styles.sectionHeaderText]}>
                Amount ({details.salary.currency})
              </Text>
            </View>

            <View style={styles.sectionRows}>
              <View style={styles.sectionRow}>
                <Text style={[styles.sectionRowText, styles.fontBold, styles.colTwoThirds]}>
                  Basic Salary
                </Text>
                <Text style={[styles.sectionRowText, styles.fontBold, styles.colOneThird]}>
                  {details.salary.basicSalary}
                </Text>
              </View>

              {details.salary.additionalCredits.map((credit, idx) => (
                <View style={styles.sectionRow} key={idx}>
                  <Text style={[styles.sectionRowText, styles.colTwoThirds]}>
                    {credit.title}
                  </Text>
                  <Text style={[styles.sectionRowText, styles.colOneThird]}>
                    {credit.amount}
                  </Text>
                </View>
              ))}

              <View style={styles.sectionRow}>
                <Text style={[styles.sectionRowText, styles.colTwoThirds]}>
                  Overtime ({details.salary.overtime.totalHours} hrs)
                </Text>
                <Text style={[styles.sectionRowText, styles.colOneThird]}>
                  {details.salary.overtime.amount}
                </Text>
              </View>
            </View>

            <View style={[styles.sectionRow, { paddingHorizontal: 10 }]}>
              <Text style={[styles.sectionRowText, styles.fontBold, styles.colTwoThirds]}>
                Gross Salary
              </Text>
              <Text style={[styles.sectionRowText, styles.fontBold, styles.colOneThird]}>
                {grossSalary}
              </Text>
            </View>
          </View>

          {/* ===== Deductions ===== */}
          <View style={styles.sectionSpace}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.colTwoThirds, styles.sectionHeaderText]}>
                Deduction(s)
              </Text>
              <Text style={[styles.colOneThird, styles.sectionHeaderText]}>
                Amount ({details.salary.currency})
              </Text>
            </View>

            <View style={styles.sectionRows}>
              {details.salary.deductions.map((deduct, idx) => (
                <View style={styles.sectionRow} key={idx}>
                  <Text style={[styles.sectionRowText, styles.colTwoThirds]}>
                    {deduct.title}
                  </Text>
                  <Text style={[styles.sectionRowText, styles.colOneThird]}>
                    {deduct.amount}
                  </Text>
                </View>
              ))}
            </View>

            <View style={[styles.sectionRow, { paddingHorizontal: 10 }]}>
              <Text style={[styles.sectionRowText, styles.fontBold, styles.colTwoThirds]}>
                Total Deduction(s)
              </Text>
              <Text style={[styles.sectionRowText, styles.fontBold, styles.colOneThird]}>
                {totalDeductions}
              </Text>
            </View>
          </View>

          {/* ===== Employer Contribution ===== */}
          <View style={styles.sectionSpace}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.colTwoThirds, styles.sectionHeaderText]}>
                Employer Contribution
              </Text>
              <Text style={[styles.colOneThird, styles.sectionHeaderText]}>
                Amount ({details.salary.currency})
              </Text>
            </View>

            <View style={styles.sectionRows}>
              {Object.entries(details.advanced.employerContributions).map(
                ([key, value], idx) => (
                  <View style={styles.sectionRow} key={idx}>
                    <Text style={[styles.sectionRowText, styles.colTwoThirds]}>
                      {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) =>
                        str.toUpperCase()
                      )}
                    </Text>
                    <Text style={[styles.sectionRowText, styles.colOneThird]}>
                      {value}
                    </Text>
                  </View>
                )
              )}
            </View>

            <View style={[styles.sectionRow, { paddingHorizontal: 10 }]}>
              <Text style={[styles.sectionRowText, styles.fontBold, styles.colTwoThirds]}>
                Total Contribution(s)
              </Text>
              <Text style={[styles.sectionRowText, styles.fontBold, styles.colOneThird]}>
                {Object.values(details.advanced.employerContributions)
                  .reduce((sum, v) => sum + parseFloat(String(v)), 0)
                  .toFixed(2)}
              </Text>
            </View>
          </View>

          {/* ===== Footer ===== */}
          <Text style={styles.footerText}>
            This is computer generated payslip
          </Text>
        </View>
      </Page>
    </Document>
  );
}
