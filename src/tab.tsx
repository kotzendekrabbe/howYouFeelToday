import React, { PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const TabLabel = styled.div`
  font-size: 16px;
  font-family: monospace, sans-serif;
  display: inline-block;
  margin: 0 0 0 15px;
`;

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
  }
  return (
    <>
      <TabLabel onClick={() => onClick && onClick()}>
        {label} {isActive ? "*" : ""}
      </TabLabel>
      {isActive && ReactDOM.createPortal(children, tabView)}
    </>
  );
}
