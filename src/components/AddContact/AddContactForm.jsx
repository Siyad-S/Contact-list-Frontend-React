import React, { useState } from "react";
import "../AddContact/AddContactForm.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPostContact,
  setPostContact,
  postContactAsync,
} from "../../Redux/Slice/post_contact";
import { fetchAllContacts } from "../../Redux/Slice/contact_list";
import { toast } from "react-toastify";

const AddContactForm = ({ closeForm, page, limit, search }) => {
  const dispatch = useDispatch();
  const formData = useSelector(selectPostContact);
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
  });


  const notify = () => {
    toast.success("Contact added successfully", {
      autoClose: 3000,
      style: {
        color: "green",
        background: "black"
      }
    });
  }
  const handleChangeFormData = (e) => {
    dispatch(
      setPostContact({
        ...formData,
        [e.target.id]: e.target.value,
      })
    );

    // Only update errors if the field is empty
    if (e.target.value === "") {
      setErrors({
        ...errors,
        [e.target.id]: `${e.target.name} is required`,
      });
    } else {
      setErrors({
        ...errors,
        [e.target.id]: "",
      });
    }
  };

  //validation
  const handleError = () => {
    const newErrors = {};

    if (formData.first_name === "") {
      newErrors.first_name = "First name is required";
    }
    if (formData.last_name === "") {
      newErrors.last_name = "Last name is required";
    }
    const phoneNumPattern = /^\d{10}$/;
    if (formData.phone === "") {
      newErrors.phone = "Phone number is required";
    } else if (!phoneNumPattern.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    if (formData.email === "") {
      newErrors.email = "Email is required";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const submitContact = () => {
    const isValid = handleError();

    if (isValid) {
      dispatch(postContactAsync(formData));
      closeForm();
      console.log({ limit, search, page })
      dispatch(fetchAllContacts({search, page, limit}));
      notify();
    }
  };

  return (
    <div className="form_div">
      <div className="addFormCloseBtn">
        <h1>Add Contact</h1>
        <button onClick={closeForm}>
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
            onChange={handleChangeFormData}
          />
          <div className="error_message">{errors.first_name}</div>

          <label htmlFor="last_name">Last name</label>
          <input
            type="text"
            placeholder="Enter last name"
            id="last_name"
            value={formData.last_name}
            onChange={handleChangeFormData}
          />
          <div className="error_message">{errors.last_name}</div>

          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            placeholder="Enter phone number"
            id="phone"
            value={formData.phone}
            onChange={handleChangeFormData}
          />
          <div className="error_message">{errors.phone}</div>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            id="email"
            value={formData.email}
            onChange={handleChangeFormData}
          />
          <div className="error_message">{errors.email}</div>
        </form>
      </div>
      <div>
        <button className="submit_btn" type="button" onClick={submitContact}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddContactForm;
