import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import api from '../constanst';

const Dashboard = () => {
  // Dummy data for the calendar (you'll replace this with actual leave data from the backend)
  const leaveData = [
    { date: new Date(2023, 6, 15), status: 'Approved' },
    { date: new Date(2023, 6, 18), status: 'Pending' },
    { date: new Date(2023, 6, 22), status: 'Approved' },
    // Add more leave data based on your application's records
  ];
  const [employeeData, setEmployeeData] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [comment,setComment] = useState("");
  const [message,setMessage] = useState(null)
  useEffect(() => {
    // Retrieve employee data from localStorage
    const storedEmployeeData = JSON.parse(localStorage.getItem('employeeData')).data.employee;
    if (storedEmployeeData) {
      setEmployeeData(storedEmployeeData);
    }
  }, []);
  useEffect(()=>{
    if(employeeData && employeeData.role == 'manager'){
      fetchLeaveRequests();
    }
  },[employeeData])
  const fetchLeaveRequests = async () => {
    try {
      const response = await api.get('/leave');
      setLeaveRequests(response.data);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };
  if (employeeData && employeeData.role == 'employee' ){
    return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-grow p-6">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

        {/* Calendar */}
        <div className="shadow rounded-lg mb-6 p-4 bg-white">
          <h3 className="text-lg font-semibold mb-4">Leave Status Calendar</h3>
          <Calendar
            className="rounded-lg border-2 border-gray-200 p-2 text-black text-center"
            tileClassName={({ date }) => {
              const leaveItem = leaveData.find((item) => item.date.toDateString() === date.toDateString());
              return leaveItem ? `bg-${leaveItem.status.toLowerCase()} text-white` : null;
            }}
            calendarType="US"
            showNeighboringMonth={false}
          />
        </div>
      </div>
    </div>
  );
}else if(employeeData && employeeData.role == 'manager'){
  const handleApproveRequest = async (id) => {
    try {
      await api.patch(`/leave/${id}`,{status:'approved',manager_comment:comment});
      fetchLeaveRequests();
      setMessage('Leave request accepted successfully.');
    } catch (error) {
      console.error('Error removing leave request:', error);
      setMessage('Error removing leave request. Please try again.');
    }
  };
  const handleRejectRequest = async (id) => {
    try {
      await api.patch(`/leave/${id}`,{status:'rejected',manager_comment:comment});
      fetchLeaveRequests()
      setMessage('Leave request rejected successfully.');
    } catch (error) {
      console.error('Error removing leave request:', error);
      setMessage('Error removing leave request. Please try again.');
    }
  };
  const getEmployeeDetails = async (id) => {
    try {
      const response = await api.get(`/employees/${id}`);
      setEmployeeData(response.data)
    } catch (error) {
      console.error('Error removing leave request:', error);
      setMessage('Error removing leave request. Please try again.');
    }
  };
  return(
    <div>
    <div>
        <h3 className="text-lg font-semibold mb-2">Submitted Leave Requests</h3>
        {leaveRequests.length === 0 ? (
          <p>No leave requests submitted.</p>
        ) : (
          <ul className="list-disc pl-6">
            {leaveRequests.map((request) => ( request.status == 'pending' &&
              <li key={request._id} className="mb-4">
                <div className="bg-white p-4 rounded-md shadow-md">
                  <p>Employee details: </p>
                  <p className="font-semibold mb-2">Leave Type: {request.leave_type}</p>
                  <p>Start Date: {request.start_date}</p>
                  <p>End Date: {request.end_date}</p>
                  <p>Reason: {request.reason}</p>
                  <p>Status: {request.status}</p>
                  <button
                    onClick={() => handleApproveRequest(request._id)}
                    className="bg-green-600 text-white rounded-md py-2 px-4 hover:bg-green-700 mt-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRejectRequest(request._id)}
                    className="bg-red-600 text-white rounded-md py-2 px-4 hover:bg-red-700 mt-2"
                  >
                    Reject
                  </button>
                  <p>Enter Comments: </p>
                  <textarea
                  value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
            className="w-full rounded-md border border-gray-300"
          />
                </div>
              </li>
            ))}
          </ul>
        )}
        </div>
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </div>
  )
}
};

export default Dashboard;
