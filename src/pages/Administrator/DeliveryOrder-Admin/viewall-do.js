import BaseTable, { SelectColumnFilter, StatusPill, ActionButtons } from '../../../components/BaseTable'
import React, { useEffect, useState } from 'react'
import { Loading } from '../../../components/Loading'
import axiosAuthInstance from '../../../utils/axios-auth-instance'
import jwtDecode from 'jwt-decode'
import { BaseTablePagination, ActionButtonsPagination } from '../../../components/BaseTablePagination'

function ViewAllDOAdmin() {
    const [dataDO, setDataDO] = useState([])
    const [showLoading, setShowLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [totalPages, setTotalPages] = useState(0)
    const fetchDO = async (page, limit) => {
        setShowLoading(true)
        try{
            const response = await axiosAuthInstance.get(`/administrator/delivery-order?skip=${(page - 1) * limit}&limit=${limit}`)            
            const { deliveryOrders ,total } = response.data.data
            console.log(response)
            setDataDO(deliveryOrders)
            setTotalPages(Math.ceil(total / limit))
            setShowLoading(false)
        } catch (error) {
            console.error('Error fetching trucks:', error)
            setShowLoading(false)
        }
    }
    useEffect(() => {
        fetchDO(currentPage, pageSize)   
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
    const columns = React.useMemo(
        () => [
        {
            Header: 'ID',
            accessor: 'id',
            Filter: SelectColumnFilter,
            filter: 'includes'
        },
        {
            Header: 'Nomor DO',
            accessor: 'delivery_order_num',        
            Filter: SelectColumnFilter,
            filter: 'includes'
        },
        {
            Header: 'Target ETA',
            accessor: 'eta_target',        
            Filter: SelectColumnFilter,
            filter: 'includes'
        },
        {
            Header: 'Alamat Asal',
            accessor: 'loc_ori.address',        
            Filter: SelectColumnFilter,
            filter: 'includes'
        },
        {
            Header: 'Alamat Tujuan',
            accessor: 'loc_dest.address',        
            Filter: SelectColumnFilter,
            filter: 'includes'
        },

        {
            Header: 'Volume',
            accessor: 'volume',        
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
            Header: 'Action',
            accessor: (row) => [ 'DO', row.id ], // Make sure this returns the expected structure
            Cell: ({ value }) => <ActionButtonsPagination value={value} /> // Pass value directly to the component
        }
        ],
        []
    )
  return (
    <>
      <Loading visibility={showLoading} />
      <div className={`px-[50px] py-[30px] ${showLoading ? 'hidden' : 'visible'}`}>
        <BaseTablePagination columns={columns} data={dataDO} currentPage={currentPage} totalPages={totalPages} pageSize={pageSize} onPageChange={handlePageChange} onPageSizeChange={handlePageSizeChange} loading={showLoading} judul={'Delivery Order'}/>
      </div>
    </>
  )
}

export default ViewAllDOAdmin
