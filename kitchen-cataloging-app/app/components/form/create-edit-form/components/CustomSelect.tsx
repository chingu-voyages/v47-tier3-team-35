'use client'

import { useState, useEffect } from "react";

interface CustomSelect {
    space: string;
    spaces: string[];
    handleSpace: (val: string) => void;
}

const CustomSelect = ({space, spaces, handleSpace}: CustomSelect) => {

     const [animateLabelClass, setAnimateLabelClass] = useState(
       space ? "open" : "closed"
     );
     const [openSelect, setOpenSelect] = useState(false);

     useEffect(() => {
       if (space === "" && !openSelect && animateLabelClass === "open") {
         setAnimateLabelClass("deanimate-label");
       } else if (
         space === "" &&
         !openSelect &&
         animateLabelClass !== "closed"
       ) {
         setAnimateLabelClass("deanimate-label");
       } else if (openSelect && animateLabelClass !== "open") {
         setAnimateLabelClass("animate-label");
       }
       // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [openSelect]);
    
    
  return (
    <div
      className={`${
        openSelect ? "select-arrow-down" : "select-arrow-up"
      } relative z-10`}
    >
      <div
        className="relative select bg-default-sys-light-surface-container-lowest w-52 h-12 rounded-lg ps-4 border border-default-sys-light-outline-variant"
        id="space-select"
        onClick={() => setOpenSelect(!openSelect)}
      ></div>
      <input
        className="absolute h-0 w-0 opacity-0"
        value={space}
        name="space"
        readOnly
      ></input>
      <p className="space-selected absolute whitespace-nowrap pe-3 text-center font-semibold text-[1.125rem] text-default-sys-light-on-primary-fixed pointer-events-none">
        {space}
      </p>
      {(openSelect && space === '') && <p className="space-selected absolute whitespace-nowrap pe-3 text-center font-semibold text-[1.125rem] text-default-sys-light-outline-variant pointer-events-none">
        Choose Space
      </p>}
      <label
        className={`${animateLabelClass} absolute whitespace-nowrap pe-3 text-center font-semibold text-[1.125rem] text-default-sys-light-on-primary-fixed pointer-events-none`}
        htmlFor="space-select"
        id="space-label"
      >
        Choose Space
      </label>
      {openSelect && (
        <ul className="absolute -bottom-0.5 left-0 translate-y-full w-full bg-white rounded-b-lg">
          {spaces.map((spaceOption, i) => (
            <li
              className="space-item relative select bg-default-sys-light-surface-container-lowest w-52 h-12 text-center font-semibold text-[1.125rem] text-default-sys-light-on-primary-fixed pe-3 pt-3 border-b border-default-sys-light-outline-variant"
              key={i}
              onClick={() => {
                handleSpace(spaceOption);
                setOpenSelect(false);
              }}
            >
              {spaceOption}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomSelect
