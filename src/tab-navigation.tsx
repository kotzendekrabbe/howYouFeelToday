import React, {
  PropsWithChildren,
  useState,
  useEffect,
  ReactElement
} from "react";
import styled from "styled-components";

const StyledTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

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
      <StyledTabs>
        {React.Children.map(children, child => {
          return React.isValidElement(child)
            ? React.cloneElement(child, {
                onClick: () => setTabActive(child.props.tabID),
                isActive: child.props.tabID === tabActive
              })
            : child;
        })}
      </StyledTabs>

      <div id="tabViews"></div>
    </>
  );
}
