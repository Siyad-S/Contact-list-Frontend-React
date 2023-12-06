import React from "react";
import { fetchAllContacts } from "../../Redux/Slice/contact_list";
import {  deleteContact } from "../../Redux/Slice/delete_contact";
import { useDispatch } from "react-redux";
import "../DeleteModal/DeleteModal.css";
import { toast } from "react-toastify"

const DeleteModal = ({ idForDelete, setOpenDelConfirmation, page, limit, search }) => {

    const dispatch = useDispatch();

  const handleCloseModal = () => {
    setOpenDelConfirmation(false)
  }

  const notify = () => {
    toast.error("Contact deleted successfully",{
      autoclose:3000,
      style: {
        color: "red",
        background: "black"
      }
    })
  }


    const handleDelete = async () => {
      await dispatch(deleteContact(idForDelete));
      setOpenDelConfirmation(false)
      dispatch(fetchAllContacts({page, limit, search}));
      notify()
    };



  return (
    <div className="delete_confirmation">
      <div className="close_btn_div">
        <button className="close_btn">
          <i className="material-symbols-outlined" onClick={handleCloseModal}>close</i>
        </button>
      </div>
      <div className="confirmation_question">
        <h3>Do you want to delete?</h3>
      </div>
      <div className="yes_no_div">
        <button className="yes_btn btn" onClick={handleDelete}>Yes</button>
        <button className="no_btn btn" onClick={handleCloseModal}>No</button>
      </div>
    </div>
  );
};

export default DeleteModal;
