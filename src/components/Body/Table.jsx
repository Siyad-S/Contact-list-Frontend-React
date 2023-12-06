// Table.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllContacts } from "../../Redux/Slice/contact_list";
import ContactUpdate from "../ContactUpdate/ContactUpdate";
import "./Table.css";
import DeleteModal from "../DeleteModal/DeleteModal";
import Pagination from "../Pagination/Pagination";
import AddContactForm from "../AddContact/AddContactForm";

const Table = ({ showOverlay, setShowOverlay }) => {
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [singleContactData, setSingleContactData] = useState([]);
  const [openDelConfirmation, setOpenDelConfirmation] = useState(false);
  const [idForDelete, setIdForDelete] = useState("");
  const [showForm, setShowForm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [searchNotFound, setSearchNotFound] = useState(false)

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.contact_list);

  const openForm = () => {
    setShowForm(true);
    setShowOverlay(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setShowOverlay(false);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenDelConfirmation(true);
    setIdForDelete(id);
  };

  const handleUpdateFormOpening = (id) => {
    if (data && Array.isArray(data.data)) {
      const contactToUpdate = data.data.find((contact) => contact.id === id);
  
      if (contactToUpdate) {
        setSingleContactData(contactToUpdate);
        setOpenUpdateForm(true);
        setShowOverlay(true);
      } else {
        console.error(`Contact with id ${id} not found`);
      }
    } else {
      console.error("Invalid data structure or data is undefined");
    }
  };
  

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const isContactFound = data.data.some(
      (contact) =>
        contact.first_name.toLowerCase().includes(searchTerm) ||
        contact.last_name.toLowerCase().includes(searchTerm) ||
        contact.phone.toLowerCase().includes(searchTerm) ||
        contact.email.toLowerCase().includes(searchTerm)
    );
  
    if (!isContactFound) {
      setSearchNotFound(true);
    } else {
      setSearchNotFound(false);
      setSearch(event.target.value);
      setPage(1);
    }
  };
  

  useEffect(() => {
    dispatch(fetchAllContacts({ page, limit, search }));
  }, [dispatch, page, limit, search]);

  const seriralNumber = (index) => {
    return (page - 1) * limit + index + 1;
  }

  return (
    <>
      <div className="headerWithTable">
        <div className="header">
          <div className="header_div">
            <div className="table_headline">
              <h1>Contact List</h1>
            </div>
            <div className="btn_and_search">
              <button className="add_btn" onClick={openForm}>
                Add
              </button>
              <input
                type="search"
                placeholder="Search here..."
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {showOverlay && showForm && (
            <div className="overlay">
              <div className="addContact_form">
                <AddContactForm
                  closeForm={handleCloseForm}
                  page={page}
                  limit={limit}
                  search={search}
                />
              </div>
            </div>
          )}
        </div>
        <div className="table_box">
          <table>
            <thead>
              <tr>
                <th>Sl.No.</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th> </th>
              </tr>
            </thead>
            {searchNotFound ? (<h1>Contact not found</h1>):(
              <tbody>
              {data &&
                Array.isArray(data.data) &&
                data.data.map((contacts, index) => (
                  <tr key={index}>
                    <td>{seriralNumber(index)}</td>
                    <td>{contacts.first_name}</td>
                    <td>{contacts.last_name}</td>
                    <td>{contacts.phone}</td>
                    <td>{contacts.email}</td>
                    <td>
                      <button
                        className="update_btn"
                        onClick={() => handleUpdateFormOpening(contacts.id)}
                      >
                        Update
                      </button>
                      <button
                        className="delete_btn"
                        onClick={() => handleDeleteConfirmation(contacts.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
            )}
          </table>
        </div>
      </div>

      {showOverlay && openUpdateForm && (
        <div className="overlay">
          <div className="addContact_form">
            <ContactUpdate
              page={page}
              limit={limit}
              search={search}
              singleContactData={singleContactData}
              setOpenUpdateForm={setOpenUpdateForm}
            />
          </div>
        </div>
      )}

      {openDelConfirmation && (
        <div className="overlay">
          <DeleteModal
            page={page}
            limit={limit}
            search={search}
            idForDelete={idForDelete}
            setOpenDelConfirmation={setOpenDelConfirmation}
          />
        </div>
      )}

      <Pagination
        total={data.total}
        totalPages={data.totalPages}
        currentPage={data.currentPage}
        hasNextPage={data.hasNextPage}
        hasPreviousPage={data.hasPreviousPage}
        setPage={handlePageChange}
        setLimit={handleLimitChange}
        page={page}
        limit={limit}
      />
    </>
  );
};

export default Table;
