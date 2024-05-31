import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, push, update, remove } from "firebase/database";
import { app } from "../firebase";
import { toast } from "react-toastify";
import { Button, Flex } from "antd";
import Loading from "../components/Loading";

const database = getDatabase(app);

function Crud() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [selectedcompanyDataId, setSelectedcompanyDataId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Fetch data from Firebase Realtime Database
    const dataRef = ref(database, "company-data");
    onValue(dataRef, (snapshot) => {
      const companyData = snapshot.val();
      if (companyData) {
        const dataArray = Object.entries(companyData).map(([id, cData]) => ({ id, ...cData }));
        setData(dataArray);
      }
      setLoading(false);
    });
  }, [database]);

  const handleAddcData = () => {
    const dataRef = ref(database, "company-data");
    const newcData = {
      title: title,
      value: value,
    };
    push(dataRef, newcData);
    setTitle("");
    setValue("");
    setShowModal(false);
  };

  const handleUpdatecData = () => {
    if (selectedcompanyDataId) {
      const dataRef = ref(database, `company-data/${selectedcompanyDataId}`);
      const updatedcData = {
        title: title,
        value: value,
      };
      update(dataRef, updatedcData);
      toast.success("Updated Data Sucessfully");
      setTitle("");
      setValue("");
      setSelectedcompanyDataId(null);
      setShowModal(false);
    }
  };

  // const handleDeletecData = (id) => {
  //   // Delete cData from Firebase Realtime Database
  //   const dataRef = ref(database, `company-data/${id}`);
  //   remove(dataRef);
  // };

  const handleSelectcData = (cData) => {
    setTitle(cData.title);
    setValue(cData.value);
    setSelectedcompanyDataId(cData.id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTitle("");
    setValue("");
    setSelectedcompanyDataId(null);
  };
  let count = 1;

  return (
    <>
      <div className="limiter">
        <h2>Company Data</h2>
        <div className="container-table100">
          <div className="wrap-table100">
            <div className="table">
              <div className="row header">
                <div className="cell">No</div>
                <div className="cell">Data Name</div>
                <div className="cell">Data Value</div>
                <div className="cell">Action</div>
              </div>
              {data.map((cData) => (
                <div className="row" key={cData.id}>
                  <div className="cell">{count++}</div>
                  <div className="cell">{cData.title}</div>
                  <div className="cell"> {cData.value}</div>
                  <div className="cell">
                    <Button type="primary" onClick={() => handleSelectcData(cData)}>
                      Edit
                    </Button>
                  </div>
                  {/* <button onClick={() => handleDeletecData(cData.id)}>Delete</button> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {loading && <Loading />}

      {showModal && (
        <div>
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal}></span>
              <input type="text" placeholder="name" value={title} onChange={(e) => setTitle(e.target.value)} />
              <input type="text" placeholder="value" value={value} onChange={(e) => setValue(e.target.value)} />
              {selectedcompanyDataId ? <button onClick={handleUpdatecData}>Update Data</button> : <button onClick={handleAddcData}>Add Data</button>}
            </div>
          </div>
          <div className={`overlay ${showModal ? "show" : ""}`} onClick={() => setShowModal(false)}></div>
        </div>
      )}
    </>
  );
}

export default Crud;
