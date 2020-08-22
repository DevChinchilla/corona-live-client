import React from "react";
import { Box } from "@components/Layout";

const ChevronLeft = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="feather feather-chevron-left"
      viewBox="0 0 24 24"
    >
      <path d="M15 18L9 12 15 6"></path>
    </svg>
  );
};

const ChevronRight = () => {
  return (
    <Box transform={"rotate(180deg)"}>
      <ChevronLeft></ChevronLeft>
    </Box>
  );
};

const ChevronUp = () => {
  return (
    <Box transform={"rotate(90deg)"}>
      <ChevronLeft></ChevronLeft>
    </Box>
  );
};

const ChevronDown = () => {
  return (
    <Box transform={"rotate(-90deg)"}>
      <ChevronLeft></ChevronLeft>
    </Box>
  );
};

export default {
  ChevronLeft: React.memo(ChevronLeft),
  ChevronRight: React.memo(ChevronRight),
  ChevronUp: React.memo(ChevronUp),
  ChevronDown: React.memo(ChevronDown),
};
