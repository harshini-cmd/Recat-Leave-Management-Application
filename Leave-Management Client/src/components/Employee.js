import React, { useState, useEffect } from 'react';

const Employee = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Retrieve employee data from localStorage
    const storedEmployeeData = JSON.parse(localStorage.getItem('employeeData')).data.employee;
    if (storedEmployeeData) {
      setEmployeeData(storedEmployeeData);
    }
  }, []);

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    // Update the password in the employee data
    const updatedEmployeeData = { ...employeeData, password };
    setEmployeeData(updatedEmployeeData);

    // Save the updated employee data in localStorage
    localStorage.setItem('employeeData', JSON.stringify(updatedEmployeeData));

    setMessage('Password changed successfully.');
    setPassword('');
    setConfirmPassword('');
  };

  if (!employeeData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Employee Information</h2>
      <p>Name: {employeeData.name}</p>
      <p>Email: {employeeData.email}</p>
      <p>Phone Number: {employeeData.phone_number}</p>
      <p>Department: {employeeData.department}</p>

      <div className="mt-4">
        <h2 className="text-2xl font-semibold mb-2">Change Password</h2>
        <form onSubmit={handlePasswordChange}>
          <div className="mb-2">
            <label className="block font-semibold">New Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="mb-2">
            <label className="block font-semibold">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700">
            Change Password
          </button>
        </form>
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default Employee;
