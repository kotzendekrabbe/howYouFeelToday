import React, { PropsWithChildren } from "react";

export interface ButtonProps {
  readonly label: string;
  // optional for functions - questionmark has to be after the name BEFORE the klammern
  readonly isActive?: boolean;
  readonly value: string;
  click?(value: string): void;
}

// destructoring: props.label  -> const {label} = props -> {label}
export function Button({
  label,
  click,
  isActive,
  value
}: PropsWithChildren<ButtonProps>) {
  return (
    // click && click boolishe prüfung - short cut evaluation
    <button onClick={() => click && click(value)} type="button">
      {label} {isActive ? "*" : ""}
    </button>
  );
}

// < > generics, kommt aus der Java Welt
