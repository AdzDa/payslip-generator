import React from 'react'
import { useState } from 'react';
import settings from '@/data/settings';
import Section from '@/components/Section';
import FormField from '../FormField';

type Props = {
  settingData: any;
  setSettingData: (data: any) => void;
};

export default function Settings({ settingData, setSettingData }: Props) {
  // const [settingData, setSettingData] = useState(settings);

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
