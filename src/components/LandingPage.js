import React from "react";
import SimpleForm from "./CurateForm";
import image from "./23322.jpg";

const LandingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          flex: "1 1 50%",
          padding: "20px",
          paddingLeft: "0px",
          textAlign: "center",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          height: "95vh",
        }}
      >
        <div style={{ marginTop: "2%" }}>
          <h1>Welcome to Our Website!</h1>
          <p style={{ fontWeight: "bold" }}>
            Explore and engage with our company.
          </p>
        </div>
        <div style={{ flex: "1 1 50%", height: "100%" }}>
          <SimpleForm />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
