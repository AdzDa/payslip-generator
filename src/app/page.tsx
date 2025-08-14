// 'use client'

// import { useState, useEffect, useRef } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { navigation } from "@/data/navigation";
// import details from "@/data/detail";
// import settings from "@/data/settings";
// import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
// import PdfPayslip from '@/components/pdf/PdfPayslip';
// // import type { Details, Credit, Deduction } from "@/components/pdf/PdfPayslip";
// import type { Details, Credit, Deduction } from "@/components/pdf/dataType";

// // Fix: parameter type is typeof details, return type is Details
// function normalizeDetails(detailsObj: typeof details): Details {
//   return {
//     company: {
//       ...detailsObj.company,
//       logoImage: detailsObj.company.logoImage, // explicitly preserve logoImage
//     },
//     employee: { ...detailsObj.employee },
//     payroll: { ...detailsObj.payroll },
//     salary: {
//       ...detailsObj.salary,
//       basicSalary: Number(detailsObj.salary.basicSalary) || 0,
//       overtime: {
//         ...detailsObj.salary.overtime,
//         amount: Number(detailsObj.salary.overtime.amount) || 0,
//         totalHours: Number(detailsObj.salary.overtime.totalHours) || 0,
//       },
//       additionalCredits: detailsObj.salary.additionalCredits.map(
//         (c: { title: string; amount: string }) => ({
//           ...c,
//           amount: Number(c.amount) || 0,
//         })
//       ),
//       deductions: detailsObj.salary.deductions.map(
//         (d: { title: string; amount: string }) => ({
//           ...d,
//           amount: Number(d.amount) || 0,
//         })
//       ),
//     },
//     advanced: {
//       employerContributions: {
//         employerSocso: Number(detailsObj.advanced.employerContributions.employerSocso) || 0,
//         employerEpf: Number(detailsObj.advanced.employerContributions.employerEpf) || 0,
//         employerEis: Number(detailsObj.advanced.employerContributions.employerEis) || 0,
//       }
//     }
//   };
// }

// export default function Home() {
//   const [activeSection, setActiveSection] = useState(navigation.sections[0].id);
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
//   const [formData, setFormData] = useState<typeof details>(details);
//   const [settingData, setSettingData] = useState(settings);

//   const handleResetAll = () => {
//     setFormData(details);
//     setSettingData(settings);
//   };

//   // Preview PDF in new tab
//   const handlePreview = async () => {
//     const normalized = normalizeDetails(formData); 
//     console.log("Normalized data sent to PDF:", normalized);
//     const blob = await pdf(<PdfPayslip details={normalized} />).toBlob();
//     const url = URL.createObjectURL(blob);
//     window.open(url, '_blank');
//     console.log(formData.company.logoImage);
//   };

//   const scrollToSection = (id: string) => {
//     document.getElementById(id)?.scrollIntoView({
//       behavior: "smooth",
//       block: "start"
//     });
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setActiveSection(entry.target.id);
//           }
//         });
//       },
//       {
//         root: scrollContainerRef.current, // only track inside the form container
//         threshold: 0.6
//       }
//     );

//     navigation.sections.forEach((section) => {
//       const el = document.getElementById(section.id);
//       if (el) observer.observe(el);
//     });

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div className="flex flex-col h-screen">
//       <Header />
//       <div className="flex flex-1 px-[50px] pt-[20px] pb-[80px] space-x-[20px] overflow-hidden">
//         {/* Scrollable Form */}
//         <div
//           ref={scrollContainerRef}
//           className="flex-1 overflow-y-auto pr-4 space-y-[20px] scrollbar-hidden"
//         >
//           <p className="font-bold">Payroll Generator</p>
//            {/* Form Sections */}
//           <form className="w-full">
//             {navigation.sections.map(({ id, component: Component }) => (
//               <section key={id} id={id} className="w-full flex flex-col pb-[20px]">
//                 <Component formData={formData} setFormData={setFormData} settingData={settingData} setSettingData={setSettingData} />
//               </section>
//             ))}
//           </form>
//         </div>

