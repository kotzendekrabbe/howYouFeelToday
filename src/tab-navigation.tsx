import React, {
  PropsWithChildren,
  useState,
  useEffect,
  ReactElement
} from "react";

// custom hook
function useForceRerender() {
  const [, changeHook] = useState(0);
  useEffect(() => {
    changeHook(1);
  }, []);
}

export function TabNavigation({ children }: PropsWithChildren<{}>) {
  useForceRerender();

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
      <div id="tabViews"></div>
    </>
  );
}
