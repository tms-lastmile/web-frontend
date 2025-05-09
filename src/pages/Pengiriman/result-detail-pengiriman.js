import React, { useState, useEffect } from "react";
import ListHasilPengiriman from "./list-card-pengiriman";
import PengirimanDetail from "./detail-pengiriman";
import axiosAuthInstance from "../../utils/axios-auth-instance";
import { useParams, useNavigate } from "react-router-dom";

function ResultDetailPengiriman() {
  const [selectedPengiriman, setSelectedPengiriman] = useState(null);
  const [pengirimanList, setPengirimanList] = useState([]);
  const { idShipment: pengirimanId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!pengirimanId) return;

    axiosAuthInstance
      .get(`/shipment/${pengirimanId}`)
      .then((res) => {
        const fetched = res.data.data;
        const status = fetched.isSaved ? "saved" : "belum_diproses";

        const processed = { ...fetched, status };
        setPengirimanList([processed]);
        setSelectedPengiriman(processed);
      })
      .catch((err) => console.error("Gagal fetch data pengiriman:", err));
  }, [pengirimanId]);

  console.log(pengirimanList)
  const updatePengirimanList = (shipmentNum, newStatus) => {
    setPengirimanList((list) =>
      list.map((it) =>
        it.shipment_num === shipmentNum
          ? { ...it, status: newStatus, isSaved: true }
          : it
      )
    );

    setSelectedPengiriman((prev) =>
      prev?.shipment_num === shipmentNum
        ? { ...prev, status: newStatus, isSaved: true }
        : prev
    );
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      <div className="flex flex-col w-full">
        <div className="px-[50px] pt-6">
          <button className="text-primary" onClick={() => navigate(-1)}>← Kembali</button>
        </div>
        <div className="px-[50px] pt-6 flex">
          <ListHasilPengiriman
            onSelect={setSelectedPengiriman}
            pengirimanList={pengirimanList}
          />
          <PengirimanDetail
            pengiriman={selectedPengiriman}
            updatePengirimanList={updatePengirimanList}
          />
        </div>
      </div>
    </div>
  );
}

export default ResultDetailPengiriman;