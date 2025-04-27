import BaseTable, { SelectColumnFilter, StatusPill, ActionButtons } from '../../components/BaseTable'
import React, { useEffect, useState } from 'react'
import { Loading } from '../../components/Loading'
import axiosAuthInstance from '../../utils/axios-auth-instance'
import jwtDecode from 'jwt-decode'
import { BaseTablePagination, ActionButtonsPagination } from '../../components/BaseTablePagination'

function ViewAllCustomer() {
  const [dataCostumer, setDataCostumer] = useState([])
  const [showLoading, setShowLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
  const fetchCostumer = async (page, limit) => {
    setShowLoading(true)
    try {
      const response = await axiosAuthInstance.get(`/locations?skip=${(page - 1) * limit}&limit=${limit}&is_dc=false`)
      const { locations, total } = response.data.data
      setDataCostumer(locations)
      setTotalPages(Math.ceil(total / limit))
      setShowLoading(false)
    } catch (error) {
      console.error('Error fetching trucks:', error)
      setShowLoading(false)
    }
  }
  useEffect(() => {
    fetchCostumer(currentPage, pageSize)
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
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
      {
        Header: 'Costumer',
        accessor: 'customer.name',
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
      {
        Header: 'DC',
        accessor: 'dc.name',
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
      {
        Header: 'Alamat',
        accessor: 'address',
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
      {
        Header: 'Provinsi',
        accessor: 'provinsi',
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
      {
        Header: 'Kabupaten/Kota',
        accessor: 'kabupaten_kota',
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
      {
        Header: 'Kecamatan',
        accessor: 'kecamatan',
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
      {
        Header: 'Desa/Kelurahan',
        accessor: 'desa_kelurahan',
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
      {
        Header: 'Action',
        accessor: (row) => ['Customer', row.id], // Make sure this returns the expected structure
        Cell: ({ value }) => <ActionButtonsPagination value={value} /> // Pass value directly to the component
      }
    ],
    []
  )
  return (
    <>
      <Loading visibility={showLoading} />
      <div className={`px-[50px] py-[30px] ${showLoading ? 'hidden' : 'visible'}`}>
        <BaseTablePagination columns={columns} data={dataCostumer} currentPage={currentPage} totalPages={totalPages} pageSize={pageSize} onPageChange={handlePageChange} onPageSizeChange={handlePageSizeChange} loading={showLoading} judul={'Daftar Customer'} />
      </div>
    </>
  )
}

export default ViewAllCustomer