//         {/* Fixed/Sticky Nav */}
//         <nav className=" min-w-[215px] flex flex-col sticky top-[20px] self-start">
//           {navigation.sections.map((section) => (
//             <button
//               key={section.id}
//               onClick={() => scrollToSection(section.id)}
//               className={`transition-colors text-left h-[45px] px-[10px] !border-l-2 border-secondary ${
//                 activeSection === section.id
//                   ? "text-blue !border-l-4 !border-blue-500"
//                   : "text-secondary !border-l-2 border-secondary"
//               }`}
//             >
//               {section.label}
//             </button>
//           ))}
//         </nav>
//       </div>
//       <Footer handleResetAll={handleResetAll} handlePreview={handlePreview} />
//     </div>
//   );
// }


'use client'

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { navigation } from "@/data/navigation";
import details from "@/data/detail";
import settings from "@/data/settings";
import { pdf } from '@react-pdf/renderer';
import PdfPayslip from '@/components/pdf/PdfPayslip';
import type { Details } from "@/components/pdf/dataType";

// ---- Added: shared props type for all section components ----
type SectionComponentProps = {
  formData: typeof details;
  setFormData: React.Dispatch<React.SetStateAction<typeof details>>;
  settingData: typeof settings;
  setSettingData: React.Dispatch<React.SetStateAction<typeof settings>>;
};

// Fix: parameter type is typeof details, return type is Details
function normalizeDetails(detailsObj: typeof details): Details {
  return {
    company: {
      ...detailsObj.company,
      logoImage: detailsObj.company.logoImage,
    },
    employee: { ...detailsObj.employee },
    payroll: { ...detailsObj.payroll },
    salary: {
      ...detailsObj.salary,
      basicSalary: Number(detailsObj.salary.basicSalary) || 0,
      overtime: {
        ...detailsObj.salary.overtime,
        amount: Number(detailsObj.salary.overtime.amount) || 0,
        totalHours: Number(detailsObj.salary.overtime.totalHours) || 0,
      },
      additionalCredits: detailsObj.salary.additionalCredits.map(
        (c) => ({
          ...c,
          amount: Number(c.amount) || 0,
        })
      ),
      deductions: detailsObj.salary.deductions.map(
        (d) => ({
          ...d,
          amount: Number(d.amount) || 0,
        })
      ),
    },
    advanced: {
      employerContributions: {
        employerSocso: Number(detailsObj.advanced.employerContributions.employerSocso) || 0,
        employerEpf: Number(detailsObj.advanced.employerContributions.employerEpf) || 0,
        employerEis: Number(detailsObj.advanced.employerContributions.employerEis) || 0,
      }
    }
  };
}

export default function Home() {
  const [activeSection, setActiveSection] = useState(navigation.sections[0].id);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<typeof details>(details);
  const [settingData, setSettingData] = useState(settings);

  const handleResetAll = () => {
    setFormData(details);
    setSettingData(settings);
  };

  const handlePreview = async () => {
    const normalized = normalizeDetails(formData);
    const blob = await pdf(<PdfPayslip details={normalized} />).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.6
      }
    );

    navigation.sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 px-[50px] pt-[20px] pb-[80px] space-x-[20px] overflow-hidden">
        {/* Scrollable Form */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto pr-4 space-y-[20px] scrollbar-hidden"
        >
          <p className="font-bold">Payroll Generator</p>
          <form className="w-full">
            {navigation.sections.map(({ id, component }) => {
              const Component = component as React.ComponentType<SectionComponentProps>;
              return (
                <section key={id} id={id} className="w-full flex flex-col pb-[20px]">
                  <Component
                    formData={formData}
                    setFormData={setFormData}
                    settingData={settingData}
                    setSettingData={setSettingData}
                  />
                </section>
              );
            })}
          </form>
        </div>

        {/* Fixed/Sticky Nav */}
        <nav className="min-w-[215px] flex flex-col sticky top-[20px] self-start">
          {navigation.sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`transition-colors text-left h-[45px] px-[10px] !border-l-2 border-secondary ${
                activeSection === section.id
                  ? "text-blue !border-l-4 !border-blue-500"
                  : "text-secondary !border-l-2 border-secondary"
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>
      <Footer handleResetAll={handleResetAll} handlePreview={handlePreview} />
    </div>
  );
}
