import BaseTable, { SelectColumnFilter, StatusPill, ActionButtons } from '../../../components/BaseTable'
import React, { useEffect, useState } from 'react'
import { Loading } from '../../../components/Loading'
import axiosAuthInstance from '../../../utils/axios-auth-instance'
import jwtDecode from 'jwt-decode'
import { BaseTablePagination, ActionButtonsPagination } from '../../../components/BaseTablePagination'
import { useNavigate } from 'react-router-dom'

function ViewAllShipment() {
    const [dataShipment, setDataShipment] = useState([])
    const [showLoading, setShowLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [totalPages, setTotalPages] = useState(0)
    const fetchShipment = async (page, limit) => {
        setShowLoading(true)
        try{
            const response = await axiosAuthInstance.get(`/administrator/shipments?skip=${(page - 1) * limit}&limit=${limit}`)            
            const { shipment, total } = response.data.data
            setDataShipment(shipment)
            setTotalPages(Math.ceil(total / limit))
            setShowLoading(false)
        } catch (error) {
            console.error('Error fetching trucks:', error)
            setShowLoading(false)
        }
    }
    useEffect(() => {
        fetchShipment(currentPage, pageSize)   
    }, [currentPage, pageSize])
    
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page)
        }
    }
    const handlePageSizeChange = (size) => {
        setPageSize(size)
        setCurrentPage(1) 
    }

    const navigate = useNavigate();

    const navigateSelectDOAutomate = () => {
        navigate('/administrator/pengiriman/select-do-automate')
    }

    const navigateSelectDOManual = () => {
        navigate('/administrator/pengiriman/select-do-manual')
    }
    const columns = React.useMemo(
        () => [
          {
            Header: 'Checkbox',
            accessor: (row) => [ 'Shipment', row.id ], // Make sure this returns the expected structure
            Cell: ({ value }) => <ActionButtonsPagination value={value} /> // Pass value directly to the component
        },
        {
            Header: 'ID Pengiriman',
            accessor: 'shipment_num',
            Filter: SelectColumnFilter,
            filter: 'includes'
        },
        {
            Header: 'Tanggal Pengiriman',
            accessor: 'atd',        
            Filter: SelectColumnFilter,
            filter: 'includes'
        },
        {
          Header: 'Truk',
          accessor: 'truck.plate_number',        
          Filter: SelectColumnFilter,
          filter: 'includes'
        },
        {
          Header: 'Jumlah DO',
          accessor: '_count.ShipmentDO',        
          Filter: SelectColumnFilter,
          filter: 'includes'
        },
        {
          Header: 'Status',
          accessor: 'status',        
          Filter: SelectColumnFilter,
          filter: 'includes'
        },
        {
          Header: 'ETA',
          accessor: 'eta',        
          Filter: SelectColumnFilter,
          filter: 'includes'
        },
        ],
        []
    )
    return (
      <>
          <Loading visibility={showLoading} />
          <div className={`px-[50px] py-[30px] ${showLoading ? 'hidden' : 'visible'}`}>
              {/* Buttons */}
              {/* <div className="flex space-x-4 mb-4">
                <button
                    className="flex items-center px-4 py-2 bg-primary-hover text-white rounded-lg shadow-md"
                    onClick={navigateSelectDOAutomate}
                >
                    <span className="mr-2 text-lg">+</span> Otomatisasi Pengiriman
                </button>
                <button className="flex items-center px-4 py-2 bg-white text-primary-hover border border-primary-hover rounded-lg shadow-md"
                    onClick={navigateSelectDOManual}
>
                    <span className="mr-2 text-lg">+</span> Atur Pengiriman Manual
                </button>
            </div> */}

              
              {/* Table */}
              <BaseTablePagination
                  columns={columns}
                  data={dataShipment}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  onPageChange={handlePageChange}
                  onPageSizeChange={handlePageSizeChange}
                  loading={showLoading}
                  judul={'Riwayat Pengiriman'}
              />
          </div>
      </>
  );
  

}

export default ViewAllShipment
