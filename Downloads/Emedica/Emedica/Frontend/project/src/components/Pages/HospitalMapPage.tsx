import React, { useState } from 'react';

// Mock hospital data
const initialHospitals = [
  { id: 1, name: 'Apollo Hospital, Delhi', lat: 28.5672, lng: 77.2100 },
  { id: 2, name: 'Fortis Hospital, Mumbai', lat: 19.1076, lng: 72.8376 },
  { id: 3, name: 'AIIMS, New Delhi', lat: 28.5672, lng: 77.2100 },
  { id: 4, name: 'CMC, Vellore', lat: 12.9260, lng: 79.1356 },
  { id: 5, name: 'Narayana Health, Bangalore', lat: 12.9100, lng: 77.6100 },
];

const HospitalMapPage: React.FC = () => {
  const [hospitals, setHospitals] = useState(initialHospitals);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [newHospital, setNewHospital] = useState({ name: '', lat: '', lng: '' });
  const [selectedHospital, setSelectedHospital] = useState<number | null>(null);

  // Replace with your actual Google Maps Embed API key
  const GOOGLE_MAPS_API_KEY = 'YOUR_ACTUAL_API_KEY_HERE';

  // Use the selected hospital or default to India
  const selected = hospitals.find(h => h.id === selectedHospital) || { lat: 20.5937, lng: 78.9629, name: 'India' };
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${selected.lat},${selected.lng}&maptype=${mapType}`;

  const handleAddHospital = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHospital.name || !newHospital.lat || !newHospital.lng) return;
    setHospitals([
      ...hospitals,
      {
        id: Date.now(),
        name: newHospital.name,
        lat: parseFloat(newHospital.lat),
        lng: parseFloat(newHospital.lng),
      },
    ]);
    setNewHospital({ name: '', lat: '', lng: '' });
  };

  const handleRemoveHospital = (id: number) => {
    setHospitals(hospitals.filter(h => h.id !== id));
    if (selectedHospital === id) setSelectedHospital(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Connected Hospitals Map</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Map Section */}
        <div className="md:col-span-2 bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <div className="w-full h-96 rounded-lg overflow-hidden mb-4 border">
            {/* Google Map iframe (replace with real API in production) */}
            <iframe
              title="India Hospitals Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={mapSrc}
            ></iframe>
          </div>
          <div className="flex gap-4 items-center mb-2">
            <label className="font-medium">Map Type:</label>
            <select
              value={mapType}
              onChange={e => setMapType(e.target.value as 'roadmap' | 'satellite')}
              className="border rounded-lg px-3 py-1"
            >
              <option value="roadmap">Roadmap</option>
              <option value="satellite">Satellite</option>
            </select>
          </div>
          <div className="text-sm text-gray-500">Markers for hospitals are shown on the map (demo only).</div>
        </div>
        {/* Settings Section */}
        <div className="bg-white rounded-xl shadow p-4 space-y-6">
          <h2 className="text-xl font-semibold mb-2">Manage Connected Hospitals</h2>
          <form onSubmit={handleAddHospital} className="space-y-2">
            <input
              type="text"
              placeholder="Hospital Name"
              value={newHospital.name}
              onChange={e => setNewHospital({ ...newHospital, name: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
            <div className="flex flex-col gap-2">
              <input
                type="number"
                step="any"
                placeholder="Latitude"
                value={newHospital.lat}
                onChange={e => setNewHospital({ ...newHospital, lat: e.target.value })}
                className="border rounded-lg px-3 py-2"
                required
              />
              <input
                type="number"
                step="any"
                placeholder="Longitude"
                value={newHospital.lng}
                onChange={e => setNewHospital({ ...newHospital, lng: e.target.value })}
                className="border rounded-lg px-3 py-2"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Add Hospital
            </button>
          </form>
          <div>
            <h3 className="font-medium mb-2">Connected Hospitals</h3>
            <ul className="space-y-2">
              {hospitals.map(hospital => (
                <li key={hospital.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                  <div>
                    <span className="font-semibold">{hospital.name}</span>
                    <span className="ml-2 text-xs text-gray-500">({hospital.lat}, {hospital.lng})</span>
                  </div>
                  <button
                    onClick={() => handleRemoveHospital(hospital.id)}
                    className="text-red-600 hover:text-red-800 text-xs font-medium ml-2"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalMapPage;
