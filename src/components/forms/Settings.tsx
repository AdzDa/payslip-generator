import React from 'react'
import { useState } from 'react';
import settings from '@/data/settings';
import Section from '@/components/Section';
import FormField from '../FormField';

export default function Settings() {
  const [settingData, setSettingData] = useState(settings);

  return (
    <Section 
        title="Settings"
    >
        <FormField
        label="Theme Color"
        name="themeColor"
        type="color"
        placeholder="Select theme color"
        value={settingData.themeColor}
        onChange={(e) =>
            setSettingData({
            ...settingData,
            themeColor: e.target.value,
            })
        }
        />
    </Section> 
  )
}
