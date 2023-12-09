import Link from "next/link";
import React from "react";

const Dropdown = ({ title, link1, link2, link3, link4, label1, label2, label3, label4 }) => {
  const navLinks = [
    { href: link1, label: label1 },
    { href: link2, label: label2 },
    { href: link3, label: label3 },
    { href: link4, label: label4 },
  ];

  return (
    <div className="dropdown dropdown-hover bg-transparent">
      <div tabIndex={0} role="button" className="m-1 bg-transparent">
        {title}
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        {navLinks.map((item) => (
          <li key={item.label}>
            <Link href={`${item.href}`} className="font-montserrat leading-normal text-md text-slate-gray">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
