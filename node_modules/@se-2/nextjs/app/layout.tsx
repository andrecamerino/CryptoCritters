import React from "react";
import Main from "../pages/Index/Index";
import "../styles/globals.css";

export const layout = () => {
  return (
    <>
      <html>
        <body>
          <Main />
        </body>
      </html>
    </>
  );
};

export default layout;
