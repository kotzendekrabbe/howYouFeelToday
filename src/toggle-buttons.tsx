import React, { PropsWithChildren, useState } from "react";

export interface ToggleButtonsProps {
  onActiveButtonChange(value: string): void;
}

export function ToggleButtons({
  children,
  onActiveButtonChange
}: PropsWithChildren<ToggleButtonsProps>) {
  const [activeButton, setActiveButton] = useState<string | undefined>(
    undefined
  );
  return (
    <>
      {React.Children.map(children, child => {
        return React.isValidElement(child)
          ? React.cloneElement(child, {
              onClick: (value: string) => {
                setActiveButton(value);
                onActiveButtonChange(value);
              },
              isActive: activeButton === child.props.value
            })
          : child;
      })}
    </>
  );
}
