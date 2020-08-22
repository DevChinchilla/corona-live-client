import React from "react";
import { Box } from "@components/Layout";

const ArrowLeft = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M19 12H6m6-7l-7 7 7 7"></path>
    </svg>
  );
};

const ArrowRight = () => {
  return (
    <Box transform={"rotate(180deg)"}>
      <ArrowLeft></ArrowLeft>
    </Box>
  );
};

const ArrowUp = () => {
  return (
    <Box transform={"rotate(90deg)"}>
      <ArrowLeft></ArrowLeft>
    </Box>
  );
};

const ArrowDown = () => {
  return (
    <Box transform={"rotate(-90deg)"}>
      <ArrowLeft></ArrowLeft>
    </Box>
  );
};

export default {
  ArrowLeft: React.memo(ArrowLeft),
  ArrowRight: React.memo(ArrowRight),
  ArrowUp: React.memo(ArrowUp),
  ArrowDown: React.memo(ArrowDown),
};
