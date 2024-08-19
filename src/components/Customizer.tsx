"use client";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import { motion } from "framer-motion";
import { DecalTypes, EditorTabs, FilterTabs } from "@/config/constants";
import { reader } from "@/config/helpers";
import { fadeAnimation, slideAnimation } from "@/config/motion";
import CustomButton from "./CustomButton";
import Tab from "./Tab";
import FilePicker from "./FilePicker";
import ColorPicker from "./ColorPicker";
import state from "@/store";

interface FilterTabState {
  logoShirt: boolean;
  stylishShirt: boolean;
}

type DecalType = "logo" | "full";

const Customizer: React.FC = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState<File | null>(null);
  const [activeEditorTab, setActiveEditorTab] = useState<string>("");
  const [activeFilterTab, setActiveFilterTab] = useState<any>({
    logoShirt: true,
    stylishShirt: false,
  });

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      default:
        return null;
    }
  };

  const handleDecals = (type: DecalType, result: string) => {
    const decalType = DecalTypes[type] as any;

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName: keyof FilterTabState) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    setActiveFilterTab((prevState: any) => ({
      ...prevState,
      [tabName]: !prevState[tabName],
    }));
  };

  const readFile = (type: DecalType) => {
    if (file) {
      reader(file).then((result: any) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      });
    }
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name as keyof FilterTabState]}
                handleClick={() =>
                  handleActiveFilterTab(tab.name as keyof FilterTabState)
                }
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
