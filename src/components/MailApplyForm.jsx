import React, { useState } from "react";
import { toast } from "react-toastify";
import Validation from "../backend/Validation";
import Loading from "./Loading";
import { storage, database } from "../firebase";
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref as dbRef, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { getUnixTime } from "date-fns";

function MailApplyForm({ closeForm }) {
  const [formData, setFormData] = useState({
    fullName: "",
    degreeLevel: "",
    major: "",
    japaneseLevel: "",
    religion: "",
    gender: "",
    emailAddress: "",
    phNumber: "",
    selectedPosition: "",
    cv: "",
  });
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const jobOptions = ["QA Engineer", "Front-end Engineer", "Japanese Teacher", "School Admin", "Admin"];
  const degreeOptions = ["Diploma", "Bachelor", "Master", "Not Graduated"];
  const jpLevelOptions = ["Not Yet", "N5 (Studying)", "N5 (Passed)", "N4 (Studying)", "N4 (Passed)", "N3 (Studying)", "N3 (Passed)", "N2 (Studying)", "N2 (Passed)"];
  const religionOptions = ["Buddhist", "Christian", "Muslim", "Hindu", "Other"];
  const genderOptions = ["Male", "Female", "Prefer not to say"];

  const sendData = () => {
    setLoading(true);
    if (formData.fullName && formData.degreeLevel && formData.major && formData.japaneseLevel && formData.gender && formData.religion && formData.emailAddress && formData.phNumber && formData.selectedPosition && formData.cv) {
      const uniqueId = uuidv4();
      const storageReference = storageRef(storage, `files/${formData.cv.name}`);
      const uploadTask = uploadBytesResumable(storageReference, formData.cv);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error(error);
          setLoading(false);
          toast.error("Failed to upload file.");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const dbReference = dbRef(database, `applicantsdb/${uniqueId}`);
            set(dbReference, {
              id: uniqueId,
              name: formData.fullName,
              degreeLevel: formData.degreeLevel,
              major: formData.major,
              japaneseLevel: formData.japaneseLevel,
              religion: formData.religion,
              gender: formData.gender,
              emailAddress: formData.emailAddress,
              phNumber: formData.phNumber,
              selectedPosition: formData.selectedPosition,
              url: downloadURL,
              timestamp: getUnixTime(new Date()),
            })
              .then(() => {
                toast.success("Your application form has been sent successfully");
                setFormData({
                  fullName: "",
                  degreeLevel: "",
                  major: "",
                  japaneseLevel: "",
                  religion: "",
                  gender: "",
                  emailAddress: "",
                  phNumber: "",
                  selectedPosition: "",
                  cv: "",
                });
                setLoading(false);
                setProgress(0);
                closeForm();
              })
              .catch((error) => {
                // console.error(error);
                setLoading(false);
                toast.error("Failed to save data.");
              });
          });
        }
      );
    } else {
      setLoading(false);
      toast.error("All fields are required.");
    }
  };

  const sendEmail = async () => {
    const requestBody = {
      fullName: formData.fullName,
      phNumber: formData.phNumber,
      emailAddress: formData.emailAddress,
      selectedPosition: formData.selectedPosition,
    };

    try {
      const res = await fetch(import.meta.env.VITE_EMAIL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();
      // console.log("Data is", data);

      if (data.status === 401 || !data) {
        toast.error("Email Can't Send");
      } else {
        toast.success("You've received an email from the Qualy Myanmar Recruit Team. Please check your inbox.");
      }
    } catch (error) {
      toast.error("Email Can't Send");
    }
  };

  const handleValidation = async (e) => {
    e.preventDefault();
    const validationErrors = Validation({ formData });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // If no validation errors, send the email
      await sendData();
      // console.log("Form submitted:", formData);
      await sendEmail();
    } else {
      // console.log("Form has validation errors");
      toast.error("Form has validation errors");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const cv = e.target.files[0];
    setFormData({ ...formData, cv });
  };

  return (
    <>
      {loading ? <Loading /> : ""}
      <div className="form">
        <form>
          <div className="row">
            <label htmlFor="fullName">Full Name *</label>
            <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Mr. Mg Mg" />
            {errors.fullName && <span className="error-txt">{errors.fullName}</span>}
          </div>
          <div className="row">
            <label htmlFor="degreeLevel">Degree Level *</label>
            <select id="degreeLevel" name="degreeLevel" value={formData.degreeLevel} onChange={handleInputChange}>
              <option value="" disabled>
                Choose
              </option>
              {degreeOptions.map((degree, index) => (
                <option key={index} value={degree}>
                  {degree}
                </option>
              ))}
            </select>
            {errors.degreeLevel && <span className="error-txt">{errors.degreeLevel}</span>}
          </div>
          <div className="row">
            <label htmlFor="fullName">Graduated Major *</label>
            <input type="text" id="major" name="major" value={formData.major} onChange={handleInputChange} placeholder="Computer Science" />
            {errors.major && <span className="error-txt">{errors.major}</span>}
          </div>
          <div className="row">
            <label htmlFor="japaneseLevel">Japanese Level *</label>
            <select id="japaneseLevel" name="japaneseLevel" value={formData.japaneseLevel} onChange={handleInputChange}>
              <option value="" disabled>
                Choose
              </option>
              {jpLevelOptions.map((level, index) => (
                <option key={index} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {errors.japaneseLevel && <span className="error-txt">{errors.japaneseLevel}</span>}
          </div>
          <div className="row">
            <label htmlFor="religion">Religion *</label>
            <select id="religion" name="religion" value={formData.religion} onChange={handleInputChange}>
              <option value="" disabled>
                Choose
              </option>
              {religionOptions.map((religion, index) => (
                <option key={index} value={religion}>
                  {religion}
                </option>
              ))}
            </select>
            {errors.religion && <span className="error-txt">{errors.religion}</span>}
          </div>
          <div className="row">
            <label htmlFor="gender">Gender *</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange}>
              <option value="" disabled>
                Choose
              </option>
              {genderOptions.map((gender, index) => (
                <option key={index} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
            {errors.gender && <span className="error-txt">{errors.gender}</span>}
          </div>
          <div className="row">
            <label htmlFor="emailAddress">Email Address *</label>
            <input type="text" id="emailAddress" name="emailAddress" value={formData.emailAddress} onChange={handleInputChange} placeholder="example@gmail.com" />
            {errors.emailAddress && <span className="error-txt">{errors.emailAddress}</span>}
          </div>
          <div className="row">
            <label htmlFor="phNumber">Phone Number *</label>
            <input type="number" id="phNumber" name="phNumber" value={formData.phNumber} onChange={handleInputChange} placeholder="09-0000 0000" />
            {errors.phNumber && <span className="error-txt">{errors.phNumber}</span>}
          </div>
          <div className="row">
            <label htmlFor="selectedPosition">Which position are you interested in? *</label>
            <select id="selectedPosition" name="selectedPosition" value={formData.selectedPosition} onChange={handleInputChange}>
              <option value="" disabled>
                Choose
              </option>
              {jobOptions.map((position, index) => (
                <option key={index} value={position}>
                  {position}
                </option>
              ))}
            </select>
            {errors.selectedPosition && <span className="error-txt">{errors.selectedPosition}</span>}
          </div>
          <div className="row mb50 mb30-sp">
            <label htmlFor="cv">Upload Resume Form & Certificates *</label>
            <input type="file" id="cv" onChange={handleFileChange} />
            {errors.cv && <span className="error-txt">{errors.cv}</span>}
            <span className="error-txt mt20">※Please combine the 'CV, Japanese Language Certificate, and Other Certificates' into a single PDF file and attach it.</span>
          </div>
          <div className="txt-right">
            <button type="submit" onClick={handleValidation} disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default MailApplyForm;
