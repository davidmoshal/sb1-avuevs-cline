import React, { useState } from 'react';

interface SystemSetting {
  id: string;
  name: string;
  value: string;
  type: 'text' | 'number' | 'boolean';
}

const SystemSettings: React.FC = () => {
  const [settings, setSettings] = useState<SystemSetting[]>([
    { id: '1', name: 'Default Mock Mode', value: 'false', type: 'boolean' },
    { id: '2', name: 'Max Users Per Host', value: '100', type: 'number' },
    { id: '3', name: 'Default Credit Limit', value: '10000', type: 'number' },
    { id: '4', name: 'System Announcement', value: '', type: 'text' },
  ]);

  const updateSetting = (id: string, newValue: string) => {
    setSettings(settings.map(setting => 
      setting.id === id ? { ...setting, value: newValue } : setting
    ));
  };

  const renderSettingInput = (setting: SystemSetting) => {
    switch (setting.type) {
      case 'boolean':
        return (
          <select
            value={setting.value}
            onChange={(e) => updateSetting(setting.id, e.target.value)}
            className="p-2 border rounded"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        );
      case 'number':
        return (
          <input
            type="number"
            value={setting.value}
            onChange={(e) => updateSetting(setting.id, e.target.value)}
            className="p-2 border rounded"
          />
        );
      default:
        return (
          <input
            type="text"
            value={setting.value}
            onChange={(e) => updateSetting(setting.id, e.target.value)}
            className="p-2 border rounded w-full"
          />
        );
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">System Settings</h2>
      <ul className="space-y-4">
        {settings.map(setting => (
          <li key={setting.id} className="flex flex-col space-y-2">
            <label htmlFor={setting.id} className="font-medium">{setting.name}</label>
            {renderSettingInput(setting)}
          </li>
        ))}
      </ul>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Save Settings
      </button>
    </div>
  );
};

export default SystemSettings;