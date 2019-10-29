import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { Tab } from "./tab";
import { TabNavigation } from "./tab-navigation";
import { FormButtons } from "./form-buttons";
import { DataStorageContext, dataStorage } from "./data-storage";

// custom hook
function useForceRerender() {
  const [, changeHook] = useState(0);
  useEffect(() => {
    changeHook(1);
  }, []);
}

function App() {
  useForceRerender();

  return (
    <DataStorageContext.Provider value={dataStorage}>
      <TabNavigation>
        <Tab label="Home" tabID={1}>
          <h1>Hello World</h1>
          <FormButtons />
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
