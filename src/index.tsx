import React, { useEffect, useState, useCallback } from "react";
import { render } from "react-dom";
import { Tab } from "./tab";
import { TabNavigation } from "./tab-navigation";
import { FormButtons } from "./form-buttons";
import { DataStorageContext, dataStorage } from "./data-storage";
import { Feedback } from "./feedback";

// custom hook
function useForceRerender() {
  const [, changeHook] = useState(0);
  useEffect(() => {
    changeHook(1);
  }, []);
}

function App() {
  useForceRerender();
  const [formFeedback, setFormFeedback] = useState<
    "sent" | "error" | undefined
  >(undefined);

  const sentForm = useCallback(formStatus => setFormFeedback(formStatus), [
    setFormFeedback
  ]);

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
        </Tab>
      </TabNavigation>

      <div id="tabViews"></div>
    </DataStorageContext.Provider>
  );
}

render(<App />, document.getElementById("app"));
