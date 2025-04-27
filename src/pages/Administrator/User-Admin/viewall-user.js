import BaseTable, { SelectColumnFilter, StatusPill, ActionButtons } from '../../../components/BaseTable'
import React, { useEffect, useState } from 'react'
import { Loading } from '../../../components/Loading'
import axiosAuthInstance from '../../../utils/axios-auth-instance'
import jwtDecode from 'jwt-decode'

function ViewAllUserAdmin() {
  const [userRole, setUserRole] = useState('')
  const [dataUser, setDataUser] = useState([])
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    const tokenFromSession = sessionStorage.getItem('token')
    if (tokenFromSession) {
      const decodedToken = jwtDecode(tokenFromSession)
      setUserRole(decodedToken.role.name)
    }
  }, []) // Jalankan sekali saat komponen pertama kali di-mount

  useEffect(() => {
    
    if (userRole && userRole !== 'Super') {
      try {
        throw {
          status: 401,
          message: 'Unauthorized access'
        }
      } catch (error) {
        console.error(`Error: ${error.status} - ${error.message}`)
        // setErrorMessage(`Error ${error.status}: ${error.message}`);
      }
    }
  }, [userRole]) // Pengecekan dijalankan ulang saat userRole berubah

  useEffect(() => {
    if (dataUser.length === 0 && userRole === 'Super') {
      axiosAuthInstance.get('administrator/users').then((response) => {
        //jangan lupa diganti api admin
        setDataUser(response.data.data)
        setShowLoading(false)
      })
    }
  }, [dataUser, userRole])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Username',
        accessor: 'username',
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
      {
        Header: 'Email',
        accessor: 'email',
        filter: 'includes'
      },
      {
        Header: 'Role',
        accessor: 'role.name',
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
      {
        Header: 'Action',
        accessor: (row) => ['User', row.id],
        Cell: ActionButtons
      }
    ],
    []
  )

  return (
    <>
      <Loading visibility={showLoading} />
      <div className={`px-[50px] py-[30px] ${showLoading ? 'hidden' : 'visible'}`}>
        <BaseTable columns={columns} data={dataUser} dataLength={dataUser.length} judul={`User`} />
      </div>
    </>
  )
}

export default ViewAllUserAdmin
