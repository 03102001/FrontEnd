import React, { useEffect, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { getData, postData } from '../utils/fetch';

const FormAddUser = () => {
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [businessUnit, setBusinessUnit] = useState([]);
  const [roles, setRoles] = useState([]);
  const [businessID, setBusinessID] = useState("");

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        return alert('Password not match');
      }

      const EmplSapId = "100001234";
      const AuthenticationType = "APPLICATION";

      const userData = {
        EmployeeID: userId,
        EmailAddress: emailAddress,
        UserName: userName,
        Password: password,
        EmployeeName: name,
        BuID: businessID,
        EmplSapId: EmplSapId,
        Role: role,
        DepartmentName: department,
        AuthenticationType: AuthenticationType,
        IsActive: "Y",
        IsLock: "N",
      };

      // return console.log(userData);
      await postData('/api/HrEmployee/create', userData);
      const response = {
        "status": 200,
        "message": "Data inserted",
        "data": userData
      };

      console.log(JSON.stringify(response));
      return navigate('/users');
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const fetchBusinessUnit = async () => {
    const responseBusinessUnit = await getData('/api/HrBusinessUnit/getAll');
    // console.log(responseBusinessUnit.data);
    setBusinessUnit(responseBusinessUnit.data);
  };

  const fetchDepartments = async () => {
    const responseDepartments = await getData('/api/department/getAll');
    // console.log(responseDepartments.data);
    setDepartments(responseDepartments.data);
  };

  // const fetchRoles = async () => {
  //   const responseRoles = await getData('/api/department/getAll');
  //   // console.log(responseRoles.data);
  //   setRoles(responseRoles.data);
  // };

  useEffect(() => {
    fetchBusinessUnit();
    fetchDepartments();
    // fetchRoles();
  }, []);

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Add New User</h2>
      <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div className="card-content">
          <div className="content">
            <form onSubmit={handleOnSubmit}>
              <div className="field">
                <label className="label">User ID</label>
                <div className="control">
                  <input type="text" onChange={(e) => setUserId(e.target.value)} className="input" placeholder="User ID" style={{ width: '100%' }} required />
                </div>
              </div>
              <div className="field">
                <label className="label">Employee Name</label>
                <div className="control">
                  <input type="text" onChange={(e) => setName(e.target.value)} className="input" placeholder="Employee Name" style={{ width: '100%' }} required />
                </div>
              </div>
              <div className="field">
                <label className="label">Email Address</label>
                <div className="control">
                  <input type="email" onChange={(e) => setEmailAddress(e.target.value)} className="input" placeholder="Email Address" style={{ width: '100%' }} required />
                </div>
              </div>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input type="text" onChange={(e) => setUserName(e.target.value)} className="input" placeholder="Username" style={{ width: '100%' }} required />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input type="password" onChange={(e) => setPassword(e.target.value)} className="input" placeholder="********" style={{ width: '100%' }} required />
                </div>
              </div>
              <div className="field">
                <label className="label">Re-type Password</label>
                <div className="control">
                  <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} className="input" placeholder="********" style={{ width: '100%' }} required />
                </div>
              </div>
              <div className="field">
                <label className="label">Departemen</label>
                <div className="control has-icons-right">
                  <div className="select is-fullwidth">
                    <select className="input" required value={department} onChange={(e) => setDepartment(e.target.value)}>
                      {departments.map((dept, index) => <option key={index + 1} value={dept.DepartmentName}>{`${dept.DepartmentID} - ${dept.DepartmentName} - ${dept.DepartmentDesc}`}</option>)}
                    </select>
                  </div>
                  <div className="icon is-small is-right">
                    <BiChevronDown />
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Role</label>
                <div className="control has-icons-right">
                  <div className="select is-fullwidth">
                    <select className="input" required value={role} onChange={(e) => setRole(e.target.value)}>
                      <option value="SYSADMIN">SUPER ADMIN</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="MGT">MANAGEMENT</option>

                      {/* <option value="" selected disabled>Select option</option>
                      {roles.map((role, index) => <option key={index + 1} value={role.RoleName}>{`${role.RoleID} - ${role.RoleName}`}</option>)} */}
                    </select>
                  </div>
                  <div className="icon is-small is-right">
                    <BiChevronDown />
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Business Unit</label>
                <div className="control has-icons-right">
                  <div className="select is-fullwidth">
                    <select className="input" required value={businessID} onChange={(e) => setBusinessID(e.target.value)}>
                      {businessUnit.map((busUnit, index) => <option key={index + 1} value={busUnit.BuID}>{`${busUnit.BuName} - ${busUnit.BuDesc}`}</option>)}
                    </select>
                  </div>
                  <div className="icon is-small is-right">
                    <BiChevronDown />
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-success" type='submit'>Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>
          &copy; {new Date().getFullYear()} APRIL Learning Institute. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default FormAddUser;
