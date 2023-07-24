import React, { useEffect, useState } from 'react';
import api from '../constanst';

const LeaveBalances = () => {
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [employeeData, setEmployeeData] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    retrieveEmployeeData();
  }, []);

  useEffect(() => {
    if (employeeData) {
      fetchLeaveBalances();
      fetchLeaveRequests();
    }
  }, [employeeData]);

  const retrieveEmployeeData = () => {
    const storedEmployeeData = JSON.parse(localStorage.getItem('employeeData')).data.employee;
    if (storedEmployeeData) {
      setEmployeeData(storedEmployeeData);
    }
  };

  const fetchLeaveBalances = async () => {
    try {
      const response = await api.get(`/leavebalance/${employeeData._id}`);
      const data = response.data; // Assuming the response is an array of leave balances
      setLeaveBalances(data);
    } catch (error) {
      console.error('Error fetching leave balances:', error);
    }
  };
  const fetchLeaveRequests = async () => {
    try {
      const response = await api.post(`/leave/getleaves`,{employee_id: employeeData._id,status:['approved', 'rejected']});
      setLeaveRequests(response.data);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-4">Leave Balances for Employee:</h2>
      {leaveBalances.length === 0 ? (
        <p className="text-gray-500">No leave balances found.</p>
      ) : (
        <ul className="">
          {leaveBalances.map((record) => (
            <li key={record._id} className="flex justify-between items-center border-b border-gray-300">
              <p className="text-xs">
                {record.leave_type.type}
              </p>
              <p className="text-blue-600 font-semibold">
                {record.leave_type.balance}
              </p>
            </li>
          ))}
        </ul>
      )}
      <div>
        <h3 className="text-lg font-semibold mb-2">Reviewed Leave Requests</h3>
        {leaveRequests.length === 0 ? (
          <p>No leave requests submitted.</p>
        ) : (
          <ul className="list-disc pl-6">
            {leaveRequests.map((request) => (
              <li key={request._id} className="mb-4">
                <div className="bg-white p-4 rounded-md shadow-md">
                  <p className="font-semibold mb-2">Leave Type: {request.leave_type}</p>
                  <p>Start Date: {request.start_date}</p>
                  <p>End Date: {request.end_date}</p>
                  <p>Reason: {request.reason}</p>
                  <p>Status: {request.status}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LeaveBalances;
