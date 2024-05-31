export default function ValidationAdmin({ title, hirePerson, gender, value, date, description }) {
  const errors = {};
  if (title === "") {
    errors.title = "Title is required";
  }
  if (gender === "") {
    errors.gender = "Gender is required";
  }

  if (hirePerson === "") {
    errors.value = "HirePerson is required";
  }

  if (value === "") {
    errors.value = "Salary is required";
  }
  if (date === "") {
    errors.date = "Deadline is required";
  }
  if (description === "") {
    errors.description = "Description is required";
  }
  return errors;
}
