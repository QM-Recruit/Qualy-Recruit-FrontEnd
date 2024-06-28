import React, { useState, useEffect } from "react";
import { Button, message, Modal } from "antd";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { database, storage } from "../firebase";
import { ref as dbRef, onValue, remove } from "firebase/database";
import { ref as storageRef, getStorage, deleteObject } from "firebase/storage";

function ShowApplicants() {
  const [loading, setLoading] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const { confirm } = Modal;

  useEffect(() => {
    setLoading(true);
    const applicantsRef = dbRef(database, "applicantsdb/");
    onValue(applicantsRef, (snapshot) => {
      const data = snapshot.val();
      const applicantsList = data ? Object.values(data) : [];
      const sortedList = applicantsList.sort((a, b) => a.timestamp - b.timestamp);
      setApplicants(sortedList);
      setLoading(false);
    });
  }, []);

  const handleDelete = (id, filePath) => {
    const storage = getStorage();
    confirm({
      title: "Are you sure you want to delete this applicant?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk() {
        setLoading(true);
        const dbReference = dbRef(database, `applicantsdb/${id}`);
        remove(dbReference)
          .then(() => {
            const storageReference = storageRef(storage, filePath);
            deleteObject(storageReference)
              .then(() => {
                message.success("Applicant deleted successfully");
                setLoading(false);
              })
              .catch((error) => {
                console.error(error);
                message.error("Failed to delete the file");
                setLoading(false);
              });
          })
          .catch((error) => {
            console.error(error);
            message.error("Failed to delete the applicant");
            setLoading(false);
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const exportToCSV = () => {
    const csvRows = [];
    const headers = ["No", "Name", "Degree Level", "Major", "Japanese Level", "Religion", "Gender", "Email Address", "Phone Number", "Position", "File"];

    // Add headers to CSV
    csvRows.push(headers.join(","));

    // Add data rows to CSV
    applicants.forEach((applicant, index) => {
      const rowData = [
        index + 1,
        applicant.name,
        applicant.degreeLevel,
        applicant.major,
        applicant.japaneseLevel,
        applicant.religion,
        applicant.gender,
        applicant.emailAddress,
        applicant.phNumber,
        applicant.selectedPosition,
        applicant.url, // assuming `url` is the file URL
      ];
      csvRows.push(rowData.join(","));
    });

    // Create CSV content
    const csvContent = csvRows.join("\n");

    // Create a Blob object for the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a temporary URL for the Blob object
    const url = URL.createObjectURL(blob);

    // Create a link element to trigger download
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "applicants.csv");
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
  };

  return (
    <div className="admin-panel">
      {loading && <Loading />}
      <div className="limiter two applicants">
        <h2>Applicants Data</h2>
        <div className="container-table100">
          <div className="wrap-table100">
            <div className="table">
              <div className="row header">
                <div className="cell">No</div>
                <div className="cell">Name</div>
                <div className="cell">Degree Level</div>
                <div className="cell">Major</div>
                <div className="cell">Japanese Level</div>
                <div className="cell">Religion</div>
                <div className="cell">Gender</div>
                <div className="cell">Email Address</div>
                <div className="cell">Phone Number</div>
                <div className="cell">Position</div>
                <div className="cell">File</div>
                <div className="cell">Action</div>
              </div>
              {applicants.map((applicant, index) => (
                <div key={applicant.id} className="row">
                  <div className="cell">{index + 1}</div>
                  <div className="cell">{applicant.name}</div>
                  <div className="cell">{applicant.degreeLevel}</div>
                  <div className="cell">{applicant.major}</div>
                  <div className="cell">{applicant.japaneseLevel}</div>
                  <div className="cell">{applicant.religion}</div>
                  <div className="cell">{applicant.gender}</div>
                  <div className="cell">{applicant.emailAddress}</div>
                  <div className="cell">{applicant.phNumber}</div>
                  <div className="cell">{applicant.selectedPosition}</div>
                  <div className="cell">
                    <Button type="primary" onClick={() => window.open(applicant.url, "_blank", "noopener noreferrer")}>
                      View PDF
                    </Button>
                  </div>
                  <div className="cell">
                    <Button type="primary" danger onClick={() => handleDelete(applicant.id, applicant.url)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button className="mt30" type="primary" onClick={exportToCSV}>
            Export to CSV
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ShowApplicants;
