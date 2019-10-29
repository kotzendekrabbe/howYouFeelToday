import React, { PropsWithChildren, useState, useContext } from "react";
import { ToggleButtons } from "./toggle-buttons";
import { Button } from "./button";
import { DataStorageContext, Mood } from "./data-storage";

export function FormButtons({ children }: PropsWithChildren<{}>) {
  const [buttonName, setButtonName] = useState<Mood | undefined>(undefined);
  const dataStorage = useContext(DataStorageContext);

  return (
    <form>
      <ToggleButtons onActiveButtonChange={value => setButtonName(value)}>
        <Button label="good" value="good" />
        <Button label="bad" value="bad" />
      </ToggleButtons>

      <button
        type="button"
        // ! means - I'm sure that you are wrong compiler ;)
        onClick={() => dataStorage.save(buttonName!)}
        disabled={!Boolean(buttonName)}
      >
        Submit
      </button>
    </form>
  );
}
