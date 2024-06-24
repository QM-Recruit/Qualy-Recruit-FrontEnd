import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, push, update, remove } from "firebase/database";
import { app } from "../firebase";
import { getUnixTime } from "date-fns";
import { Button, Flex } from "antd";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ValidationAdmin from "./ValidationAdmin";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const database = getDatabase(app);

function Posts() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [hirePerson, setHirePerson] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const jobOptions = ["QA Engineer", "Front-end Engineer", "Japanese Teacher", "School Admin", "Admin"];
  const genderOptions = ["Male", "Female", "Male/Female"];
  const { confirm } = Modal;

  const handleChange = (html) => {
    setDescription(html);
  };

  useEffect(() => {
    setLoading(true);
    // Fetch data from Firebase Realtime Database
    const dataRef = ref(database, "posts");
    onValue(dataRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        const dataArray = Object.entries(userData).map(([id, user]) => ({ id, ...user }));
        setData(dataArray);
      }
      setLoading(false);
    });
  }, [database]);

  const handleValidation = (e) => {
    e.preventDefault();
    const validationErrors = ValidationAdmin({ title, hirePerson, gender, value, date, description });
    if (Object.keys(validationErrors).length === 0) {
      // If no validation errors, send the email
      selectedUserId ? handleUpdateUser() : handleAddUser();
    } else {
      message.error("Please fill out all fields");
    }
  };

  const handleAddUser = () => {
    const dataRef = ref(database, "posts");
    const newUser = {
      title: title,
      hirePerson: hirePerson,
      gender: gender,
      value: value,
      date: date,
      description: description,
      showPost: showPost,
      timestamp: getUnixTime(new Date()), // Add timestamp
    };
    push(dataRef, newUser);
    message.success("Your post was added successfully.");
    setTitle("");
    setHirePerson("");
    setGender("");
    setValue("");
    setDate("");
    setDescription("");
    setShowPost(false);
    setShowModal(false);
  };

  const handleUpdateUser = () => {
    if (selectedUserId) {
      const dataRef = ref(database, `posts/${selectedUserId}`);
      const updatedUser = {
        title: title,
        hirePerson: hirePerson,
        gender: gender,
        value: value,
        date: date,
        description: description,
        showPost: showPost, // Ensure this is included
        timestamp: getUnixTime(new Date()), // Update timestamp
      };
      update(dataRef, updatedUser);
      message.success("Your post was updated successfully.");
      setTitle("");
      setHirePerson("");
      setGender("");
      setValue("");
      setDate("");
      setDescription("");
      setSelectedUserId(null);
      setShowModal(false);
    }
  };

  const handleDeleteUser = (id) => {
    confirm({
      title: "Are you sure to delete this post?",
      icon: <ExclamationCircleOutlined />,
      content: "",
      onOk() {
        // Delete user from Firebase Realtime Database
        const dataRef = ref(database, `posts/${id}`);
        remove(dataRef);
        message.success("Your post was deleted.");
      },
      onCancel() {},
    });
  };

  const handleSelectUser = (user) => {
    setTitle(user.title);
    setHirePerson(user.hirePerson);
    setGender(user.gender);
    setValue(user.value);
    setDate(user.date);
    setDescription(user.description);
    setShowPost(user.showPost); // Ensure this is set when selecting a user
    setSelectedUserId(user.id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTitle("");
    setHirePerson("");
    setGender("");
    setValue("");
    setDate("");
    setDescription("");
    setSelectedUserId(null);
  };

  const handleToggleShowPost = (user) => {
    const dataRef = ref(database, `posts/${user.id}`);
    const updatedUser = { ...user, showPost: !user.showPost };
    update(dataRef, updatedUser)
      .then(() => {
        message.success(`Post ${user.showPost ? "hidden" : "shown"} successfully.`);
      })
      .catch((error) => {
        message.error("Failed to update post visibility.");
        console.error(error);
      });
  };

  let count = 1;
  return (
    <>
      {loading && <Loading />}
      <div className="limiter two">
        <h2>Recruiter Posts</h2>
        <div className="txt-center">
          <Button type="primary" onClick={() => setShowModal(true)}>
            Add Post
          </Button>
        </div>
        <div className="container-table100">
          <div className="wrap-table100">
            <div className="table">
              <div className="row header">
                <div className="cell">No</div>
                <div className="cell">Title</div>
                <div className="cell">Person</div>
                <div className="cell">Gender</div>
                <div className="cell">Salary</div>
                <div className="cell">Date</div>
                <div className="cell">Description</div>
                <div className="cell">Action</div>
              </div>
              {data.map((user) => (
                <div className="row" key={user.id}>
                  <div className="cell">{count++}</div>
                  <div className="cell">{user.title}</div>
                  <div className="cell">{user.hirePerson}</div>
                  <div className="cell">{user.gender}</div>
                  <div className="cell">{user.value}</div>
                  <div className="cell">{user.date}</div>
                  {/* <div className="cell" dangerouslySetInnerHTML={{ __html: user.description }}></div> */}
                  <div className="cell" dangerouslySetInnerHTML={{ __html: user.description.slice(0, 30) + (user.description.length > 30 ? '...' : '') }}></div>
                  <div className="cell">
                    <Flex gap="small" justify="center">
                      <Button type="primary" onClick={() => handleSelectUser(user)}>
                        Edit
                      </Button>
                      <Button type="primary" danger onClick={() => handleDeleteUser(user.id)}>
                        Delete
                      </Button>
                      <Button type="primary" onClick={() => handleToggleShowPost(user)}>
                        {user.showPost ? "Hide Post" : "Show Post"}
                      </Button>
                    </Flex>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <form onSubmit={handleValidation}>
          <div className="modal mb100">
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal}></span>
              <select placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)}>
                <option value="" disabled>
                  Choose Position
                </option>
                {jobOptions.map((position, index) => (
                  <option key={index} value={position}>
                    {position}
                  </option>
                ))}
              </select>
              <input type="number" placeholder="Hire Person" value={hirePerson} onChange={(e) => setHirePerson(e.target.value)} />
              <select placeholder="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="" disabled>
                  Choose Gender
                </option>
                {genderOptions.map((gen, index) => (
                  <option key={index} value={gen}>
                    {gen}
                  </option>
                ))}
              </select>
              <input type="number" placeholder="Salary" value={value} onChange={(e) => setValue(e.target.value)} />
              <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
              <ReactQuill theme="snow" value={description} onChange={handleChange} placeholder="Write something..." />
              <button type="submit">{selectedUserId ? "Update Post" : "Add Post"}</button>
            </div>
          </div>
          <div className={`overlay ${showModal ? "show" : ""}`} onClick={() => setShowModal(false)}></div>
        </form>
      )}
    </>
  );
}

export default Posts;
