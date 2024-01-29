import React, { useEffect, useRef, useState } from "react";
import curatorBB from "curator-bb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SimpleForm = () => {
  const [focusedField, setFocusedField] = useState(null);
  // const [initReturnMsg, setInitReturnMsg] = useState();
  const [errors, setErrors] = useState({
    userFullName: "",
    email: "",
    mobileNo:""})

  const callingOnceConfig = useRef(true);

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

 const validateUserFullName = (value) => {
  const minLength = 2;
  const maxLength = 50;
  if (!value) {
    setErrors((prevErrors) => ({ ...prevErrors, userFullName: "Please enter a username" }));
  } else if (/\s/.test(value)) {
    setErrors((prevErrors) => ({ ...prevErrors, userFullName: "Username should not contain spaces between characters" }));
  } else if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(value)) {
    setErrors((prevErrors) => ({ ...prevErrors, userFullName: "Username should start with a letter, and can only contain letters and numbers" }));
  } else if (value.length < minLength || value.length > maxLength) {
    setErrors((prevErrors) => ({ ...prevErrors, userFullName: `Username must be between ${minLength} and ${maxLength} characters` }));
  } else {
    setErrors((prevErrors) => ({ ...prevErrors, userFullName: "" }));
  }
};

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Please enter an email address" }));
    } else if (!emailRegex.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Please enter a valid email address" }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };  

  const validateMobileNo = (value) => {
    const mobileRegex = /^[0-9]{10}$/;
    
    if (!value) {
      setErrors((prevErrors) => ({ ...prevErrors, mobileNo: "Please enter a mobile number" }));
    } else if (!/^\d+$/.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, mobileNo: "Please enter a valid mobile number, it should not contain letters" }));
    } 
    else if (value.length > 10) {
      setErrors((prevErrors) => ({ ...prevErrors, mobileNo: "Mobile number should not exceed 10 digits" }));
    }
    else if (!mobileRegex.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, mobileNo: "Mobile number should be 10 digits only" }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, mobileNo: "" }));
    }
  };  

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataObject = {
      UserFullName: formData.get("userFullName"),
      Email: formData.get("email"),
      MobileNo: formData.get("mobileNo"),
    };

    validateUserFullName(formDataObject.UserFullName);
    validateEmail(formDataObject.Email);
    validateMobileNo(formDataObject.MobileNo);
    if (!errors.userFullName && !errors.email && !errors.mobileNo) {
    curatorBB
      .curate({
        userDetails: formDataObject,
        onMessage: function (message) {
          console.log("Curate validation Message ==> ", message);
        },
      })
      .then((data) => {
        console.log("curate user :", data);
        toast(data == false ? "Invalid User" : "Valid User");
      })
      .catch((error) => {
        console.error("curate user :", error);
      });
    }
    else {
      toast.error("Please fix the errors in the form");
    }
  };

  useEffect(() => {
    if (callingOnceConfig.current) {
      callingOnceConfig.current = false;
      curatorBB
        .initialize({
          serverURL:
            "https://access.axiomprotect.com:6653/AxiomProtect/v1/PreRegistration",
          operatorId: "ganesh@mollatech.com",
          password:
            "$2a$10$CwTycUXWue0Thq9StjUM0uDm2YU7xlgzHFhFtTyhQWtk5i/LLbTDu",
          appId: "kQ7DD1",
          onMessage: function (message) {
            console.log("Initialize Message ==> ", message);
          },
        })
        .then((data) => {
          console.log(data);
          // setInitReturnMsg(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        style={{
          width: "50%",
          padding: "20px",
          borderTopLeftRadius: "15px",
          borderBottomRightRadius: "15px",
          borderTopRightRadius: "0px",
          borderBottomLeftRadius: "0px",
          boxShadow: "0 0 10px rgba(63, 81, 181, 0.5)",
          backgroundColor: "#ffffff",
        }}
      >
        <h2 style={{ color:'#000', marginTop:0, }}
        >
          CONTACT US
        </h2>
        <label
          htmlFor="userFullName"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "8px",
            paddingLeft: "10px",
            fontWeight: "bold",
            color: focusedField === "userFullName" ? "#3f51b5" : "#000000",
            transition: "color 0.3s ease-in-out",
          }}
        >
          User Full Name
        </label>
        <input
          type="text"
          id="userFullName"
          name="userFullName"
          required
          onFocus={() => handleFocus("userFullName")}
          onBlur={handleBlur}
          onChange={(e) => {
            validateUserFullName(e.target.value);
          }}
          style={{
            width: "95%",
            padding: "10px",
            marginBottom: "16px",
            border:
              focusedField === "userFullName" ? "2px solid #3f51b5" : "none",
            borderBottom: `2px solid ${
              focusedField === "userFullName" ? "#3f51b5" : "#ced4da"
            }`,
            outline: "none",
            transition: "border-color 0.5s ease-in-out",
          }}
        />
  {errors.userFullName && <div style={{ color: "red",marginBottom:"10px",marginTop:"-10px",fontSize:"15px",textAlign:"start",paddingLeft:"10px" }}>({errors.userFullName})</div>}
        <label
          htmlFor="email"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "8px",
            paddingLeft: "10px",
            fontWeight: "bold",
            color: focusedField === "email" ? "#3f51b5" : "#000000",
            transition: "color 0.5s ease-in-out",
          }}
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onFocus={() => handleFocus("email")}
          onBlur={handleBlur}
          onChange={(e) => {
            validateEmail(e.target.value);
          }}
          style={{
            width: "95%",
            padding: "10px",
            marginBottom: "16px",
            border: focusedField === "email" ? "2px solid #3f51b5" : "none",
            borderBottom: `2px solid ${
              focusedField === "email" ? "#3f51b5" : "#ced4da"
            }`,
            outline: "none",
            transition: "border-color 0.5s ease-in-out",
          }}
        />
  {errors.email && <div style={{ color: "red",marginBottom:"10px",marginTop:"-10px",fontSize:"15px",textAlign:"start",paddingLeft:"10px" }}>({errors.email})</div>}
        <label
          htmlFor="mobileNo"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "8px",
            paddingLeft: "10px",
            fontWeight: "bold",
            color: focusedField === "mobileNo" ? "#3f51b5" : "#000000",
            transition: "color 0.5s ease-in-out",
          }}
        >
          Mobile Number
        </label>
        <input
          type="tel"
          id="mobileNo"
          name="mobileNo"
          required
          onFocus={() => handleFocus("mobileNo")}
          onBlur={handleBlur}
          onChange={(e) => {
            validateMobileNo(e.target.value);
          }}
          style={{
            width: "95%",
            padding: "10px",
            marginBottom: "16px",
            border: focusedField === "mobileNo" ? "2px solid #3f51b5" : "none",
            borderBottom: `2px solid ${
              focusedField === "mobileNo" ? "#3f51b5" : "#ced4da"
            }`,
            outline: "none",
            transition: "border-color 0.5s ease-in-out",
          }}
        />
        {errors.mobileNo && <div style={{ color: "red",marginBottom:"10px",marginTop:"-10px",fontSize:"15px",textAlign:"start",paddingLeft:"10px" }}>({errors.mobileNo})</div>}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="submit"
            style={{
              padding: "12px",
              marginTop: "10px",
              fontSize: "14px",
              minWidth: "100px",
              backgroundColor: "#3f51b5",
              color: "#ffffff",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              transition: "background-color 0.3s ease-in-out",
            }}
          >
            Submit
          </button>
        </div>
        <span style={{ color: "#000", }}>Powered by BB</span>
      </form>
    </div>
  );
};

export default SimpleForm;
