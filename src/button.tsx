import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  display: block;
  margin: 10px 0;
  padding: 10px 15px;
  width: 100%;
  border: 0;
  background-color: #4502da;
  color: #fff;
  font-size: 1rem;
  box-shadow: none;
  text-align: left;
`;

export interface ButtonProps {
  readonly label: string;
  readonly isActive?: boolean;
  readonly value: string;
  // if the function is optional the questionmark has to be after the name and BEFORE the brackets
  onClick?(value: string): void;
}

// destructoring: props.label  -> const {label} = props -> {label}
export function Button({
  label,
  onClick,
  isActive,
  value
}: PropsWithChildren<ButtonProps>) {
  return (
    // click && click - short cut evaluation
    <StyledButton onClick={() => onClick && onClick(value)} type="button">
      {label} {isActive ? "*" : ""}
    </StyledButton>
  );
}

// < > generics, kommt aus der Java Welt
