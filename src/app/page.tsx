'use client'

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { navigation } from "@/data/navigation";
import details from "@/data/detail";
import settings from "@/data/settings";

export default function Home() {
  const [activeSection, setActiveSection] = useState(navigation.sections[0].id);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState(details);
  const [settingData, setSettingData] = useState(settings);

  const handleResetAll = () => {
    setFormData(details);
    setSettingData(settings);
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
        root: scrollContainerRef.current, // only track inside the form container
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
          className="flex-1 overflow-y-auto pr-4 scrollbar-hidden"
        >
          <form className="w-full">
            {navigation.sections.map(({ id, component: Component }) => (
              <section key={id} id={id} className="w-full flex flex-col pb-[20px]">
                <Component formData={formData} setFormData={setFormData} settingData={settingData} setSettingData={setSettingData} />
              </section>
            ))}
          </form>
        </div>

        {/* Fixed/Sticky Nav */}
        <nav className="min-w-[215px] flex flex-col space-y-4 sticky top-[20px] self-start">
          {navigation.sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`transition-colors px-2 py-1 rounded ${
                activeSection === section.id ? "bg-blue-500 text-white" : "bg-gray-400"
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>
      <Footer handleResetAll={handleResetAll} />
    </div>
  );
}