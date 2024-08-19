import React from "react";

const CustomButton: React.FC<{
  type: string;
  title: string;
  customStyles: string;
  handleClick: () => void;
}> = ({ type, title, customStyles, handleClick }) => {
  const generateStyle = (type: string) => {
    if (type === "filled") {
      return {
        backgroundColor: "#EFBD48",
        color: "#ffffff",
      };
    }
  };

  return (
    <button
      onClick={handleClick}
      style={generateStyle(type)}
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
    >
      {title}
    </button>
  );
};

export default CustomButton;
