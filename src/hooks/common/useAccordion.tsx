"use client";

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type AccordionProps = {
  title: string;
  isOpen: boolean;
  toggleAccordion: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
};

function useAccordion(initialOpen: boolean = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const closeAccordion = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    toggleAccordion,
    closeAccordion,
  };
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  isOpen,
  toggleAccordion,
  children,
  icon,
}) => {
  return (
    <div className="mb-2 w-full rounded-lg">
      <div
        className="flex cursor-pointer items-center justify-between p-4"
        onClick={toggleAccordion}
      >
        <div className="flex items-center">
          {icon && <div className="mr-4 text-xl">{icon}</div>}
        </div>
        <div className="flex-grow text-center">
          <div className="font-medium text-xl">{title}</div>
        </div>
        <div className="text-xl">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>
      {isOpen && <div className="border-t p-4">{children}</div>}
    </div>
  );
};

export { Accordion, useAccordion };
