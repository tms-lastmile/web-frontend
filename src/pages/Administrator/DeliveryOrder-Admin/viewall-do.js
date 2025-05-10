import { SelectColumnFilter } from '../../../components/BaseTable';
import React, { useEffect, useState } from 'react';
import { Loading } from '../../../components/Loading';
import axiosAuthInstance from '../../../utils/axios-auth-instance';
import { BaseTablePagination } from '../../../components/BaseTablePagination';

function ViewAllDoAdmin() {
  const [dataDO, setDataDO] = useState([])
  const [showLoading, setShowLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
  
  const fetchDO = async (page, limit) => {
    
    setShowLoading(true)

    try {
      const response = await axiosAuthInstance.get(`administrator/delivery-orders?skip=${(page - 1) * limit}&limit=${limit}`)
      console.log(response)
      const { deliveryOrders, total } = response.data.data
      setDataDO(deliveryOrders)
      console.log(response.data.data)
      setTotalPages(Math.ceil(total / limit))
      setShowLoading(false)
    } catch (error) {
      console.error('Error fetching do:', error)
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
        Header: 'No',
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
        filter: 'includes',
        width: 'min-w-[150px]'
      },
      {
        Header: 'Alamat Tujuan',
        accessor: 'loc_dest.address',
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
        id: 'id',
        Header: 'Action'
      }
    ],
    []
  )
  return (
    <>
      <Loading visibility={showLoading} />
      <div className={`px-[50px] py-[30px] ${showLoading ? 'hidden' : 'visible'}`}>
        <BaseTablePagination columns={columns} data={dataDO} currentPage={currentPage} totalPages={totalPages} pageSize={pageSize} onPageChange={handlePageChange} onPageSizeChange={handlePageSizeChange} loading={showLoading} judul={'Daftar Delivery Order'} />
      </div>
    </>
  )
}

export default ViewAllDoAdmin