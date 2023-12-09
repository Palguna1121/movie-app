import React from "react";

const HeaderMenu = ({ title, subTitle }) => {
  return (
    <header className="text-center">
      {title ? <h2 className="text-xl font-bold text-light-900 sm:text-7xl">{title}</h2> : null}
      {subTitle ? <p className="max-w-md mx-auto mt-4 text-md text-light-500">{subTitle}</p> : null}
    </header>
  );
};

export default HeaderMenu;
