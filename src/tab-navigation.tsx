import React, { PropsWithChildren, useState, ReactElement } from "react";

export function TabNavigation({ children }: PropsWithChildren<{}>) {
  if (
    !children ||
    !Array.isArray(children) ||
    !React.isValidElement(children[0])
  ) {
    throw new Error("TabNavigation is missing Tabs as children");
  }

  const [tabActive, setTabActive] = useState<ReactElement>(
    children[0].props.tabID
  );

  return (
    <>
      {React.Children.map(children, child => {
        return React.isValidElement(child)
          ? React.cloneElement(child, {
              onClick: () => setTabActive(child.props.tabID),
              isActive: child.props.tabID === tabActive
            })
          : child;
      })}
    </>
  );
}
