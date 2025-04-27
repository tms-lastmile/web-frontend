import React, { useState, useEffect } from "react";
import ListHasilPengiriman from "./list-card-pengiriman";
import PengirimanDetail from "./detail-pengiriman";
import { Loading } from '../../components/Loading';
import { useNavigate } from 'react-router-dom'

function ResultDetailPengiriman() {
  const [selectedPengiriman, setSelectedPengiriman] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pengirimanList, setPengirimanList] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem('responseData');
    if (storedData) {
      const response = JSON.parse(storedData);
      if (response.success) {
        console.log(response)
        setPengirimanList(response.data.shipments);
      }
    }
  }, []);

  console.log(pengirimanList);

  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      <div className="flex flex-col w-full">
        <div className="px-[50px] pt-6">
          <button className="text-primary mr-2" onClick={() => window.history.back()}>← Kembali</button>
        </div>
        
        <div className="px-[50px] pt-6 flex flex-col">
          <div className="bg-white rounded-b-lg flex gap-4">
            <ListHasilPengiriman 
              onSelect={setSelectedPengiriman} 
              pengirimanList={pengirimanList} 
            />
            <PengirimanDetail  
              pengiriman={selectedPengiriman} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultDetailPengiriman;
