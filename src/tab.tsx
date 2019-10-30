import React, { PropsWithChildren, Props } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

export interface TabProps {
  readonly label: string;
  readonly isActive?: boolean;
  readonly children: React.ReactNode;
  readonly tabID: number;
  onClick?(): void;
}

const TabLabel = styled.div<{ isActive: boolean }>`
  display: inline-block;
  border-bottom: 1px solid #4502da;
  flex: 1 0 auto;

  padding: 10px 15px;
  cursor: pointer;

  ${props =>
    props.isActive
      ? `
      font-weight: bold; 
      border: 1px solid #4502da;
      border-bottom: 0;`
      : ` `};
`;

export function Tab({
  label,
  isActive,
  onClick: onClick,
  children,
  ...props
}: PropsWithChildren<TabProps>) {
  const tabView = document.getElementById("tabViews");
  if (!tabView) {
    return null;
  }
  return (
    <>
      <TabLabel
        onClick={() => onClick && onClick()}
        isActive={isActive ? true : false}
      >
        {label}{" "}
      </TabLabel>
      {isActive && ReactDOM.createPortal(children, tabView)}
    </>
  );
}
