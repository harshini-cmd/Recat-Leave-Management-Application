import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink}
from 'mdb-react-ui-kit';
import api from '../../constanst';
import Signin from './Signin';
import Signup from './Signup';

function Login ({ setIsLoggedIn }){
    const [loginForm, setLoginForm] = useState({
      email: '',
      password: ''
    });
    const [signinForm, setSigninForm] = useState({
      role:'',
      name:'',
      email: '',
      phone_number:'',
      department:"",
      password: ''
    });
    const [error,setError] = useState("")
    const navigate= useNavigate();
    const handleLoginFormChange = (e) => {
      setLoginForm({
        ...loginForm,
        [e.target.type]: e.target.value
      });
    };
    const handleSigninFormChange = (e) => {
      setSigninForm({
        ...signinForm,
        [e.target.name]: e.target.value
      });
    };

    const handleSigninSubmit = async (e) => {
      e.preventDefault();
      api.post('/employees',signinForm)
      .then((response) => {
          if(response.status === 201){
            setError("")
            setIsLoggedIn(true);
            setLoginForm({email:signinForm.email,
            password:signinForm.password})
            handleLoginSubmit(e);
            navigate('/dashboard');
        } else  {
          setError('!Invalid Credantials')
        }
      })
      .catch((error)=>{
            console.error('Error:', error);
            setError('An error occurred while logging in. Please try again later.');
        });
    }
    const handleLoginSubmit = async (e) => {
      e.preventDefault();
      api.post('employees/signin',loginForm)
      .then((response) => {
          if(response.status === 200){
            setError("")
            setIsLoggedIn(true);
            localStorage.setItem('employeeData', JSON.stringify(response));
            navigate('/dashboard');
        } else  {
          setError('!Invalid Credantials')
        }
      })
      .catch((error)=>{
            console.error('Error:', error);
            setError('An error occurred while logging in. Please try again later.');
        });
    }

  const [justifyActive, setJustifyActive] = useState('tab1');;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
      {justifyActive === 'tab1' && <Signin {...{error,justifyActive,setJustifyActive,loginForm,handleLoginFormChange,handleLoginSubmit}}/>}
      {justifyActive === 'tab2' && <Signup {...{error,justifyActive,setIsLoggedIn,handleSigninFormChange,handleSigninSubmit}}/>}
    </MDBContainer>
  );
}

export default Login;