import React from "react";
import { ProviderProps } from "../@types/blog";

const MainContainer = ({ children }: ProviderProps) => {
  return <div className="Main">{children}</div>;
};

export default MainContainer;
