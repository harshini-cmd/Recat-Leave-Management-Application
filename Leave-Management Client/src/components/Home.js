import React,{useEffect, useState} from 'react'
import Dashboard from './Dashboard';
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Sidebar from './Sidebar';
import Employee from './Employee';
import LeaveBalances from './LeaveBalances';
import LeaveRequests from './LeaveRequests';
import { useLocation, useNavigate } from 'react-router-dom';

function Home() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn,setIsLoggedIn] = useState(localStorage.getItem('employeeData'));
    useEffect(()=>{
      if(!isLoggedIn){
        navigate('/')
    }
    },[])
    return (<Container fluid>
    <Row>
        <Col xs={2} id="sidebar-wrapper">      
          <Sidebar {...{isLoggedIn}}/>
        </Col>
        {isLoggedIn && 
        <Col  xs={10} id="page-content-wrapper">
        {location.pathname=="/dashboard" && <Dashboard />}
        {location.pathname=="/employees" && <Employee />}
        {location.pathname=="/leave" && <LeaveRequests />}
        {location.pathname==="/leave-balance" && <LeaveBalances />}
        </Col> }
    </Row>

</Container>
)}

export default Home