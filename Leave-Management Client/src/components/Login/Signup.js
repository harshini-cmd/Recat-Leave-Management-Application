import React from 'react'
import {
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBInput,
    MDBCheckbox,
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle
  }
  from 'mdb-react-ui-kit';

function Signup({error,justifyActive,handleSigninFormChange,handleSigninSubmit}) {
  return (
    <form onSubmit={handleSigninSubmit}>
    <MDBTabsContent>
        <MDBTabsPane show={justifyActive === 'tab2'}>
          {error.length!==0 && (<div className="alert alert-danger" role="alert">{error}</div>)}
          <div className=" flex">
            <p className="my-3">Role </p>
            <select className=" bg-blue-400 rounded-lg m-3 px-3 py-1" name='role' onChange={handleSigninFormChange}>
              <option>Manager</option>
              <option>Employee</option>
            </select>
          </div>
          <MDBInput wrapperClass='mb-4' name='name' label='Name' type='text' onChange={handleSigninFormChange}/>
          <MDBInput wrapperClass='mb-4' name='email' label='Email' type='email' onChange={handleSigninFormChange}/>
          <MDBInput wrapperClass='mb-4' name='phone_number' label='Phone Number' type='text' onChange={handleSigninFormChange}/>
          <MDBInput wrapperClass='mb-4' name='department' label='Department' type='text' onChange={handleSigninFormChange}/>
          <MDBInput wrapperClass='mb-4' name='password' label='Password' type='password' onChange={handleSigninFormChange}/>

          <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div>

          <MDBBtn className="mb-4 w-100" type='submit'>Sign up</MDBBtn>
        </MDBTabsPane>
      </MDBTabsContent>
      </form>
  )
}

export default Signup