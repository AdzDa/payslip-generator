import React from 'react'
import Section from '../Section'
import FormField from '../FormField'
import details from '@/data/detail'
import { useState } from 'react'

type Props = {
  formData: any;
  setFormData: (data: any) => void;
};

export default function AdvancedDetails({ formData, setFormData }: Props) {
  const [isOnEmployer, setIsOnEmployer] = useState(false);

  return (
    <Section 
        title="Advanced Details"
    >
        <div className="flex flex-col space-y-[8px]">
        <div className="flex space-x-[8px]">
            <p className="w-full">Employer Contribution(s)</p>

            <div className="flex space-x-[10px]">
            <p className="text-secondary">Add</p>
                    
            {/* Toggle */}
            <button
                type="button"
                onClick={() => setIsOnEmployer(!isOnEmployer)}
                className={`w-[40px] h-[25px] flex items-center rounded-full p-[2px] transition-colors duration-300 ${
                isOnEmployer ? "bg-blue-500" : "bg-gray-300"
                }`}
            >
                <div
                className={`bg-white w-[18px] h-[18px] rounded-full shadow-md transform transition-transform duration-300 ${
                    isOnEmployer ? "translate-x-5" : "translate-x-0"
                }`}
                />
            </button>
            </div>
        </div>

        {/*Shown only if toggle is turned on  */}
        {isOnEmployer && (
        <div className="flex space-x-[12px]">
            <FormField
            name="employerSocso"
            label="Employer SOCSO"
            placeholder="Enter Employer SOCSO"
            type="text"
            value={formData.advanced.employerContributions.employerSocso}
            onChange={(e) =>
                setFormData({
                ...formData,
                advanced: {
                    ...formData.advanced,
                    employerContributions: {
                    ...formData.advanced.employerContributions,
                    employerSocso: e.target.value,
                    },
                },
                })
            }
            />

            <FormField
            name="employerEpf"
            label="Employer EPF"
            placeholder="Enter Employer EPF"
            type="text"
            value={formData.advanced.employerContributions.employerEpf}
            onChange={(e) =>
                setFormData({
                ...formData,
                advanced: {
                    ...formData.advanced,
                    employerContributions: {
                    ...formData.advanced.employerContributions,
                    employerEpf: e.target.value,
                    },
                },
                })
            }
            />

            <FormField
            name="employerEis"
            label="Employer EIS"
            placeholder="Enter Employer EIS"
            type="text"
            value={formData.advanced.employerContributions.employerEis}
            onChange={(e) =>
                setFormData({
                ...formData,
                advanced: {
                    ...formData.advanced,
                    employerContributions: {
                    ...formData.advanced.employerContributions,
                    employerEis: e.target.value,
                    },
                },
                })
            }
            />
        </div>
        )}
        </div>
    </Section>
  )
}
