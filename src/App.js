import "./App.css";
import MainBody from "./components/MainBody/MainBody";

function App() {
  return (
    <div className="App">
      {/* <div className="main_head">
        <h1>Contact List</h1>
      </div> */}
      <div className="table_container">
        <div className="table_card">
          <MainBody />
        </div>
      </div>
    </div>
  );
}

export default App;
