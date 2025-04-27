import BaseTable, { SelectColumnFilter, ActionButtons } from '../../../components/BaseTable'
import React, { useEffect, useState } from 'react'
import { Loading } from '../../../components/Loading'
import axiosAuthInstance from '../../../utils/axios-auth-instance'
import jwtDecode from 'jwt-decode'
import { BaseTablePagination } from '../../../components/BaseTablePagination'

function ViewAllProductLineAdmin() {
  const [dataProductLine, setDataProductLine] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchProductLines = async (page, limit) => {
    setLoading(true)
    try {
      const response = await axiosAuthInstance.get(`/administrator/product-line?skip=${(page - 1) * limit}&limit=${limit}`)
      const { productLines, total } = response.data.data
      setDataProductLine(productLines)
      setTotalPages(Math.ceil(total / limit))
      setLoading(false)
    } catch (error) {
      console.error('Error fetching locations:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductLines(currentPage, pageSize)
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
        Header: 'DO',
        accessor: 'delivery_order.delivery_order_num',
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
      {
        Header: 'Produk',
        accessor: 'product.name',
        Filter: SelectColumnFilter,
        filter: 'includes',
        width: 'min-w-[250px]'
      },
      {
        Header: 'DC',
        accessor: 'delivery_order.loc_ori.name',
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
      {
        Header: 'Customer',
        accessor: 'delivery_order.loc_dest.name',
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
      {
        Header: 'Volume',
        accessor: 'volume',
        Filter: SelectColumnFilter,
        filter: 'includes',
        is_unit_available: true
      },
      {
        Header: 'Berat',
        accessor: 'weight',
        Filter: SelectColumnFilter,
        filter: 'includes',
        is_unit_available: true
      },
      {
        Header: 'Kuantitas',
        accessor: 'quantity',
        Filter: SelectColumnFilter,
        filter: 'includes',
        is_unit_available: true
      },
      {
        Header: 'Price',
        accessor: 'price',
        Filter: SelectColumnFilter,
        filter: 'includes',
        is_unit_available: true
      },
      {
        id: 'id',
        Header: 'Action'
      }
    ],
    []
  )

  return (
    <div className="h-full min-h-full justify-center">
      <Loading visibility={loading} />
      <div className={` ${loading ? 'hidden' : 'visible px-10 pt-10'} `}>
        <BaseTablePagination columns={columns} data={dataProductLine} currentPage={currentPage} totalPages={totalPages} pageSize={pageSize} onPageChange={handlePageChange} onPageSizeChange={handlePageSizeChange} loading={loading} judul={'Daftar Product Line'} />
      </div>
    </div>
  )
}

export default ViewAllProductLineAdmin
