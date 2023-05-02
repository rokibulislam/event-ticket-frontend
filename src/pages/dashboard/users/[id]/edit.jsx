import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import DashboardLayout from '@/components/DashboardLayout'
import { getUser, createUser } from '@/store/slices/user'
import { getRoles } from '@/store/slices/role'
import { protectRoute } from '@/components/protectRoute'


const EditUser = () => {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useDispatch();

    const [ input, setInput ] = useState ({
      name: '',
      email: '',
      password: '',
      role: ''
    })
  
    const user =  useSelector( state => state.user.item );
    const roles =  useSelector( state => state.role.items );

    useEffect( () => {
      dispatch(getUser(id))
      setInput({...user})
      dispatch( getRoles() );
    },[dispatch, router])
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setInput({
        ...input,
        [name]: value
      })
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createUser(input))
      router.push('/dashboard/users')
    }
    
    return (
      <Layout>
          <DashboardLayout>
            <h2> EditUser </h2>
            
            <form action='' method='post' onSubmit={handleSubmit}>
              
              <div className="form-group">
                    <label htmlFor=""> User Name </label>
                    <input type="text" name="name" id="" value={input.name} className="form-control mb-4" onChange={handleChange}  />
              </div>
  
              <div className="form-group">
                    <label htmlFor=""> Email </label>
                    <input type="text" name="email" id="" value={input.email} className="form-control mb-4" onChange={handleChange}  />
              </div>
  
              <div className="form-group">
                    <label htmlFor=""> Password </label>
                    <input type="password" name="password" id="" value={input.password} className="form-control mb-4" onChange={handleChange}  />
              </div>

              <div className="form-group mb-4">
                <label htmlFor="role" className='form-label'> Role </label>
                <select className="form-control mb-4" name="role" id="role" onChange={handleChange} >
                  { 
                    roles.length > 0  ? (
                      roles.map( ( item, i ) =>{
                        return (
                          <option value={item.name}>
                            { item.name }
                          </option>
                        )
                      })
                    ) : ''
                  }
                </select>
              </div> 
  
              <div className="form-group">
                  <button className="btn btn-primary"> Submit </button>
              </div>
  
            </form>

          </DashboardLayout>
      </Layout>
    )
}

export default protectRoute(EditUser)