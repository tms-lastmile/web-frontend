import './App.css';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

import { default as Sidebar } from './components/Sidebar';
import SidebarAdmin from './components/SidebarAdmin';

import { SystemDesign, Login, Dashboard, ViewAllLokasi, ViewAllTruksAdmin, NotFound, ViewAllTrucks, DashboardAdmin, 
    ViewAllLokasiAdmin, ViewAllUserAdmin, ViewAllRoleAdmin, ViewLokasiAdmin, ViewAllProdukAdmin, 
    ViewAllProduk, ViewLocation, ViewAllProductLineAdmin, ViewAllProductLine } from './pages';

import PrivateRoute from './utils/private-route';

import ViewAllCostumerAdmin from './pages/Administrator/Costumer-Admin/viewall-customer';
import CustomerDetailPage from './pages/Administrator/Costumer-Admin/detail-costumer';
import { DODetailPageAdmin, ViewAllDOAdmin } from './pages/Administrator/DeliveryOrder-Admin';
import { ViewAllDo, DODetailPage } from './pages/DeliveryOrder';
import ViewAllShipment from './pages/Administrator/Shipment-Admin/viewall-shipment';
import DoSelectAutomateAdmin from './pages/Administrator/Shipment-Admin/otomatisasi-select';
import { ViewShipments } from './pages/Shipment';
import { ResultBuatPengiriman, ResultDetailPengiriman } from './pages/Pengiriman';
import DoSelectManualAdmin from './pages/Administrator/Shipment-Admin/manual-select';
import DoSelectAutomate from './pages/Shipment/automate-select';
import DoSelectManual from './pages/Shipment/manual-select';
import VisualizationShipment from './pages/Pengiriman/visualisasi-pengiriman';

