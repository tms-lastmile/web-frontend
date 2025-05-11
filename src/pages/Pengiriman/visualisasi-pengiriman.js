import React, { useState, useEffect } from "react";
import ThreeScene from '../../components/ThreeScene';
import { useParams, useNavigate } from "react-router-dom";
import axiosAuthInstance from "../../utils/axios-auth-instance";

function VisualizationShipment() {
  const { idShipment: pengirimanId } = useParams();
  const [layoutData, setLayoutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pengirimanId) return;

    setLoading(true);
    axiosAuthInstance
      .post(`/box-layouting/${pengirimanId}`)
      .then((res) => {
        setLayoutData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch box layout data:", err);
        setError(err);
        setLoading(false);
      });
  }, [pengirimanId]);

  if (loading) return <div>Loading visualization...</div>;
  if (error) return <div>Error loading visualization: {error.message}</div>;
  if (!layoutData) return <div>No layout data available</div>;

  return (
    <div>
      <ThreeScene apiResponse={layoutData} />
    </div>
  );
}

export default VisualizationShipment;