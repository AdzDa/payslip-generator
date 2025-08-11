import React from 'react'
import Section from '../Section'
import FormField from '../FormField'
import { useState } from 'react'
import details from '@/data/detail'

export default function EmployeeDetails() {
  const [formData, setFormData] = useState(details);

  return (
    <Section 
        title="Employee Details"
    >
        <FormField
        name="employeeName"
        label="Employee Name"
        placeholder="Enter employee name"
        type="text"
        value={formData.employee.employeeName}
        onChange={(e) =>
            setFormData({
            ...formData,
            employee: {
                ...formData.employee,
                employeeName: e.target.value,
            },
            })
        }
        />

        <div className="flex space-x-[12px]">
        <FormField
            name="employeeId"
            label="Employee ID"
            placeholder="Enter employee ID"
            type="text"
            value={formData.employee.employeeId}
            onChange={(e) =>
            setFormData({
                ...formData,
                employee: {
                ...formData.employee,
                employeeId: e.target.value,
                },
            })
            }
        />

        <FormField
            name="nricOrPassport"
            label="NRIC/ Passport"
            placeholder="Enter NRIC/ Passport"
            type="text"
            value={formData.employee.nric}
            onChange={(e) =>
            setFormData({
                ...formData,
                employee: {
                ...formData.employee,
                nric: e.target.value,
                },
            })
            }
        />
        </div>

        <div className="flex space-x-[12px]">
        <FormField
            name="incomeTaxNo"
            label="Income Tax No."
            placeholder="Enter Income Tax No."
            type="text"
            value={formData.employee.incomeTaxNo}
            onChange={(e) =>
            setFormData({
                ...formData,
                employee: {
                ...formData.employee,
                incomeTaxNo: e.target.value,
                },
            })
            }
        />

        <FormField
            name="epfNo"
            label="EPF No."
            placeholder="Enter EPF No."
            type="text"
            value={formData.employee.epfNo}
            onChange={(e) =>
            setFormData({
                ...formData,
                employee: {
                ...formData.employee,
                epfNo: e.target.value,
                },
            })
            }
        />

        <FormField
            name="socsoNo"
            label="SOCSO No."
            placeholder="Enter SOCSO No."
            type="text"
            value={formData.employee.socsoNo}
            onChange={(e) =>
            setFormData({
                ...formData,
                employee: {
                ...formData.employee,
                socsoNo: e.target.value,
                },
            })
            }
        />
        </div>
    </Section>
  )
}
