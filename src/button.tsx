import React, { PropsWithChildren } from "react";

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
    <button onClick={() => onClick && onClick(value)} type="button">
      {label} {isActive ? "*" : ""}
    </button>
  );
}

// < > generics, kommt aus der Java Welt
