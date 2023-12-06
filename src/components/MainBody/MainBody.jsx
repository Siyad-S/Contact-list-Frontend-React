import React, {useState} from "react";
import "./MainBody.css";
import Table from "../Body/Table";

const MainBody = () => {
  const [showOverlay, setShowOverlay] = useState("");

  return (
    <>
      <div className="mainBody">
        <div className="contactShower_table">
          <Table showOverlay={showOverlay} setShowOverlay={setShowOverlay} />
        </div>
      </div>
    </>
  );
};

export default MainBody;
