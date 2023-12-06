import React, { useEffect, useState } from "react";
import "../ContactUpdate/ContactUpdate.css";
import { useDispatch } from "react-redux";
import { updateContactdata } from "../../Redux/Slice/update_contact";
import { fetchAllContacts } from "../../Redux/Slice/contact_list";
import { toast } from "react-toastify";


const ContactUpdate = ({ singleContactData, setOpenUpdateForm , page, limit, search }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (singleContactData) {
      setFormData({
        first_name: singleContactData.first_name,
        last_name: singleContactData.last_name,
        phone: singleContactData.phone,
        email: singleContactData.email,
      });
    }
  }, [singleContactData]);

  const handleUpdateFormData = (e) => {
    const { id, value } = e.target;
    setFormData((contactPreview) => ({
      ...contactPreview,
      [id]: value,
    }));
  };

  const notify = () => {
    toast.success("Contact updated successfully", {
      autoClose: 3000,
      style: {
        color: "green",
        background: "black"
      }
    });
  }

  const handleSubmit = () => {
    try {
      if (singleContactData) {
        dispatch(
          updateContactdata({ id: singleContactData.id, updatedData: formData })
        );
        dispatch(fetchAllContacts({page, limit, search}));
        notify()
        setOpenUpdateForm(false);
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleCloseUpdateForm = async () => {
    setOpenUpdateForm(false);
    await (fetchAllContacts({search, page, limit}));
  };

  // console.log(page, limit, search);

  return (
    <div className="update_form">
      <div className="updateFormClose">
        <h1>Update Contact</h1>
        <button onClick={handleCloseUpdateForm}>
        <i className="material-symbols-outlined">close</i>
        </button>
      </div>
      <div>
        <form>
          <label htmlFor="first_name">First name</label>
          <input
            type="text"
            placeholder="Enter first name"
            id="first_name"
            value={formData.first_name}
            onChange={handleUpdateFormData}
          />
          <label htmlFor="last_name">Last name</label>
          <input
            type="text"
            placeholder="Enter last name"
            id="last_name"
            value={formData.last_name}
            onChange={handleUpdateFormData}
          />
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            placeholder="Enter phone number"
            id="phone"
            value={formData.phone}
            onChange={handleUpdateFormData}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            id="email"
            value={formData.email}
            onChange={handleUpdateFormData}
          />
        </form>
      </div>
      <div>
        <button type="button" className="update_button" onClick={handleSubmit}>
          Update
        </button>
      </div>
    </div>
  );
};

export default ContactUpdate;
