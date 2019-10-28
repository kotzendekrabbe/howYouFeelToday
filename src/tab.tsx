import React, { PropsWithChildren } from "react";
import ReactDOM from "react-dom";

export interface TabProps {
  readonly label: string;
  readonly isActive?: boolean;
  readonly children: React.ReactNode;
  readonly tabID: number;
  onClick?(): void;
}

export function Tab({
  label,
  isActive,
  onClick: onClick,
  children
}: PropsWithChildren<TabProps>) {
  const tabView = document.getElementById("tabViews");
  if (!tabView) {
    return null;
    throw new Error("No View honey!");
  }
  return (
    <>
      <div onClick={() => onClick && onClick()}>
        {label} {isActive ? "*" : ""}
      </div>
      {isActive && ReactDOM.createPortal(children, tabView)}
    </>
  );
}
