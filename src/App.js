import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const initialValues = {
    employeename: "",
    age: "",
    mobilenumber: "",
    gender: "",
    birthyear: "",
    maritalstatus:"",
    department: "",
    designation: "",
    address: ""
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [apiData, setApiData] = useState(null); 
  const [empleedata, setEmpleedata] = useState({
    emp_name: "",
    emp_contact: "",
    emp_gender: "",
    emp_age: "",
    emp_birth_year: "",
    emp_marital_status: "",
    emp_department: "",
    emp_designation: "",
    emp_address: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpleedata({ ...empleedata, [name]: value });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setFormErrors(validate(formValues));
//     setIsSubmit(true);
    
//   };




const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(empleedata));
    setIsSubmit(true);

    // Assuming you have an API endpoint
    const apiUrl = "http://localhost:8080/api/v1/auth/login";
    const apiurl1 = "http://localhost:8080/api/v1/employee/submitDetails";

    const loginData = {
        userName: "vicky",
        password: "vicky",
      }
      
      
    
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Add any other headers your API requires
            },
            body: JSON.stringify(loginData),
          });

      
      const data = await response.json();
      var token = data.accessToken;
      setApiData(data);
    } catch (error) {
      console.error("Error fetching data from the API:", error);
    }

    try {
        const res = await fetch(apiurl1, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
              // Add any other headers your API requires
            },
            body: JSON.stringify(empleedata),
          });

      
      const data = await res.json();
      setApiData(data);
    } catch (error) {
      console.error("Error fetching data from the API:", error);
    }
  };

  useEffect(() => {

    
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues, empleedata);
    }

    
  }, [formErrors, formValues,empleedata, isSubmit]);
  const validate = (values) => {
    const errors = {};
    const regex = /^(1[8-9]|[2-9][0-9]|100)$/i;
    const regex1 = /^\d{10}$/i;

    if (!values.emp_name) {
      errors.emp_name = "employee name is required!";
    }
    if (!values.age) {
      errors.age = "Age is required!";
    } else if (!regex.test(values.age)) {
      errors.age = "This is not a valid Age!";
    }
    if (!values.mobilenumber) {
      errors.mobilenumber = "Mobile Number is required!";
    } else if (!regex1.test(values.mobilenumber)) {
      errors.mobilenumber = "This is not a valid Mobile Number!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Those passwords didn’t match. Try again.";
    }
    return errors;
  };

  return (
    <>
      <div className="bgImg"></div>
      <div className="container">
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className="ui message success">Signed in successfully</div>
        ) : (
          console.log("Entered Details", empleedata)
        )}

        <form onSubmit={handleSubmit}>
          <h1>Employee Details Form</h1>
          <div className="ui divider"></div>
          <div className="ui form">
            <div className="field">
              <label>Employee Name</label>
              <input
                type="text"
                name="emp_name"
                placeholder="Choose a employee name"
                value={empleedata.emp_name}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.employeename}</p>
            <div className="field">
              <label>Age</label>
              <input
                type="number"
                name="emp_age"
                placeholder="Age"
                value={empleedata.emp_age}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.emp_age}</p>
            <div className="field">
              <label>Mobile No.</label>
              <input
                type="number"
                name="emp_contact"
                placeholder="Mobile No."
                value={empleedata.emp_contact}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.emp_contact}</p>
            <div className="field">
              <label>Gender</label>
              <select
                name="emp_gender"
                value={empleedata.emp_gender}
                onChange={handleChange}
              >
                <option value="select">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="field">
              <label>Birth Year</label>
              <input
                type="number"
                name="emp_birth_year"
                placeholder="Birth Year"
                value={empleedata.emp_birth_year}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label>Marital Status</label>
              <select
                name="emp_marital_status"
                value={empleedata.emp_marital_status}
                onChange={handleChange}
              >
                <option value="">Select Marital Status</option>
                <option value="married">Married</option>
                <option value="single">Single</option>
              </select>
            </div>
            <div className="field">
              <label>Department</label>
              <select
                name="emp_department"
                value={empleedata.emp_department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                <option value="it">IT</option>
                <option value="business">Business</option>
                <option value="sales">Sales</option>
              </select>
            </div>
            <div className="field">
              <label>Designation</label>
              <select
                name="emp_designation"
                value={empleedata.emp_designation}
                onChange={handleChange}
              >
                <option value="">Select Designation</option>
                <option value="developer">Developer</option>
                <option value="admin">IT Admin</option>
              </select>
            </div>
            <div className="field">
              <label>Address</label>
              <input
                type="text"
                name="emp_address"
                placeholder="Address"
                value={empleedata.emp_address}
                onChange={handleChange}
              />
            </div>

            <button className="fluid ui button blue">Submit</button>
          </div>
        </form>
        <div className="text">
          Already have an account? <span>Login</span>
        </div>
      </div>{" "}
    </>
  );
}

export default App;
