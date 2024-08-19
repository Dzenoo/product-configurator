import React from "react";
import state from "@/store";
import { SketchPicker } from "react-color";
import { useSnapshot } from "valtio";

const ColorPicker: React.FC = () => {
  const snap = useSnapshot(state);

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={snap.color}
        disableAlpha
        onChange={(color) => (state.color = color.hex)}
      />
    </div>
  );
};

export default ColorPicker;