function ProtectedRoutes() {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const tokenFromSession = sessionStorage.getItem('token');
    if (!tokenFromSession) {
      navigate('/login');
      return;
    }
  
    try {
      const decodedToken = jwtDecode(tokenFromSession);
      setUserRole(decodedToken.role.name);
    } catch (error) {
      console.error('Invalid token:', error);
      navigate('/login');
    }
  }, [navigate]);
  
  useEffect(() => {
    if (userRole && location.pathname === '/') {
      navigate(userRole === 'Super' ? '/administrator/dashboard' : '/dashboard');
    }
  }, [userRole, location.pathname, navigate]);  

  return (
    <Routes>
      <Route path="/system-design" element={<SystemDesign />} />
      <Route path="/login" element={<Login />} />

      {userRole === 'Super' ? (
        <>
          {/* Admin Routes */}
          <Route path="/administrator/dashboard" element={<PrivateRoute><SidebarAdmin beranda={true} title="Beranda"><DashboardAdmin /></SidebarAdmin></PrivateRoute>} />
          <Route path="/administrator/user" element={<PrivateRoute><SidebarAdmin user={true} title="Daftar User"><ViewAllUserAdmin /></SidebarAdmin></PrivateRoute>} />
          <Route path="/administrator/role" element={<PrivateRoute><SidebarAdmin role={true} title="Daftar Role"><ViewAllRoleAdmin /></SidebarAdmin></PrivateRoute>} />
          <Route path="/administrator/truk" element={<PrivateRoute><SidebarAdmin truk={true} title="Daftar Truk"><ViewAllTruksAdmin /></SidebarAdmin></PrivateRoute>} />
          <Route path="/administrator/lokasi" element={<PrivateRoute><SidebarAdmin lokasi={true} title="Daftar Lokasi"><ViewAllLokasiAdmin /></SidebarAdmin></PrivateRoute>} />
          <Route path="/administrator/product" element={<PrivateRoute><SidebarAdmin product={true} title="Daftar Product"><ViewAllProdukAdmin /></SidebarAdmin></PrivateRoute>} />
          <Route path="/administrator/lokasi/:lokasiId" element={<PrivateRoute><SidebarAdmin lokasi={true} title="Detail Lokasi"><ViewLokasiAdmin /></SidebarAdmin></PrivateRoute>} />
          <Route path="/administrator/customer" element={<PrivateRoute><SidebarAdmin customer={true} title="Daftar Customer"><ViewAllCostumerAdmin /></SidebarAdmin></PrivateRoute>} />
          <Route path="/administrator/customer/:customerId" element={<PrivateRoute><SidebarAdmin customer={true} title="Detail Customer"><CustomerDetailPage /></SidebarAdmin></PrivateRoute>} />
          <Route path="/administrator/delivery-order" element={<PrivateRoute><SidebarAdmin deliveryOrder={true} title="Daftar DO"><ViewAllDOAdmin /></SidebarAdmin></PrivateRoute>} />
          <Route path="/administrator/delivery-order/:doId" element={<PrivateRoute><SidebarAdmin deliveryOrder={true} title="Detail DO"><DODetailPageAdmin /></SidebarAdmin></PrivateRoute>} />
          <Route path="/administrator/pengiriman" element={<PrivateRoute><SidebarAdmin shipment={true} title="Pengiriman"><ViewAllShipment /></SidebarAdmin></PrivateRoute>} />
          <Route path="/administrator/product-line" element={<PrivateRoute><SidebarAdmin productLine={true} title="Daftar Product Line"><ViewAllProductLineAdmin /></SidebarAdmin></PrivateRoute>} />
          <Route path="/administrator/pengiriman/select-do-automate" element={<PrivateRoute><SidebarAdmin shipment={true} title="Otomatisasi Pengiriman"><DoSelectAutomateAdmin /></SidebarAdmin></PrivateRoute>} />
          <Route path="/administrator/pengiriman/select-do-manual" element={<PrivateRoute><SidebarAdmin shipment={true} title="Pengiriman Manual"><DoSelectManualAdmin /></SidebarAdmin></PrivateRoute>} />
        </>
      ) : (
        <>
          {/* User Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Sidebar beranda={true} title="Beranda"><Dashboard /></Sidebar></PrivateRoute>} />
          <Route path="/truk" element={<PrivateRoute><Sidebar truk={true} title="Daftar Truk"><ViewAllTrucks /></Sidebar></PrivateRoute>} />
          <Route path="/lokasi" element={<PrivateRoute><Sidebar lokasi={true} title="Daftar Lokasi"><ViewAllLokasi /></Sidebar></PrivateRoute>} />
          <Route path="/lokasi/:lokasiId" element={<PrivateRoute><Sidebar lokasi={true} title="Detail Lokasi"><ViewLocation /></Sidebar></PrivateRoute>} />
          <Route path="/delivery-order" element={<PrivateRoute><Sidebar deliveryOrder={true} title="Delivery Order"><ViewAllDo /></Sidebar></PrivateRoute>} />
          <Route path="/delivery-order/:doId" element={<PrivateRoute><Sidebar deliveryOrder={true} title="Delivery Order"><DODetailPage /></Sidebar></PrivateRoute>} />
          <Route path="/product" element={<PrivateRoute><Sidebar product={true} title="Daftar Product"><ViewAllProduk /></Sidebar></PrivateRoute>} />
          <Route path="/pengiriman" element={<PrivateRoute><Sidebar pengiriman={true} title="Pengiriman"><ViewShipments /></Sidebar></PrivateRoute>} />
          <Route path="/pengiriman/otomatisasi" element={<PrivateRoute><Sidebar pengiriman={true} title="Otomatisasi Pengiriman"><ResultBuatPengiriman /></Sidebar></PrivateRoute>} />
          <Route path="/pengiriman/:idShipment" element={<PrivateRoute><Sidebar pengiriman={true} title="Detail Pengiriman"><ResultDetailPengiriman /></Sidebar></PrivateRoute>} />
          <Route path="/pengiriman/select-do-automate" element={<PrivateRoute><Sidebar shipment={true} title="Otomatisasi Pengiriman"><DoSelectAutomate /></Sidebar></PrivateRoute>} />
          <Route path="/pengiriman/select-do-manual" element={<PrivateRoute><Sidebar shipment={true} title="Pengiriman Manual"><DoSelectManual /></Sidebar></PrivateRoute>} />
          <Route path="/product-line" element={<PrivateRoute><Sidebar productLine={true} title="Daftar Product Line"><ViewAllProductLine /></Sidebar></PrivateRoute>} />
          
          {/* visualisasi pengiriman */}
          <Route path="/pengiriman/visualisasi" element={<PrivateRoute><Sidebar pengiriman={true} title="Visualisasi Pengiriman"><VisualizationShipment /></Sidebar></PrivateRoute>} /> 
          
          <Route path="/pengiriman/visualisasi/:idShipment" element={<PrivateRoute><Sidebar pengiriman={true} title="Visualisasi Pengiriman"><VisualizationShipment /></Sidebar></PrivateRoute>} /> 
          {/* <Route path="/pengiriman/visualisasi" element={<PrivateRoute><VisualizationShipment /></PrivateRoute>} />  */}
        </>
      )}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default ProtectedRoutes;