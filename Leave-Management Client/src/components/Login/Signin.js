import React from 'react'
import {
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBInput,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
function Signin({error,justifyActive,setJustifyActive,loginForm,handleLoginFormChange,handleLoginSubmit}) {
  return (
      <form onSubmit={handleLoginSubmit}>
      <MDBTabsContent>
        {error.length!==0 && (<div className="alert alert-danger" role="alert">{error}</div>)}
        <MDBTabsPane show={justifyActive === 'tab1'}>
          <MDBInput wrapperClass='mb-4' name='email' label='Email address' type='email' value={loginForm.email} onChange={handleLoginFormChange}/>
          <MDBInput wrapperClass='mb-4' name='passowrd' label='Password' type='password' value={loginForm.password} onChange={handleLoginFormChange}/>

          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <MDBBtn className="mb-4 w-100" type='submit'>Sign in</MDBBtn>
          <p className="text-center">Not a member? <Link onClick={()=>{setJustifyActive("tab2")}}>Register</Link></p>

        </MDBTabsPane>
    </MDBTabsContent>
    </form>
  )
}

export default Signin;