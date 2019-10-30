import React, { useState, useCallback } from "react";
import { render } from "react-dom";
import { Tab } from "./tab";
import { TabNavigation } from "./tab-navigation";
import { FormButtons } from "./form-buttons";
import { DataStorageContext, dataStorage } from "./data-storage";
import { Feedback } from "./feedback";
import { Export } from "./export";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: #333333;
  }
`;

const Headline = styled.h2`
  font-size: 22px;
  font-family: monospace, sans-serif;
`;

function App() {
  const [formFeedback, setFormFeedback] = useState<
    "sent" | "error" | undefined
  >(undefined);

  const sentForm = useCallback(
    formStatus => {
      setFormFeedback(formStatus);

      setTimeout(() => {
        setFormFeedback(undefined);
      }, 2000);
    },
    [setFormFeedback]
  );

  return (
    <DataStorageContext.Provider value={dataStorage}>
      <GlobalStyles />
      <TabNavigation>
        <Tab label="Home" tabID={1}>
          <Headline>Hello World</Headline>
          <FormButtons sentForm={sentForm} />
          {formFeedback && <Feedback formFeedback={formFeedback} />}
        </Tab>
        <Tab label="Export" tabID={2}>
          <Headline>Hallo Überschrift</Headline>
          <Export />
        </Tab>
      </TabNavigation>
    </DataStorageContext.Provider>
  );
}

render(<App />, document.getElementById("app"));
