import React, { useState } from 'react';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const PengirimanCard = ({ data, onClick, isActive }) => {

  const convertMinutesToHoursAndMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);
    return `${hours} Jam ${remainingMinutes} Menit`;
  };

  return (
    <div
      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 mb-0 md:mb-4 m-5 ${isActive ? 'bg-primary shadow-lg' : 'bg-neutral-20 hover:shadow-lg'}`}
      onClick={() => onClick(data.index)} // Use index
    >
      <div className="flex items-center mb-3">
        {data.status === 'saved' ? (
          <div className="rounded-full p-1">
            <FiCheckCircle className="w-6 h-6 text-success" />
          </div>
        ) : (
          <div className="rounded-full p-1">
            <FiArrowRight className="w-6 h-6 rounded-full border-2 text-neutral-400 border-gray-400" />
          </div>
        )}
        <span className={`text-sm md:font-medium ${isActive ? 'text-white' : data.status === 'saved' ? 'text-success' : 'text-neutral-400'}`}>
          {data.status === 'saved' ? 'Tersimpan' : 'Belum Diproses'}
        </span>
      </div>

      <div className="mb-3">
        <p className={`text-sm ${isActive ? 'text-neutral-200' : 'text-neutral-500'}`}>
          No Pengiriman
        </p>
        <p className={`text-xl md:font-bold ${isActive ? 'text-white' : 'text-primary-border'}`}>
          {data.shipment_num}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-3">
          <p className={`text-sm ${isActive ? 'text-neutral-200' : 'text-neutral-500'}`}>
            Truk
          </p>
          <p className={`text-base ${isActive ? 'text-white' : 'text-primary-border'}`}>
            {data.truck.plate_number}
          </p>
        </div>
        
        <div className="mb-3">
          <p className={`text-sm ${isActive ? 'text-neutral-200' : 'text-neutral-500'}`}>
            Total Jarak Tempuh
          </p>
          <p className={`text-base ${isActive ? 'text-white' : 'text-primary-border'}`}>
            {Math.round(data.total_dist / 1000)} Km
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className={`text-sm ${isActive ? 'text-neutral-200' : 'text-neutral-500'}`}>
            Total Waktu Tempuh
          </p>
          <p className={`text-base ${isActive ? 'text-white' : 'text-primary-border'}`}>
            {convertMinutesToHoursAndMinutes(data.total_time)}
          </p>
        </div>
      </div>
    </div>
  );
};

const ListHasilPengiriman = ({ onSelect, pengirimanList = [] }) => { // Default to empty array
  const [activeCardId, setActiveCardId] = useState(null);

  const handleCardClick = (index) => {
    setActiveCardId(index); // Use index
    const selectedData = pengirimanList[index];
    onSelect(selectedData); // Pass the selected data
  };

  return (
    <div className="bg-gray-50 rounded-b-lg w-1/3">
      <div className="space-y-4">
        {pengirimanList.map((item, index) => (
          <PengirimanCard
            key={index} // Use index as key
            data={{ ...item, index }} // Pass index along with item data
            onClick={handleCardClick}
            isActive={activeCardId === index}
          />
        ))}
        
        {pengirimanList.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Tidak ada data pengiriman</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListHasilPengiriman;
