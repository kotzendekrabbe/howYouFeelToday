import React, { PropsWithChildren, useState } from "react";
import { ToggleButtons } from "./toggle-buttons";
import { Button } from "./button";

export function FormButtons({ children }: PropsWithChildren<{}>) {
  const [, setButtonName] = useState<string | undefined>(undefined);
  return (
    <form>
      <ToggleButtons onActiveButtonChange={value => setButtonName(value)}>
        <Button label="good" value="good" />
        <Button label="bad" value="bad" />
      </ToggleButtons>
    </form>
  );
}
