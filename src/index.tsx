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
  * {
    box-sizing: border-box;
  }

  body {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 16px;
    color: #333333;
  }
`;

function App() {
  const [formFeedback, setFormFeedback] = useState<
    "sent" | "error" | undefined
  >(undefined);

  const [formChanged, setFormChanged] = useState(1);

  const sentForm = useCallback(
    formStatus => {
      setFormFeedback(formStatus);

      setTimeout(() => {
        setFormFeedback(undefined);
      }, 2000);

      setFormChanged(formChanged + 1);
    },
    [setFormFeedback, formChanged]
  );

  return (
    <DataStorageContext.Provider value={dataStorage}>
      <GlobalStyles />
      <TabNavigation>
        <Tab label="Home" tabID={1}>
          <FormButtons sentForm={sentForm} key={formChanged} />
          {formFeedback && <Feedback formFeedback={formFeedback} />}
        </Tab>
        <Tab label="Export" tabID={2}>
          <Export />
        </Tab>
      </TabNavigation>
    </DataStorageContext.Provider>
  );
}

render(<App />, document.getElementById("app"));
