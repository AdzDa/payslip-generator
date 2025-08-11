// components/FormField.tsx
'use client';

// import { Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Calendar22 } from './Calendar';
// import { Calendar } from "@/components/ui/calendar"; // ✅ shadcn calendar
// import { DayPicker } from 'react-day-picker';
// import 'react-day-picker/dist/style.css';

export default function FormField({
  label,
  name,
  placeholder,
  type,
  value,
  onChange,
  options = [],
  className = '',
}: {
  label: string;
  name: string;
  placeholder?: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'color' | 'month' | 'file';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  options?: { value: string; label: string }[];
  className?: string;
}) {
  const [showModal, setShowModal] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'others') {
      setShowModal(true);
    } else {
      onChange?.(e);
    }
  };

  const saveCustomValue = () => {
    if (customValue.trim() !== '') {
      // Call onChange with custom value
      const fakeEvent = {
        target: { name, value: customValue },
      } as unknown as React.ChangeEvent<HTMLSelectElement>;
      onChange?.(fakeEvent);
    }
    setShowModal(false);
    setCustomValue('');
  };

  return (
    <div className="w-full flex flex-col space-y-[8px]">
      {label && 
      <label 
      htmlFor={name}>
          {label}
      </label>}

      {type === 'text' && (
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="px-4 py-2 border border-primary rounded-lg"
        />
      )}

      {type === 'date' && (
        // <Calendar22/>
        <input
          id={name}
          name={name}
          type="date"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="px-4 py-2 border border-primary rounded-lg"
        />
      )}

      {type === 'textarea' && (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="px-4 py-2 border border-primary rounded-lg"
        />
      )}

      {type === 'select' && (
        <>
          <select
            id={name}
            name={name}
            value={value}
            onChange={handleSelectChange}
            className={`${className} appearance-none px-4 pr-10 py-2 border border-primary rounded-lg bg-white hover:bg-gray-50`}
          >
            <option value="">Select an option</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            <option value="others">Other...</option>
          </select>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
                <h2 className="text-lg font-semibold mb-4">Enter Value</h2>
                <input
                  type="text"
                  value={customValue}
                  onChange={(e) => setCustomValue(e.target.value)}
                  placeholder="Type here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveCustomValue}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {type === 'color' && (
      <div className="flex space-x-[8px] items-center">
        <div
          className="border w-[45px] h-[45px] border-secondary rounded-lg"
          style={{ backgroundColor: value }} //fill from input
        ></div>

        <input
          id={name}
          name={name}
          type="color"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="h-[45px] px-4 py-2 border border-primary rounded-lg"
        />
      </div>
      )}

      {type === 'month' && (
        <input
          id={name}
          name={name}
          type="month"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="px-4 py-2 border border-primary rounded-lg"
        />
      )}

      {type === 'file' && (
        <input 
          id={name}
          name={name}
          placeholder={placeholder}
          type="file" 
          accept="image/*" 
          onChange={onChange} 
          className="px-4 py-2 border border-primary rounded-lg"
        />
      )}
    </div>
  );
}
