import React, { useState } from 'react';

interface AuctionFormData {
  name: string;
  startingPrice: string;
  minIncrement: string;
  duration: string;
  startTime: string;
}

const AuctionCreation: React.FC = () => {
  const [formData, setFormData] = useState<AuctionFormData>({
    name: '',
    startingPrice: '',
    minIncrement: '',
    duration: '',
    startTime: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert string values to numbers for numeric fields
    const submissionData = {
      ...formData,
      startingPrice: parseFloat(formData.startingPrice) || 0,
      minIncrement: parseFloat(formData.minIncrement) || 0,
      duration: parseInt(formData.duration) || 0,
    };
    // TODO: Implement auction creation logic
    console.log('Creating auction:', submissionData);
    // Reset form after submission
    setFormData({
      name: '',
      startingPrice: '',
      minIncrement: '',
      duration: '',
      startTime: '',
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Auction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Auction Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="startingPrice" className="block mb-1">Starting Price</label>
          <input
            type="number"
            id="startingPrice"
            name="startingPrice"
            value={formData.startingPrice}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="minIncrement" className="block mb-1">Minimum Bid Increment</label>
          <input
            type="number"
            id="minIncrement"
            name="minIncrement"
            value={formData.minIncrement}
            onChange={handleInputChange}
            min="0.01"
            step="0.01"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="duration" className="block mb-1">Duration (minutes)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            min="1"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="startTime" className="block mb-1">Start Time</label>
          <input
            type="datetime-local"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Create Auction
        </button>
      </form>
    </div>
  );
};

export default AuctionCreation;