// components/PdfPayslip.tsx
import React from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import styles from "./style";
import type { Credit, Deduction, PdfPayslipProps } from "./dataType";

const toNumber = (val: any) => {
  const num = Number(val);
  return Number.isFinite(num) ? num : 0;
};

const PdfPayslip: React.FC<PdfPayslipProps> = ({ details }) => {
  // Deep-safe data extraction
  const additionalCredits: Credit[] = details?.salary?.additionalCredits ?? [];
  const deductionsArr: Deduction[] = details?.salary?.deductions ?? [];
  const employerContributions: Record<string, any> =
    details?.advanced?.employerContributions ?? {};

  // Calculations
  const grossSalary =
    toNumber(details?.salary?.basicSalary) +
    toNumber(details?.salary?.overtime?.amount) +
    additionalCredits.reduce((sum, c) => sum + toNumber(c.amount), 0);

  const totalDeductions = deductionsArr.reduce(
    (sum, d) => sum + toNumber(d.amount),
    0
  );

  const netPay = grossSalary - totalDeductions;

  // Lists
  const earnings = [
    { label: "Basic Salary", amount: toNumber(details?.salary?.basicSalary) },
    ...additionalCredits.map((c) => ({
      label: c?.title || "",
      amount: toNumber(c?.amount),
    })),
    {
      label: `Overtime (${toNumber(details?.salary?.overtime?.totalHours)} hrs)`,
      amount: toNumber(details?.salary?.overtime?.amount),
    },
  ];

  const deductions = deductionsArr.map((d) => ({
    label: d?.title || "",
    amount: toNumber(d?.amount),
  }));

  const contributions = Object.entries(employerContributions).map(
    ([key, value]) => ({
      label: key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase()),
      amount: toNumber(value),
    })
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ===== Company Header ===== */}
        <View style={styles.companySection}>
          {details?.company?.logoImage ? (
            <Image
              src={details.company.logoImage}
              style={{ width: 80, height: 80 }}
            />
          ) : (
            <View
              style={{
                width: 80,
                height: 80,
                backgroundColor: "#eee",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 8, color: "#999" }}>No Logo</Text>
            </View>
          )}
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.companyName}>
              {details?.company?.companyName}
            </Text>
            <Text>({details?.company?.registrationNo})</Text>
            <Text style={{ fontSize: 9 }}>{details?.company?.address}</Text>
            <Text style={{ fontSize: 9 }}>
              Bank: {details?.company?.bankName}
            </Text>
          </View>
        </View>

        {/* ===== Employee Info ===== */}
        <View style={styles.employeeSection}>
          <View style={styles.EmployeeLeft}>
            <Text style={{ fontSize: 11, fontWeight: "bold" }}>
              {details?.employee?.employeeName}
            </Text>
            <Text style={{ fontSize: 9 }}>
              NRIC/ Passport: {details?.employee?.nric} • Employee ID:{" "}
              {details?.employee?.employeeId}
            </Text>
            <Text style={{ fontSize: 9 }}>
              Income Tax No: {details?.employee?.incomeTaxNo}
            </Text>
            <Text style={{ fontSize: 9 }}>
              EPF No: {details?.employee?.epfNo}
            </Text>
            <Text style={{ fontSize: 9 }}>
              SOCSO No: {details?.employee?.socsoNo}
            </Text>
          </View>

          <View style={styles.EmployeeRight}>
            <Text style={{ fontSize: 9 }}>
              Period Type: {details?.payroll?.periodType}
            </Text>
            <Text style={{ fontSize: 9 }}>
              Period: {details?.payroll?.period}
            </Text>
            <Text style={{ fontSize: 9 }}>
              Payment Method: {details?.payroll?.paymentMethod}
            </Text>
            <View style={styles.netPayBox}>
              <Text style={styles.netPayLabel}>Nett Pay</Text>
              <Text style={styles.netPayValue}>
                {details?.salary?.currency} {netPay.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* ===== Earnings ===== */}
        <View style={styles.tableSection}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Earning / Reimbursement</Text>
            <Text style={styles.headerCell}>
              Amount ({details?.salary?.currency})
            </Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            {earnings.map((item, idx) => (
              <View style={styles.row} key={`earning-${idx}`}>
                <Text style={styles.cell}>{item.label}</Text>
                <Text style={styles.cell}>
                  {toNumber(item.amount).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.cell}>Gross Salary</Text>
            <Text style={styles.cell}>{grossSalary.toFixed(2)}</Text>
          </View>
        </View>

        {/* ===== Deductions ===== */}
        <View style={styles.tableSection}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Deduction(s)</Text>
            <Text style={styles.headerCell}>
              Amount ({details?.salary?.currency})
            </Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            {deductions.map((item, idx) => (
              <View style={styles.row} key={`deduction-${idx}`}>
                <Text style={styles.cell}>{item.label}</Text>
                <Text style={styles.cell}>
                  {toNumber(item.amount).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.cell}>Total Deduction(s)</Text>
            <Text style={styles.cell}>{totalDeductions.toFixed(2)}</Text>
          </View>
        </View>

        {/* ===== Employer Contributions ===== */}
        <View style={styles.tableSection}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Employer Contribution</Text>
            <Text style={styles.headerCell}>
              Amount ({details?.salary?.currency})
            </Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            {contributions.map((item, idx) => (
              <View style={styles.row} key={`contribution-${idx}`}>
                <Text style={styles.cell}>{item.label}</Text>
                <Text style={styles.cell}>
                  {toNumber(item.amount).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.cell}>Total Contribution(s)</Text>
            <Text style={styles.cell}>
              {contributions
                .reduce((sum, c) => sum + toNumber(c.amount), 0)
                .toFixed(2)}
            </Text>
          </View>
        </View>

        {/* ===== Footer ===== */}
        <Text style={styles.footer}>
          This is a computer generated payslip
        </Text>
      </Page>
    </Document>
  );
};

export default PdfPayslip;
