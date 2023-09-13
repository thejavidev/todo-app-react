import React from "react";
import { bgCoverDark, bgCoverLight } from "../../assets";

const Heeder = ({ darkMode }) => {
  return (
    <>
      <section className="w-full">
        {darkMode ? (
          <img
            className="w-full h-[320px] object-cover"
            src={bgCoverDark}
            alt=""
          />
        ) : (
          <img
            className="w-full h-[320px] object-cover"
            src={bgCoverLight}
            alt=""
          />
        )}
      </section>
    </>
  );
};

export default Heeder;
