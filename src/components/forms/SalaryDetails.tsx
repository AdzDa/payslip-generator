import React from 'react'
import Section from '../Section'
import FormField from '../FormField'
import { payrollDetails } from '@/data/payrollDetails'
import { useState } from 'react'
import details from '@/data/detail'
import { CircleMinus } from 'lucide-react';

export default function SalaryDetails() {
 const [formData, setFormData] = useState(details);
 const [isOn, setIsOn] = useState(false);
 
  type Row = { id: string; title: string; amount: string };
  const [credits, setCredits] = useState<Row[]>([]);
  const [deductions, setDeductions] = useState<Row[]>([]);

   // Additional Credits
   // Add new credit
   const handleAdd = () => {
     setCredits(prev => [
       ...prev,
       { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, title: '', amount: '' },
     ]);
   };
 
   // Remove by id
   const handleRemove = (id: string) => {
     setCredits(prev => prev.filter(item => item.id !== id));
   };
 
   // Change by id
   const handleChange = (id: string, field: 'title' | 'amount', value: string) => {
     setCredits(prev =>
       prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
     );
   };
 
   // Deductions
   // Add new empty row
   const handleAddDeduction = () => {
     setDeductions(prev => [
       ...prev,
       { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, title: '', amount: '' },
     ]);
   };
 
   // Remove a row by id
   const handleDeductionRemove = (id: string) => {
     setDeductions(prev => prev.filter(item => item.id !== id));
   };
 
   // Handle input change
   const handleDeductionChange = (id: string, field: string, value: string) => {
     const newDeductions = [...deductions];
     const index = newDeductions.findIndex(item => item.id === id);
     if (index !== -1) {
       (newDeductions[index] as any)[field] = value;
       setDeductions(newDeductions);
     }
   };

  return (
    <Section 
        title="Salary Details"
    >
        <div className="flex space-x-[12px]">
        <FormField
            className="w-[150px]"
            name="currency"
            label="Currency"
            placeholder="Select currency"
            type="select"
            options={payrollDetails.currency}
            value={formData.salary.currency}
            onChange={(e) =>
            setFormData({
                ...formData,
                salary: {
                ...formData.salary,
                currency: e.target.value,
                },
            })
            }
        />

        <FormField
            name="basicSalary"
            label="Basic Salary"
            placeholder="Enter Basic Salary"
            type="text"
            value={formData.salary.basicSalary}
            onChange={(e) =>
            setFormData({
                ...formData,
                salary: {
                ...formData.salary,
                basicSalary: e.target.value,
                },
            })
            }
        />
        </div>

        {/* Overtime */}
        <div className="flex flex-col space-y-[8px]">
        <div className="flex space-x-[8px]">
            <p className="w-full">Overtime</p>

            <div className="flex space-x-[10px]">
            <p className="text-secondary">Add</p>
                    
            {/* Toggle */}
            <button
                type="button"
                onClick={() => setIsOn(!isOn)}
                className={`w-[40px] h-[25px] flex items-center rounded-full p-[2px] transition-colors duration-300 ${
                isOn ? "bg-blue-500" : "bg-gray-300"
                }`}
            >
                <div
                className={`bg-white w-[18px] h-[18px] rounded-full shadow-md transform transition-transform duration-300 ${
                    isOn ? "translate-x-5" : "translate-x-0"
                }`}
                />
            </button>
            </div>
        </div>

        {/*Shown only if toggle is turned on  */}
        {isOn && (
        <div className="flex space-x-[12px]">
            <FormField
            label="Rate Type"
            name="overtimeRate"
            placeholder=""
            type="select"
            options={payrollDetails.overtimeRateType}
            onChange={(e) =>
                setFormData({
                ...formData,
                salary: {
                    ...formData.salary,
                    overtime: {
                    ...formData.salary.overtime,
                    rateType: e.target.value,
                    },
                },
                })
            }
            />

            <FormField
            label="Total Hours"
            name="totalHours"
            placeholder="Enter Total Hours"
            type="text"
            onChange={(e) =>
                setFormData({
                ...formData,
                salary: {
                    ...formData.salary,
                    overtime: {
                    ...formData.salary.overtime,
                    totalHours: e.target.value,
                    },
                },
                })
            }
            />

            <FormField
            label="Amount"
            name="amount"
            placeholder="Enter Amount"
            type="text"
            onChange={(e) =>
                setFormData({
                ...formData,
                salary: {
                    ...formData.salary,
                    overtime: {
                    ...formData.salary.overtime,
                    amount: e.target.value,
                    },
                },
                })
            }
            />
        </div>
        )}
        </div>

        {/* Additional Credits */}
        <div className="flex flex-col space-y-[8px]">
        <p>
            Additional Credit(s)
        </p>

        {credits.length === 0 ? (
            // First div (shown only if no credits)
            <div className="py-[12px] flex justify-center items-center border-[2px] border-grey-700 !border-dashed">
            <button className="!w-[158px] btn-secondary" type="button" onClick={handleAdd}>
                + Add Credit
            </button>
            </div>
        ) : (
            // Second div (shown if there are credits)
            <div className="w-full space-y-[8px]">
            <div className="bg-grey rounded-[4.5px] px-[16px] py-[8px] grid grid-cols-[725px_1fr_30px] gap-2 font-semibold mb-2">
                <p>Title</p>
                <p>Amount</p>
            </div>

            {credits.map((credit, index) => (
                <div
                key={index}
                className="grid grid-cols-[725px_1fr_30px] gap-2 mb-2 items-center"
                >
                <input
                    type="text"
                    placeholder="Categories (eg.: Travel Allowance)"
                    value={credit.title}
                    onChange={(e) => handleChange(credit.id, "title", e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={credit.amount}
                    onChange={(e) => handleChange(credit.id, "amount", e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2"
                />
                <button
                    type="button"
                    onClick={() => handleRemove(credit.id)}
                    className="text-red-500 text-lg"
                >
                    <CircleMinus />
                </button>
                </div>
            ))}

            <button
                type="button"
                onClick={handleAdd}
                className="w-full border-2 border-dashed border-blue-400 text-blue py-2 rounded"
            >
                + Add Credit
            </button>
            </div>
        )}
        </div>

        {/* Deductions*/}
        <div className="flex flex-col space-y-[8px]">
        <p>
            Deduction(s)
        </p>

        {deductions.length === 0 ? (
            // First div (shown only if no deductions)
            <div className="py-[12px] flex justify-center items-center border-[2px] border-grey-700 !border-dashed">
            <button className="btn-secondary" type="button" onClick={handleAddDeduction}>
                + Add Deduction
            </button>
            </div>
        ) : (
            // Second div (shown if there are credits)
            <div className="w-full space-y-[8px]">
            <div className="bg-grey rounded-[4.5px] px-[16px] py-[8px] grid grid-cols-[725px_1fr_30px] gap-2 font-semibold mb-2">
                <p>Title</p>
                <p>Amount</p>
            </div>

            {deductions.map((deduction, index) => (
                <div
                key={index}
                className="grid grid-cols-[725px_1fr_30px] gap-2 mb-2 items-center"
                >
                <input
                    type="text"
                    placeholder="Categories (eg.: Zakat, Early salary)"
                    value={deduction.title}
                    onChange={(e) => handleDeductionChange(deduction.id, "title", e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={deduction.amount}
                    onChange={(e) => handleDeductionChange(deduction.id, "amount", e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2"
                />
                <button
                    type="button"
                    onClick={() => handleDeductionRemove(deduction.id)}
                    className="text-red-500 text-lg"
                >
                    <CircleMinus />
                </button>
                </div>
            ))}

            <button
                type="button"
                onClick={handleAddDeduction}
                className="w-full border-2 border-dashed border-blue-400 text-blue py-2 rounded"
            >
                + Add Deduction
            </button>
            </div>
        )}
        </div>
    </Section>
  )
}
