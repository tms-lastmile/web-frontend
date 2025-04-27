import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../../../components/Button'
import { Dropdown } from '../../../components/Dropdown'
import { TextField } from '../../../components/TextField'
import React, { useEffect, useRef, useState } from 'react'
import { Loading } from '../../../components/Loading'
import { Modal } from '../../../components/Modal'
import { isAnyAttributeNull, checkAttributeNull } from '../../../utils/utils'
import axiosAuthInstance from '../../../utils/axios-auth-instance'
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { useParams } from 'react-router-dom'

function ViewProdukAdmin() {
  const { productId } = useParams()
  let navigate = useNavigate()
  const product = useLocation()
  //   const productId = product.state.productId

  console.log(productId)
  const dc_ID = localStorage.getItem('dcId')
  const userRole = localStorage.getItem('userRole')
  const [showLoading, setShowLoading] = useState(true)
  const [detailProdukData, setDetailProdukData] = useState({
    id: null,
    name: null,
    address: null,
    desa_kelurahan: null,
    kecamatan: null,
    kabupaten_kota: null,
    provinsi: null,
    kode_pos: null,
    latitude: null,
    longitude: null,
    company: null,
    open_hour: null,
    close_hour: null,
    loc_id: null,
    service_time: null,
    product_type: null
  })
  const [dataDC, setDataDC] = useState([])
  const [dataTipeProduk, setDataTipeProduk] = useState([])
  const [customerDropdown, setCustomerDropdown] = useState([])
  const [tipeProdukDropdown, setTipeProdukDropdown] = useState({
    name: '',
    value: '',
    time: '' // You might want to provide a default value for this property
  })
  const [dcDropdown, setDCDropdown] = useState(null)
  const [dataProvinsi, setDataProvinsi] = useState([])
  const [dataKota, setDataKota] = useState([])
  const [dataKecamatan, setDataKecamatan] = useState([])
  const [dataDesa, setDataDesa] = useState([])
  const [provDropdown, setProvDropdown] = useState(null)
  const [kotaDropdown, setKotaDropdown] = useState(null)
  const [kecDropdown, setKecDropdown] = useState(null)
  const [desaDropdown, setDesaDropdown] = useState(null)

  useEffect(() => {
    async function fetchDataProduk() {
      if (detailProdukData.name === null) {
        try {
          const response = await axiosAuthInstance.get(`/product/${productId}`)
          const responseData = response.data.data
          const productData = {
            id: responseData.id,
            name: responseData.name,
            description: responseData.description,
            product_category: responseData.product_category,
            product_type: responseData.product_type
          }
          setDetailProdukData(productData)
          setShowLoading(false)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
    }

    fetchDataProduk()
  }, [detailProdukData])

  //Handle Detail Req
  const [isError, setIsError] = useState(false)

  const handleInputChange = (name, value) => {
    setDetailProdukData({ ...detailProdukData, [name]: value })
  }

  return (
    <div className="relative h-full -z-10">
      <Loading visibility={showLoading} />
      {/* <Modal variant="primary" isOpen={isOpenConfirmation} closeModal={() => setIsOpenConfirmation(false)} title="Ubah Data Produk" description="Anda yakin ingin menyimpan product baru?" rightButtonText="Yakin" onClickRight={detailProduk} leftButtonText="Batal" /> */}

      {/* <Modal variant="primary" isOpen={isOpenSuccess} closeModal={() => setIsOpenSuccess(false)} description="Berhasil menyimpan data product." rightButtonText="Selesai" onClickRight={() => navigate('/product')} />
      <Modal variant="danger" isOpen={isOpenError} closeModal={() => setIsOpenError(false)} description="Gagal menyimpan data product." rightButtonText="Ulangi" /> */}

      <div className={`px-[50px] py-[30px] ${showLoading ? 'hidden' : 'visible'}`}>
        <div className="p-8 bg-white rounded-lg">
          <h4>Informasi Produk</h4>
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY} libraries={['places']}>
            <div className="pt-4">
              <TextField label="Nama Produk" disabled={true} placeholder="Nama Produk" required={true} className="w-full" value={detailProdukData.name} onChange={(e) => handleInputChange('name', e.target.value)} isError={isError && checkAttributeNull(detailProdukData.name)} />
              <TextField label="Deskripsi" placeholder="Deskripsi" disabled={true} type="text" required={true} className="w-full" value={detailProdukData.description} onChange={(e) => handleInputChange('description', e.target.value)} isError={isError && checkAttributeNull(detailProdukData.description)} />
              <TextField label="Kategori Produk" disabled={true} placeholder="Kategori Produk" type="text" className="w-full" value={detailProdukData.product_category} onChange={(e) => handleInputChange('product_category', e.target.value)} isError={isError && checkAttributeNull(detailProdukData.product_category)} />
              <TextField label="Tipe Produk" disabled={true} placeholder="Tipe Produk" required={true} className="w-full" value={detailProdukData.product_type} onChange={(e) => handleInputChange('product_type', e.target.value)} isError={isError && checkAttributeNull(detailProdukData.product_type)} />
            </div>
          </LoadScript>
        </div>

        {/* <div className="flex justify-center gap-4 pt-4">
          <Button className="text-button btn-primary-outline" label="Kembali" onClick={() => navigate('/product')} />
          <Button className="text-button btn-primary" label="Simpan" onClick={handleSubmit} />
        </div> */}
      </div>
    </div>
  )
}

export default ViewProdukAdmin
