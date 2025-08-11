import React from 'react'
import { useState } from 'react';
import FormField from '../FormField';
import Section from '../Section';
import details from '@/data/detail';
import { bankList } from '@/data/bankList';

type Props = {
  formData: any;
  setFormData: (data: any) => void;
};

export default function CompanyDetails({ formData, setFormData }: Props) {

  return (
    <Section 
        title="Company Details"
    >
        <div className="flex space-x-[12px]">
        <FormField
            name="registrationNo"
            label="Registration No."
            placeholder="Enter registration number"
            type="text"
            value={formData.company.registrationNo}
            onChange={(e) =>
            setFormData({
                ...formData,
                company: {
                ...formData.company,
                registrationNo: e.target.value,
                },
            })
            }
        />

        <FormField
            name="companyName"
            label="Company Name"
            placeholder="Enter company name"
            type="text"
            value={formData.company.companyName}
            onChange={(e) =>
            setFormData({
                ...formData,
                company: {
                ...formData.company,
                companyName: e.target.value,
                },
            })
            }
        />
        </div>

        <FormField
        label="Address"
        name="address"
        placeholder="Enter company address"
        type="textarea"
        value={formData.company.address}
        onChange={(e) =>
            setFormData({
            ...formData,
            company: {
                ...formData.company,
                address: e.target.value,
            },
            })
        }
        />

        <FormField
        label="Bank Name"
        name="bankName"
        placeholder="Select a bank"
        type="select"
        options={bankList}
        value={formData.company.bankName}
        onChange={(e) =>
            setFormData({
            ...formData,
            company: {
                ...formData.company,
                bankName: e.target.value,
            },
            })
        }
        />

        <FormField
        label="Logo/ Image"
        name="companyLogo"
        placeholder="Upload the company's image/ logo"
        type="file"
        />
    </Section>
  )
}
