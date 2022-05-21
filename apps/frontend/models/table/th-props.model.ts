import React from "react";

export interface ThProps {
  children?: React.ReactNode;
  reversed?: boolean;
  sorted?: boolean;

  onSort(): void;
};
