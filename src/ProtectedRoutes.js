import logo from './logo.svg'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { default as Sidebar } from './components/Sidebar'
import { SystemDesign, Login, Dashboard, ViewAllLokasi, ViewAllTruksAdmin, CreateLokasi, UpdateLokasi, CreateTruk, UpdateTruk, ViewAllPengiriman, ViewAllOrder, UpdateOrder, CreatePengirimanSelectOrder, CreatePengirimanVisualisasiCluster, ViewPengiriman, NotFound, CreateUser, UpdateUser, ViewAllRole, CreateRole, UpdateRole, ViewAllTrucks, ViewLocations, ViewTrucks, DashboardAdmin, ViewAllLokasiAdmin, ViewAllUserAdmin, ViewAllRoleAdmin, ViewLokasiAdmin, ViewAllProdukAdmin, ViewProdukAdmin, ViewAllProduk, ViewProduk, ViewLocation, ViewAllProductLineAdmin, ViewAllProductLine, ViewAllProductLineByDO, ViewAllCustomer } from './pages'
import PrivateRoute from './utils/private-route'
import { useUser } from './utils/userContext'
import jwtDecode from 'jwt-decode'
import { useLocation } from 'react-router-dom'
import SidebarAdmin from './components/SidebarAdmin'
import ViewAllCostumerAdmin from './pages/Administrator/Costumer-Admin/viewall-customer'
import CustomerDetailPage from './pages/Administrator/Costumer-Admin/detail-costumer'
import { DODetailPageAdmin, ViewAllDOAdmin } from './pages/Administrator/DeliveryOrder-Admin'
import { ViewAllDo, DODetailPage } from './pages/DeliveryOrder'
import ViewAllShipment from './pages/Administrator/Shipment-Admin/viewall-shipment'
import DoSelectAutomateAdmin from './pages/Administrator/Shipment-Admin/otomatisasi-select'
import { ViewShipments, } from './pages/Shipment'
import { ResultBuatPengiriman, ResultDetailPengiriman } from './pages/Pengiriman'
import DoSelectManualAdmin from './pages/Administrator/Shipment-Admin/manual-select'
import DoSelectAutomate from './pages/Shipment/automate-select'
import DoSelectManual from './pages/Shipment/manual-select'
import DoSelectPriority from './pages/Shipment/priority-select'

