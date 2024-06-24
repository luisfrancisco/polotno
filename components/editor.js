import React from "react";
import { Button } from "@blueprintjs/core";
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";
import { Toolbar } from "polotno/toolbar/toolbar";
import { PagesTimeline } from "polotno/pages-timeline";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import {
  SidePanel,
  TextSection,
  PhotosSection,
  BackgroundSection,
  UploadSection,
  ElementsSection,
  LayersSection,
  SizeSection,
} from "polotno/side-panel";
import { Workspace } from "polotno/canvas/workspace";
import { unitToPx } from "polotno/utils/unit";
import { DownloadButton } from "./download-button";
import { IconsSection } from "./sections/icons-section";

import "@blueprintjs/core/lib/css/blueprint.css";

import { createStore } from "polotno/model/store";
import { DEFAULT_SIZES } from "polotno/side-panel/size-panel";

const sections = [
  TextSection,
  PhotosSection,
  IconsSection,
  ElementsSection,
  BackgroundSection,
  UploadSection,
  LayersSection,
  SizeSection,
];

const store = createStore({
  key: "nFA5H9elEytDyPyvKL7T", // you can create it here: https://polotno.com/cabinet/
  // you can hide back-link on a paid license
  // but it will be good if you can keep it for Polotno project support
  showCredit: false,
});
const page = store.addPage();
store.setUnit({
  unit: "mm", // mm, cm, in, pt, px
  dpi: 300,
});
function convertToPx(unit, dpi, unitVal) {
  return unitToPx({
    unit,
    dpi,
    unitVal,
  });
}
DEFAULT_SIZES.length = 0; // Clear the array
DEFAULT_SIZES.push(
  ["Standard", 63.5, 88, "mm"],
  ["Standard USA", 56, 87, "mm"],
  ["Mini USA", 41, 63, "mm"],
  ["Standard USA Chimera", 57.5, 89, "mm"],
  ["Mini Chimera", 43, 65, "mm"],
  ["Euro", 59, 92, "mm"],
  ["Mini Euro", 45, 68, "mm"],
  ["Gold", 80, 120, "mm"],
  ["Silver", 70, 110, "mm"],
  ["Copper", 65, 100, "mm"],
  ["Tarot", 70, 120, "mm"],
  ["French Tarot", 61, 112, "mm"],
  ["Square", 70, 70, "mm"],
  ["Square Small", 60, 60, "mm"],
  ["Square Small +", 65, 65, "mm"],
  ["Square Medium", 80, 80, "mm"],
  ["Yucatan", 54, 80, "mm"],
  ["Slim", 45, 90, "mm"]
);

// show bleed area on the <Workspace />
store.toggleBleed(true);
store.toggleRulers(true);

store.setSize(convertToPx("mm", 300, 63), convertToPx("mm", 300, 88), "true");
store.activePage.set({
  bleed: convertToPx("mm", 300, 3),
  width: convertToPx("mm", 300, 63),
  height: convertToPx("mm", 300, 88),
}); // set bleed in pixels

const ActionControls2 = ({ store }) => {
  return (
    <div>
      <DownloadButton store={store} />
      <Button
        onClick={() => {
          store.saveAsImage({ pixelRatio: 0.2 });
        }}
        minimal
      >
        Thumbnail
      </Button>
      <Button
        minimal
        onClick={() => {
          store.setElementsPixelRatio(2);
          store.saveAsPDF({
            pixelRatio: 2,
            includeBleed: true,
            cropMarkSize: 20,
          });
        }}
      >
        Bleed + Crops
      </Button>
      <Button
        minimal
        onClick={() => {
          store.setElementsPixelRatio(2);
          store.saveAsPDF({ pixelRatio: 2, includeBleed: true });
        }}
      >
        Bleed
      </Button>
      <Button
        minimal
        onClick={() => {
          store.setElementsPixelRatio(2);
          store.saveAsImage({ pixelRatio: 2, includeBleed: false });
        }}
      >
        PNG
      </Button>
    </div>
  );
};

export const Editor = () => {
  return (
    <PolotnoContainer style={{ width: "100vw", height: "100vh" }}>
      <SidePanelWrap>
        <SidePanel store={store} sections={sections} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar
          store={store}
          components={{
            ActionControls: ActionControls2,
          }}
        />
        <Workspace store={store} />
        <ZoomButtons store={store} />
        <PagesTimeline store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

export default Editor;
