import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axiosAuthInstance from '../../../utils/axios-auth-instance';
import { Loading } from '../../../components/Loading';
import BaseTable, { SelectColumnFilter, ActionButtons } from '../../../components/BaseTable'
import { BaseTablePagination } from '../../../components/BaseTablePagination'


function DODetailPageAdmin() {
  const { doId } = useParams(); // Get customerId from URL parameters
  const location = useLocation(); // Access location state
  const [dos, setDos] = useState(location.state?.dos || null); // Initial data from state if available
  const [loading, setLoading] = useState(!location.state?.dos); // Show loading only if data not in state
  const [error, setError] = useState(null);

  const [productLine, setProductLine] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [totalPages, setTotalPages] = useState(0)

  
  const fetchDoDetail = async () => {
    setLoading(true);
    try {
      const response = await axiosAuthInstance.get(`/delivery-order/${doId}`);
      setDos(response.data.data);
    } catch (error) {
      setError('Failed to load do details.');
      console.error('Error fetching customer details:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
      fetchDoDetail();

  }, [currentPage, pageSize]);



  const fetchProductLine = async(page, limit)=>{
    setLoading(true);
    try{
      const response = await axiosAuthInstance.get(`/administrator/product-line?skip=${(page -1)*limit}&limit=${limit}=&delivery_order_id=${doId}`)
      const {productLines, total} = response.data.data
      setProductLine(productLines)
      setTotalPages(Math.ceil(total/limit))
      setLoading(false)
    }catch(error){
    console.error('Error fetching product line:', error)
    setLoading(false)
    }

  };
  useEffect(()=>{    
      fetchProductLine(currentPage, pageSize);
  },[currentPage, pageSize])

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
        Header: 'Nama Produk',
        accessor: 'product.name',
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
      {
        Header: 'Jenis Produk',
        accessor: 'product.product_type',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Kuantitas',
        accessor: 'quantity',
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
      {
        Header: 'Harga',
        accessor: 'price',
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
        Header: 'Berat',
        accessor: 'weight',
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
    ],
    []
  )

  if (loading) return <Loading visibility={true} />; // Show loading spinner if fetching
  if (error) return <p>{error}</p>; // Display error message if fetch failed

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md my-8">
      <h1 className="text-2xl font-bold mb-6">Informasi Delivery Order</h1>
      
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Status Delivery Order</label>
        <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-green-500 font-bold">
          {dos.status || 'N/A'}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Dokumen SO</label>
          <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
            {dos.so_origin || 'N/A'}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-1">Nomor DO</label>
          <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
            {dos.delivery_order_num || 'N/A'}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Volume</label>
          <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
            {dos.volume || 'N/A'}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-1">Quantity</label>
          <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
            {dos.quantity || 'N/A'}
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">ETA Target</label>
        <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
            {dos.eta_target ? `${new Date(dos.eta_target).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
            })}, ${new Date(dos.eta_target).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
            })} WIB` : 'N/A'}
        </div>
    </div>


      
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Alamat Asal</label>
        <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
          {dos.loc_ori.address || 'N/A'}
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Alamat Tujuan</label>
        <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
          {dos.loc_dest.address || 'N/A'}
        </div>
      </div>
      <div className="h-full min-h-full flex flex-col items-center">
        <Loading visibility={loading} />
        <div className={` ${loading ? 'hidden' : 'visible flex items-center'} `}>
          <BaseTablePagination columns={columns} data={productLine} currentPage={currentPage} totalPages={totalPages} pageSize={pageSize} onPageChange={handlePageChange} onPageSizeChange={handlePageSizeChange} loading={loading} judul={'Muatan'} />
        </div>
      </div>
    </div>
  );
  
}

export default DODetailPageAdmin;
