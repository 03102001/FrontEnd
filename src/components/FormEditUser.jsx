import React, { useEffect, useRef, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { getData, putData } from '../utils/fetch';

const FormAddUser = () => {
  const role = useRef("");
  const name = useRef("");
  const emailAddress = useRef("");
  const userName = useRef("");
  const department = useRef("");
  const buID = useRef("");

  // const [roles, setRoles] = useState([]);
  const [businessUnit, setBusinessUnit] = useState([]);
  const [departments, setDepartments] = useState([]);


  const navigate = useNavigate();
  const params = useParams();


  const fetchUser = async () => {
    const res = await getData(`/api/HrEmployee/getById/${params.id}`);
    const user = res.data;
    role.current.value = user.Role;
    name.current.value = user.EmployeeName;
    userName.current.value = user.UserName;
    department.current.value = user.DepartmentName;
    emailAddress.current.value = user.EmailAddress;
    buID.current.value = user.BuID;
  };

  const handleOnUpdate = async (e) => {
    e.preventDefault();

    try {
      const EmplSapId = "100001234";
      const AuthenticationType = "APPLICATION";

      const userData = {
        EmployeeID: params.id,
        EmailAddress: emailAddress.current.value,
        UserName: userName.current.value,
        EmployeeName: name.current.value,
        BuID: buID.current.value,
        EmplSapId: EmplSapId,
        Role: role.current.value,
        DepartmentName: department.current.value,
        AuthenticationType: AuthenticationType,
        IsActive: "Y",
        IsLock: "N",
      };
      await putData(`/api/HrEmployee/update/${params.id}`, userData);
      const response = {
        "status": 200,
        "message": "Data updated",
        "data": userData
      };

      console.log(response);
      alert("User successfully updated");
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
    fetchUser();
    fetchBusinessUnit();
    fetchDepartments();
    // fetchRoles();
  }, []);

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Edit User</h2>
      <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div className="card-content">
          <div className="content">
            <form onSubmit={handleOnUpdate}>
              <div className="field">
                <label className="label">Employee Name</label>
                <div className="control">
                  <input type="text" ref={name} className="input" placeholder="Employee Name" style={{ width: '100%' }} />
                </div>
              </div>
              <div className="field">
                <label className="label">Email Address</label>
                <div className="control">
                  <input type="email" ref={emailAddress} className="input" placeholder="Email Address" style={{ width: '100%' }} required />
                </div>
              </div>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input type="text" ref={userName} className="input" placeholder="Username" style={{ width: '100%' }} required />
                </div>
              </div>
              {/* <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input type="password"} className="input" placeholder="********" style={{ width: '100%' }} required />
                </div>
              </div>
              <div className="field">
                <label className="label">Re-type Password</label>
                <div className="control">
                  <input type="password"} className="input" placeholder="********" style={{ width: '100%' }} required />
                </div>
              </div> */}
              <div className="field">
                <label className="label">Departemen</label>
                <div className="control has-icons-right">
                  <div className="select is-fullwidth">
                    <select className="input" required ref={department}>
                      <option value="" disabled>Select option</option>
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
                    <select className="input" required ref={role}>
                      <option value="" disabled>Select option</option>
                      <option value="SYSADMIN">SUPER ADMIN</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="MGT">MANAGEMENT</option>

                      {/* <option value="" disabled>Select option</option>
                      {roles.map((role, index) => <option key={index + 1} ref={role.RoleName}>{`${role.RoleID} - ${role.RoleName}`}</option>)} */}
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
                    <select className="input" required ref={buID}>
                      <option value="" disabled>Select option</option>
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
