import React from "react";

const Description = ({ data }) => {
  const truncateText = (text) => {
    if (!data) {
      return "";
    }
    return text.length > 20 ? text.substring(0, 18) + "..." : text;
  };
  return <div className="p-2 m-2">{truncateText(data.description)}</div>;
};

export default Description;