function ProtectedRoutes() {
  // const [userRole, setUserRole] = useState(localStorage.getItem("userRole"))

  // const shipmentAllow = localStorage.getItem("shipment");
  // const orderAllow = localStorage.getItem("order");
  // const trukAllow = localStorage.getItem("truk");
  // const locationAllow = localStorage.getItem("location");
  // const userAllow = localStorage.getItem("user");
  const [shipmentAllow, setShipmentAllow] = useState(false)
  const [doAllow, setDoAllow] = useState(false)
  const [truckAllow, setTruckAllow] = useState(false)
  const [locationAllow, setLocationAllow] = useState(false)
  const [userAllow, setUserAllow] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const tokenFromSession = sessionStorage.getItem('token')
    if (!tokenFromSession) {
      navigate('/login') // Redirect to login if token is missing
    } else {
      try {
        const decodedToken = jwtDecode(tokenFromSession) // Decode only if token exists
        setUserRole(decodedToken.role.name)
        setShipmentAllow(decodedToken.role.is_allowed_shipment)
        setDoAllow(decodedToken.role.is_allowed_do)
        setTruckAllow(decodedToken.role.is_allowed_truck)
        setLocationAllow(decodedToken.role.is_allowed_location)
        setUserAllow(decodedToken.role.is_allowed_user)

        const pathName = location.pathname
        if (pathName === '/') {
          navigate(decodedToken.role.name === 'Super' ? '/administrator/dashboard' : '/dashboard')
        }
      } catch (error) {
        console.error('Invalid token:', error)
        navigate('/login') // Redirect to login if decoding fails
      }
    }
  }, [navigate])

  return (
    // <Routes>
    // <Route path="/system-design"
    //     element={
    //         <SystemDesign />
    //     }
    // />
    // </Routes>
    <Routes>
      <Route path="/system-design" element={<SystemDesign />} />
      <Route path="/login" element={<Login />} />

      {userRole === 'Super' ? (
        <>
          <Route
            path="/administrator/user"
            element={
              <PrivateRoute>
                <SidebarAdmin user={true} title={`Daftar User`}>
                  <ViewAllUserAdmin />
                </SidebarAdmin>
              </PrivateRoute>
            }
          />
          <Route
            path="/administrator/role"
            element={
              <PrivateRoute>
                <SidebarAdmin role={true} title={`Daftar Role`}>
                  <ViewAllRoleAdmin />
                </SidebarAdmin>
              </PrivateRoute>
            }
          />
          <Route
            path="/administrator/truk"
            element={
              <PrivateRoute>
                <SidebarAdmin truk={true} title={`Daftar Truk`}>
                  <ViewAllTruksAdmin />
                </SidebarAdmin>
              </PrivateRoute>
            }
          />
          <Route
            path="/administrator/dashboard"
            element={
              <PrivateRoute>
                <SidebarAdmin beranda={true} title={`Beranda`}>
                  <DashboardAdmin />
                </SidebarAdmin>
              </PrivateRoute>
            }
          />
          <Route
            path="/administrator/lokasi"
            element={
              <PrivateRoute>
                <SidebarAdmin lokasi={true} title={`Daftar Lokasi`}>
                  <ViewAllLokasiAdmin />
                </SidebarAdmin>
              </PrivateRoute>
            }
          />
          <Route
            path="/administrator/product"
            element={
              <PrivateRoute>
                <SidebarAdmin product={true} title={`Daftar Product`}>
                  <ViewAllProdukAdmin />
                </SidebarAdmin>
              </PrivateRoute>
            }
          />
          <Route
            path="/administrator/product/:productId"
            element={
              <PrivateRoute>
                <SidebarAdmin product={true} title={`Detail Produk`}>
                  <ViewProdukAdmin />
                </SidebarAdmin>
              </PrivateRoute>
            }
          />
          <Route
            path="/administrator/lokasi/:lokasiId"
            element={
              <PrivateRoute>
                <SidebarAdmin lokasi={true} title="Detail Lokasi">
                  <ViewLokasiAdmin />
                </SidebarAdmin>
              </PrivateRoute>
            }
          />
          <Route
            path="/administrator/customer"
            element={
              <PrivateRoute>
                <SidebarAdmin customer={true} title={`Daftar Customer`}>
                  <ViewAllCostumerAdmin />
                </SidebarAdmin>
              </PrivateRoute>
            }
          />
          <Route
            path="/administrator/customer/:customerId"
            element={
              <PrivateRoute>
                <SidebarAdmin customer={true} title={`Detail Customer`}>
                  <CustomerDetailPage />
                </SidebarAdmin>
              </PrivateRoute>
            }
          />
          <Route
            path="/administrator/delivery-order"
            element={
              <PrivateRoute>
                <SidebarAdmin deliveryOrder={true} title={`Daftar DO`}>
                  <ViewAllDOAdmin />
                </SidebarAdmin>
              </PrivateRoute>
            }
          />
          <Route
            path="/administrator/delivery-order/:doId"
            element={
              <PrivateRoute>
                <SidebarAdmin deliveryOrder={true} title={`Detail DO`}>
                  <DODetailPageAdmin />
                </SidebarAdmin>
              </PrivateRoute>
            }
          />
          <Route
            path="/administrator/pengiriman"
            element={
              <PrivateRoute>
                <SidebarAdmin shipment={true} title={`Pengiriman`}>
                  <ViewAllShipment />
                </SidebarAdmin>
              </PrivateRoute>
            }
          />
          <Route
            path="/administrator/product-line"
            element={
              <PrivateRoute>
                <SidebarAdmin productLine={true} title={`Daftar Product Line`}>
                  <ViewAllProductLineAdmin />
                </SidebarAdmin>
              </PrivateRoute>
            }
          />
          <Route
            path="/administrator/pengiriman/select-do-automate"
            element={
              <PrivateRoute>
                <SidebarAdmin shipment={true} title={`Otomatisasi Pengiriman`}>
                  <DoSelectAutomateAdmin />
                </SidebarAdmin>
              </PrivateRoute>
            }
          />
          <Route
            path="/administrator/pengiriman/select-do-manual"
            element={
              <PrivateRoute>
                <SidebarAdmin shipment={true} title={`Pengiriman Manual`}>
                  <DoSelectManualAdmin />
                </SidebarAdmin>
              </PrivateRoute>
            }
          />
        </>
      ) : (
        <>
          <Route
            path="/truk"
            element={
              <PrivateRoute>
                <Sidebar truk={true} title={`Daftar Truk`}>
                  <ViewAllTrucks />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Sidebar beranda={true} title={`Beranda`}>
                  <Dashboard />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            path="/lokasi"
            element={
              <PrivateRoute>
                <Sidebar lokasi={true} title={`Daftar Lokasi`}>
                  <ViewAllLokasi />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            path="/lokasi/:lokasiId"
            element={
              <PrivateRoute>
                <Sidebar lokasi={true} title={`Detail Lokasi`}>
                  <ViewLocation />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            path="/delivery-order"
            element={
              <PrivateRoute>
                <Sidebar deliveryOrder={true} title={`Delivery Order`}>
                  <ViewAllDo />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            path="/delivery-order/:doId"
            element={
              <PrivateRoute>
                <Sidebar deliveryOrder={true} title={`Delivery Order`}>
                  <DODetailPage />
                </Sidebar>
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/product-line/:doId/do"
            element={
              <PrivateRoute>
                <Sidebar productLine={true} title={`Daftar Product Line`}>
                  <ViewAllProductLineByDO />
                </Sidebar>
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/product"
            element={
              <PrivateRoute>
                <Sidebar product={true} title={`Daftar Product`}>
                  <ViewAllProduk />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            path="/product/:productId"
            element={
              <PrivateRoute>
                <Sidebar product={true} title={`Detail Product`}>
                  <ViewProduk />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            path="/pengiriman"
            element={
              <PrivateRoute>
                <Sidebar pengiriman={true} title={`Pengiriman`}>
                  <ViewShipments />
                </Sidebar>
              </PrivateRoute>
            }
          />
          
          <Route
            path="/pengiriman/otomatisasi"
            element={
              <PrivateRoute>
                <Sidebar pengiriman={true} title={`Otomatisasi Pengiriman`}>
                  <ResultBuatPengiriman />
                </Sidebar>
              </PrivateRoute>
            }
          /> 

          <Route
            path="/pengiriman/:idShipment"
            element={
              <PrivateRoute>
                <Sidebar pengiriman={true} title={`Detail Pengiriman`}>
                  <ResultDetailPengiriman />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            path="/pengiriman/detail-test"
            element={
              <PrivateRoute>
                <Sidebar pengiriman={true} title={`Detail Pengiriman`}>
                  <ResultDetailPengiriman />
                </Sidebar>
              </PrivateRoute>
            }
          />

                  
          <Route
            path="/pengiriman/select-do-automate"
            element={
              <PrivateRoute>
                <Sidebar shipment={true} title={`Otomatisasi Pengiriman`}>
                  <DoSelectAutomate />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            path="/pengiriman/select-do-manual"
            element={
              <PrivateRoute>
                <Sidebar shipment={true} title={`Pengiriman Manual`}>
                  <DoSelectManual />
                </Sidebar>
              </PrivateRoute>
            }
          />
           <Route
            path="/pengiriman/select-do-priority"
            element={
              <PrivateRoute>
                <Sidebar shipment={true} title={`Pengiriman Manual`}>
                  <DoSelectPriority />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            path="/product-line"
            element={
              <PrivateRoute>
                <Sidebar productLine={true} title={`Daftar Product Line`}>
                  <ViewAllProductLine />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            path="/customer"
            element={
              <PrivateRoute>
                <Sidebar customer={true} title={`Daftar Customer`}>
                  <ViewAllCustomer />
                </Sidebar>
              </PrivateRoute>
            }
          />
        </>
      )}

      {/* {truckAllow === true ? (
        userRole === 'Super' ? (
          <>
            <Route
              path="administrator/truk"
              element={
                <PrivateRoute>
                  <Sidebar truk={true} title={`Daftar Truk`}>
                    <ViewAllTruk />
                  </Sidebar>
                </PrivateRoute>
              }
            />
            <Route
              path="/truk/create"
              element={
                <PrivateRoute>
                  <Sidebar truk={true} title={`Buat Truk`} breadcrumb={`Daftar Truk`} baseRoute={'/truk'}>
                    <CreateTruk />
                  </Sidebar>
                </PrivateRoute>
              }
            />
            <Route
              path="/truk/update"
              element={
                <PrivateRoute>
                  <Sidebar truk={true} title={`Ubah Data Truk`} breadcrumb={`Daftar Truk`} baseRoute={'/truk'}>
                    <UpdateTruk />
                  </Sidebar>
                </PrivateRoute>
              }
            />
          </>
        ) : (
          <>
            <Route
              path="/truk"
              element={
                <PrivateRoute>
                  <Sidebar truk={true} title={`Daftar Truk`}>
                    <ViewTrucks />
                  </Sidebar>
                </PrivateRoute>
              }
            />
          </>
        )
      ) : userRole ? (
        <Route path="*" element={<NotFound />} />
      ) : (
        <Route path="*" element={<Login />} />
      )} */}

      {/* {shipmentAllow === true ? (
        <>
          <Route
            path="/pengiriman"
            element={
              <PrivateRoute>
                <Sidebar pengiriman={true} title={`Daftar Pengiriman`}>
                  <ViewAllPengiriman />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            path="/pengiriman/select-order"
            element={
              <PrivateRoute>
                <Sidebar pengiriman={true} title={`Buat Pengiriman`} breadcrumb={`Daftar Pengiriman`} baseRoute={'/pengiriman'}>
                  <CreatePengirimanSelectOrder />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            path="/pengiriman/visualise-cluster"
            element={
              <PrivateRoute>
                <Sidebar pengiriman={true} title={`Buat Pengiriman`} breadcrumb={`Daftar Pengiriman`} baseRoute={'/pengiriman'}>
                  <CreatePengirimanVisualisasiCluster />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            path="/pengiriman/detail"
            element={
              <PrivateRoute>
                <Sidebar pengiriman={true} title={`Detail Pengiriman`} breadcrumb={`Daftar Pengiriman`} baseRoute={'/pengiriman'}>
                  <ViewPengiriman />
                </Sidebar>
              </PrivateRoute>
            }
          />
        </>
      ) : userRole ? (
        <Route path="*" element={<NotFound />} />
      ) : (
        <Route path="*" element={<Login />} />
      )} */}

      {/* {locationAllow === true ? (
        userRole === 'Super' ? (
          <>
            <Route
              path="/lokasi"
              element={
                <PrivateRoute>
                  <Sidebar lokasi={true} title={`Daftar Lokasi`}>
                    <ViewAllLokasi />
                  </Sidebar>
                </PrivateRoute>
              }
            />
            <Route
              path="/lokasi/create"
              element={
                <PrivateRoute>
                  <Sidebar lokasi={true} title={`Buat Lokasi`} breadcrumb={`Daftar Lokasi`} baseRoute={'/lokasi'}>
                    <CreateLokasi />
                  </Sidebar>
                </PrivateRoute>
              }
            />
            <Route
              path="/lokasi/update"
              element={
                <PrivateRoute>
                  <Sidebar lokasi={true} title={`Ubah Data Lokasi`} breadcrumb={`Daftar Lokasi`} baseRoute={'/lokasi'}>
                    <UpdateLokasi />
                  </Sidebar>
                </PrivateRoute>
              }
            />
          </>
        ) : (
          <>
            <Route
              path="/lokasi"
              element={
                <PrivateRoute>
                  <Sidebar lokasi={true} title={`Daftar Lokasi`}>
                    <ViewLocations />
                  </Sidebar>
                </PrivateRoute>
              }
            />
          </>
        )
      ) : userRole ? (
        <Route path="*" element={<NotFound />} />
      ) : (
        <Route path="*" element={<Login />} />
      )} */}

      {/* {doAllow === true ? (
        <>
          <Route
            path="/order"
            element={
              <PrivateRoute>
                <Sidebar order={true} title={`Daftar Order`}>
                  <ViewAllOrder />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            path="/order/update"
            element={
              <PrivateRoute>
                <Sidebar order={true} title={`Ubah Data Order`} breadcrumb={`Daftar Order`} baseRoute={'/order'}>
                  <UpdateOrder />
                </Sidebar>
              </PrivateRoute>
            }
          />
        </>
      ) : userRole ? (
        <Route path="*" element={<NotFound />} />
      ) : (
        <Route path="*" element={<Login />} />
      )} */}

      {/* {userAllow === true ? (
        <>
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <Sidebar user={true} title={`Daftar User`}>
                  <ViewAllUser />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            path="/user/create"
            element={
              <PrivateRoute>
                <Sidebar user={true} title={`Daftar User`}>
                  <CreateUser />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            path="/user/update"
            element={
              <PrivateRoute>
                <Sidebar user={true} title={`Daftar User`}>
                  <UpdateUser />
                </Sidebar>
              </PrivateRoute>
            }
          />
        </>
      ) : userRole ? (
        <Route path="*" element={<NotFound />} />
      ) : (
        <Route path="*" element={<Login />} />
      )}

      {userAllow === true ? (
        <>
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <Sidebar user={true} title={`Daftar User`}>
                  <ViewAllUser />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            path="/user/create"
            element={
              <PrivateRoute>
                <Sidebar user={true} title={`Daftar User`}>
                  <CreateUser />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            path="/user/update"
            element={
              <PrivateRoute>
                <Sidebar user={true} title={`Daftar User`}>
                  <UpdateUser />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            path="/role"
            element={
              <PrivateRoute>
                <Sidebar role={true} title={`Daftar Role`}>
                  <ViewAllRole />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            path="/role/create"
            element={
              <PrivateRoute>
                <Sidebar role={true} title={`Daftar Role`}>
                  <CreateRole />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            path="/role/update"
            element={
              <PrivateRoute>
                <Sidebar role={true} title={`Daftar Role`}>
                  <UpdateRole />
                </Sidebar>
              </PrivateRoute>
            }
          />
        </>
      ) : userRole ? (
        <Route path="*" element={<NotFound />} />
      ) : (
        <Route path="*" element={<Login />} />
      )} */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default ProtectedRoutes
