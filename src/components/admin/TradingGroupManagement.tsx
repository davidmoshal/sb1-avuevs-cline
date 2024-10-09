import React, { useState } from 'react';
import { useAppStore } from '../../store/store';
import { AuctionTradingGroup, FinancialLimits, GroupedCounterpartyLimits } from '../../types';

const TradingGroupManagement: React.FC = () => {
  const { tradingGroups, updateTradingGroupLimits, createTradingGroup, deleteTradingGroup } = useAppStore();
  const [selectedGroup, setSelectedGroup] = useState<AuctionTradingGroup | null>(null);
  const [limits, setLimits] = useState<FinancialLimits>({
    maxExposure: 0,
    maxTotalQuantity: 0,
    counterpartyLimits: {},
  });
  const [newGroupName, setNewGroupName] = useState('');

  const handleGroupSelect = (group: AuctionTradingGroup) => {
    setSelectedGroup(group);
    setLimits(group.limits);
  };

  const handleLimitChange = (field: keyof FinancialLimits, value: number | GroupedCounterpartyLimits) => {
    setLimits(prev => ({ ...prev, [field]: value }));
  };

  const handleCounterpartyLimitChange = (groupId: string, value: number) => {
    setLimits(prev => ({
      ...prev,
      counterpartyLimits: {
        ...prev.counterpartyLimits,
        [groupId]: value,
      },
    }));
  };

  const handleSubmit = () => {
    if (selectedGroup) {
      updateTradingGroupLimits(selectedGroup.id, limits);
    }
  };

  const handleCreateGroup = () => {
    if (newGroupName) {
      createTradingGroup(newGroupName, {
        maxExposure: 0,
        maxTotalQuantity: 0,
        counterpartyLimits: {},
      });
      setNewGroupName('');
    }
  };

  const handleDeleteGroup = () => {
    if (selectedGroup) {
      deleteTradingGroup(selectedGroup.id);
      setSelectedGroup(null);
      setLimits({
        maxExposure: 0,
        maxTotalQuantity: 0,
        counterpartyLimits: {},
      });
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Trading Group Management</h2>
      <div className="mb-4">
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => {
            const selectedGroup = tradingGroups.find(g => g.id === e.target.value);
            if (selectedGroup) {
              handleGroupSelect(selectedGroup);
            }
          }}
          value={selectedGroup?.id || ''}
        >
          <option value="">Select a trading group</option>
          {tradingGroups.map(group => (
            <option key={group.id} value={group.id}>{group.name}</option>
          ))}
        </select>
      </div>
      {selectedGroup && (
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Max Exposure</label>
            <input
              type="number"
              value={limits.maxExposure}
              onChange={(e) => handleLimitChange('maxExposure', parseFloat(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Max Total Quantity</label>
            <input
              type="number"
              value={limits.maxTotalQuantity}
              onChange={(e) => handleLimitChange('maxTotalQuantity', parseFloat(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Counterparty Limits</h3>
            {Object.entries(limits.counterpartyLimits).map(([groupId, limit]) => (
              <div key={groupId} className="flex items-center space-x-2 mb-2">
                <span>{groupId}</span>
                <input
                  type="number"
                  value={limit}
                  onChange={(e) => handleCounterpartyLimitChange(groupId, parseFloat(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update Limits
            </button>
            <button
              onClick={handleDeleteGroup}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete Group
            </button>
          </div>
        </div>
      )}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Create New Trading Group</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="New group name"
            className="flex-grow p-2 border rounded"
          />
          <button
            onClick={handleCreateGroup}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradingGroupManagement;
