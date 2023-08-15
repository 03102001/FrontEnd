import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IoAddCircleSharp } from 'react-icons/io5';
import { deleteData, getData } from '../utils/fetch';

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await getData('/api/HrEmployee/getAll');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  //   const indexOfLastItem = currentPage * itemsPerPage;
  //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredUsers = users.filter((user) =>
    user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //   const currentDisplayedUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = Math.ceil(filteredUsers.length / itemsPerPage);
  const pages = Array.from({ length: pageNumbers }, (_, i) => i + 1);

  const handleAddData = () => {
    navigate('/Users/add');
  };

  const handleEdit = (id) => {
    navigate(`/Users/edit/${id}`);
  };

  const handleDeleteUser = async (id) => {
    await deleteData(`/api/HrEmployee/delete/${id}`);
    if (window.confirm("Are you sure to delete this data?")) {
      alert("Data has been deleted from database");
      fetchUserData();
    } else {
      return false;
    }
  };

  // console.log(filteredUsers);

  return (
    <div style={{ maxWidth: "95%" }}>
      <h1 className="title">User</h1>
      <h2 className="subtitle">List Of Users</h2>
      <div className="columns" style={{ marginBottom: '10px' }}>
        <div className="column is-3">
          <input
            type="text"
            placeholder="Search by Username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
          />
        </div>
        <div className="column is-3">
          <button className="button is-primary" onClick={handleAddData}>
            <IoAddCircleSharp className="mr-2" />
            Add Data
          </button>
        </div>
      </div>
      <div className="columns">
        <div className="column is-full">
          <div className="table-container is-flex justify-content-center">
            <table className="table is-striped is-centered has-text-centered">
              <thead className="has-background-primary">
                <tr>
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>No</th>
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>User_Id</th>
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Username</th>
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Email</th>
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Departemen Name</th>
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Role</th>
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Created By</th>
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Created At</th>
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Updated By</th>
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Updated At</th>
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user.EmployeeID}>
                      <td>{index + 1}</td>
                      <td>{user.EmployeeID}</td>
                      <td>{user.UserName}</td>
                      <td>{user.EmailAddress}</td>
                      <td>{user.DepartmentName}</td>
                      <td>{user.Role}</td>
                      <td>{user.CreatedBy}</td>
                      <td>{user.createdAt}</td>
                      <td>{user.ModifiedBy}</td>
                      <td>{user.updatedAt}</td>
                      <td>
                        <div className="columns is-gapless">
                          <div className="column">
                            <button
                              style={{ borderRadius: "0px" }}
                              className="button is-small is-primary"
                              onClick={() => handleEdit(user.EmployeeID)}
                            >
                              <FaEdit />
                            </button>
                          </div>
                          <div className="column">
                            <button onClick={() => handleDeleteUser(user.EmployeeID)} style={{ borderRadius: "0px" }} className="button is-small is-danger">
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10">No data available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div
            className="pagination is-centered"
            role="navigation"
            aria-label="pagination"
            style={{ display: "flex", justifyContent: "center", gap: "5px" }}
          >
            {pages.map((page) => (
              <button
                key={page}
                className={`button ${currentPage === page ? 'is-primary' : ''}`}
                onClick={() => paginate(page)}
              >
                {page}
              </button>
            ))}
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

export default Userlist;
