import React from 'react'
import Section from '../Section'
import FormField from '../FormField'
import details from '@/data/detail'
import { useState } from 'react'
import {payrollDetails} from '@/data/payrollDetails'
import { bankList } from '@/data/bankList'

export default function PayslipDetails() {
  const [formData, setFormData] = useState(details);

  return (
    <Section 
        title="Payslip/ Payroll Details"
    >
        <div className="flex space-x-[12px]">
        <FormField
            name="periodType"
            label="Period Type"
            placeholder="Select a type"
            type="select"
            value={formData.payroll.periodType}
            options={payrollDetails.periodType}
            onChange={(e) =>
            setFormData({
                ...formData,
                payroll: {
                ...formData.payroll,
                periodType: e.target.value,
                },
            })
            }
        />

        <FormField
            name="Period"
            label="Period"
            placeholder="Select a month"
            type="month"
            value={formData.payroll.period}
            onChange={(e) =>
            setFormData({
                ...formData,
                payroll: {
                ...formData.payroll,
                period: e.target.value,
                },
            })
            }
        />
        </div>

        <FormField
        name="payrollDate"
        label="Payment Date"
        placeholder="Select a date"
        type="date"
        value={formData.payroll.payrollDate}
        onChange={(e) =>
            setFormData({
            ...formData,
            payroll: {
                ...formData.payroll,
                payrollDate: e.target.value,
            },
            })
        }
        />

        <div className="flex space-x-[12px]">
        <FormField
            name="paymentMethod"
            label="Payment Method"
            placeholder="Select a method"
            options={payrollDetails.paymentMethod}
            type="select"
            value={formData.payroll.paymentMethod}
            onChange={(e) =>
            setFormData({
                ...formData,
                payroll: {
                ...formData.payroll,
                paymentMethod: e.target.value,
                },
            })
            }
        />

        <FormField
            name="employeeBank"
            label="Employee Bank"
            placeholder="Select a bank"
            options={bankList}
            type="select"
            value={formData.payroll.employeeBank}
            onChange={(e) =>
            setFormData({
                ...formData,
                payroll: {
                ...formData.payroll,
                employeeBank: e.target.value,
                },
            })
            }
        />
        </div>
    </Section>
  )
}
