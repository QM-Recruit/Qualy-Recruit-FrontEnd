export default function Validation({ formData }) {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (formData.fullName === "") {
    errors.fullName = "Name is Required";
  } else if (formData.fullName.length < 3) {
    errors.fullName = "Please enter at least 3 characters";
  }

  if (formData.emailAddress === "") {
    errors.emailAddress = "Email is Required";
  } else if (!emailRegex.test(formData.emailAddress)) {
    errors.emailAddress = "This email address is incorrect or invalid";
  }

  if (formData.phNumber === "") {
    errors.phNumber = "Phone Number is Required";
  } else if (formData.phNumber.length < 9) {
    errors.phNumber = "This number is invalid format";
  }

  if (formData.selectedPosition === "") {
    errors.selectedPosition = "Please select a position";
  }

  if (formData.degreeLevel === "") {
    errors.degreeLevel = "Please select a Degree Level";
  }

  if (formData.major === "") {
    errors.major = "Major is Required";
  }

  if (formData.japaneseLevel === "") {
    errors.japaneseLevel = "Please select a Japanese Level";
  }

  if (formData.religion === "") {
    errors.religion = "Please select a Religion";
  }

  if (formData.gender === "") {
    errors.gender = "Please select a Gender";
  }

  if (formData.cv === "") {
    errors.cv = "Please upload your resume form & certificates";
  } else if (formData.cv.type !== "application/pdf") {
    errors.cv = "Please upload a PDF file format";
  }
  return errors;
}
