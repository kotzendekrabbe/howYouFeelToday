import React, { useState, useCallback } from "react";
import { render } from "react-dom";
import { Tab } from "./tab";
import { TabNavigation } from "./tab-navigation";
import { FormButtons } from "./form-buttons";
import { DataStorageContext, dataStorage } from "./data-storage";
import { Feedback } from "./feedback";
import { Export } from "./export";

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
      <TabNavigation>
        <Tab label="Home" tabID={1}>
          <h1>Hello World</h1>
          <FormButtons sentForm={sentForm} />
          {formFeedback && <Feedback formFeedback={formFeedback} />}
        </Tab>
        <Tab label="Export" tabID={2}>
          <h1>Hallo Überschrift</h1>
          <div>Hallo Welt</div>
          <Export />
        </Tab>
      </TabNavigation>
    </DataStorageContext.Provider>
  );
}

render(<App />, document.getElementById("app"));
