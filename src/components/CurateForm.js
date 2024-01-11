import React, { useEffect, useRef, useState } from "react";
import curatorBB from "curator-bb";

const SimpleForm = () => {
  const [focusedField, setFocusedField] = useState(null);
  const [initReturnMsg, setInitReturnMsg] = useState();

  const callingOnceConfig = useRef(true);

  // const serverURL = import.meta.env.VITE_SERVER_URL;
  // const operatorId = import.meta.env.VITE_OPERATOR_ID;
  // const password =
  //   "$2a$10$CwTycUXWue0Thq9StjUM0uDm2YU7xlgzHFhFtTyhQWtk5i/LLbTDu" ||
  //   import.meta.env.VITE_PASSWORD;
  // const appId = import.meta.env.VITE_APP_ID;

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // console.log({
    //   UserFullName: formData.get("userFullName"),
    //   Email: formData.get("email"),
    //   MobileNo: formData.get("mobileNo"),
    // });
    curatorBB
      .curate({
        userDetails: formData,
        onMessage: function (message) {
          console.log("Curate validation Message ==> ", message);
        },
      })
      .then((data) => {
        console.log("curate user :", data);
        alert(data ? "VALID USER !!" : "INVALID USER !!");
      })
      .catch((error) => {
        console.error("curate user :", error);
      });
  };

  useEffect(() => {
    // if (callingOnceConfig.current) {
    //   callingOnceConfig.current = false;
    //   curatorBB
    //     .initialize({
    //       serverURL: serverURL,
    //       operatorId: operatorId,
    //       password: password,
    //       appId: appId,
    //       onMessage: function (message) {
    //         console.log("Initialize Message ==> ", message);
    //       },
    //     })
    //     .then((data) => {
    //       console.log(data);
    //       setInitReturnMsg(data);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
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
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
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
      </form>
      <code>{JSON.stringify(initReturnMsg)}</code>
    </div>
  );
};

export default SimpleForm;
