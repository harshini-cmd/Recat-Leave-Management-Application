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
function Signin({error,justifyActive,setJustifyActive,loginForm,handleLoginFormChange,handleLoginSubmit}) 
{
  const backgroundStyle = {
    backgroundImage: 'url(https://cell-only.com/wp-content/uploads/2020/04/icon.png)',
    backgroundSize: 'cover', // Adjust the size as needed
    
    backgroundPosition: 'center', // Center the image
    height:'900px',
    backgroundRepeat: 'no-repeat', // Prevent repetition
    minHeight: '100vh', // Ensure the background covers the entire viewport height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    
  };
  
  
  return (
    <div style={backgroundStyle}>

            

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
    </div>
  )
}

export default Signin;