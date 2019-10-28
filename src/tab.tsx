import React, { PropsWithChildren } from "react";
import ReactDOM from "react-dom";

export interface TabProps {
  readonly label: string;
  readonly isActive?: boolean;
  readonly children: React.ReactNode;
  readonly tabID: number;
  click?(): void;
}

export function Tab({
  label,
  isActive,
  click,
  children
}: PropsWithChildren<TabProps>) {
  const tabView = document.getElementById("tabViews");
  if (!tabView) {
    return null;
    throw new Error("No View honey!");
  }
  return (
    <>
      <div onClick={() => click && click()}>
        {label} {isActive ? "*" : ""}
      </div>
      {isActive && ReactDOM.createPortal(children, tabView)}
    </>
  );
}
