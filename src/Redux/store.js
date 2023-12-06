import {configureStore} from "@reduxjs/toolkit"
import contactReducer from "./Slice/contact_list"
import postContactReducer from "./Slice/post_contact"
import deleteContactReducer from "./Slice/delete_contact"
import updateContactReducer from "./Slice/update_contact"

export default configureStore({
    reducer: {
        contact_list: contactReducer,
        postContact: postContactReducer,
        deleteContact: deleteContactReducer,
        updateContact: updateContactReducer,
    }
})