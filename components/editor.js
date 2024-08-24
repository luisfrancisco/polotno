import React from "react";
import { Button } from "@blueprintjs/core";
import { Spinner } from "@blueprintjs/core";
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
import { MyDesignsSection } from "./sections/my-designs-section";
import { QrSection } from "./sections/qr-section";
import { AIWriteMenu } from "./ai-text";
import Topbar from "./topbar/topbar";
import "@blueprintjs/core/lib/css/blueprint.css";
import "./blueprint.css";
import { unstable_useHtmlTextRender } from "polotno/config";
import { createStore } from "polotno/model/store";
import { createProject, ProjectContext } from "./project";
import { DEFAULT_SIZES } from "polotno/side-panel/size-panel";
import { loadFile } from "./file";
import { setTranslations } from "polotno/config";
import { useProject } from "./project";
import { BarcodeSection } from "./sections/bar-section";

import fr from "./translations/fr";
import en from "./translations/en";
import id from "./translations/id";
import ru from "./translations/ru";
import ptBr from "./translations/pt-br";

// load default translations
setTranslations(en);

// Define sections for the side panel
const sections = [
  MyDesignsSection,
  TextSection,
  PhotosSection,
  IconsSection,
  ElementsSection,
  BackgroundSection,
  UploadSection,
  LayersSection,
  BarcodeSection,
  QrSection,
  SizeSection,
];

unstable_useHtmlTextRender(true);

// Create the store with the provided key
const store = createStore({
  key: "nFA5H9elEytDyPyvKL7T", // you can create it here: https://polotno.com/cabinet/
  showCredit: false,
});

// Set store unit to millimeters and dpi to 300
store.setUnit({
  unit: "mm", // mm, cm, in, pt, px
  dpi: 300,
});

// Function to convert units to pixels
function convertToPx(unit, dpi, unitVal) {
  return unitToPx({
    unit,
    dpi,
    unitVal,
  });
}

// Clear the default sizes array and define new sizes
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

// Configure store bleed and ruler settings
store.toggleBleed(true);
store.toggleRulers(true);

// Set the initial size for the store
store.setSize(convertToPx("mm", 300, 63), convertToPx("mm", 300, 88), "true");

// Add a page to the store and configure its bleed and size
const page = store.addPage({});
store.activePage.set({
  bleed: convertToPx("mm", 300, 3),
  width: convertToPx("mm", 300, 63),
  height: convertToPx("mm", 300, 88),
}); // set bleed in pixels

const project = createProject({ store });
window.project = project;

const isStandalone = () => {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone
  );
};

const getOffsetHeight = () => {
  let safeAreaInsetBottom = 0;

  if (isStandalone()) {
    // Try to get the safe area inset using env() variables
    const safeAreaInsetBottomString = getComputedStyle(
      document.documentElement
    ).getPropertyValue("env(safe-area-inset-bottom)");
    if (safeAreaInsetBottomString) {
      safeAreaInsetBottom = parseFloat(safeAreaInsetBottomString);
    }

    // Fallback values for specific devices if env() is not supported
    if (!safeAreaInsetBottom) {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      if (/iPhone|iPad|iPod/i.test(userAgent) && !window.MSStream) {
        // This is an approximation; you might need to adjust this value based on testing
        safeAreaInsetBottom = 20; // Example fallback value for iPhone
      }
    }
  }

  return window.innerHeight - safeAreaInsetBottom;
};

const useHeight = () => {
  const [height, setHeight] = React.useState(getOffsetHeight());
  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setHeight(getOffsetHeight());
    });
  }, []);
  return height;
};

// Action controls component
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
          store.saveAsPDF({
            pixelRatio: 2,
            includeBleed: true,
            bleed: convertToPx("mm", 300, 3),
            cropMarkSize: convertToPx("mm", 300, 3),
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

// Editor component
export const Editor = () => {
  const height = useHeight();

  React.useEffect(() => {
    project.firstLoad();
  }, []);

  const handleDrop = (ev) => {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    // skip the case if we dropped DOM element from side panel
    // in that case Safari will have more data in "items"
    if (ev.dataTransfer.files.length !== ev.dataTransfer.items.length) {
      return;
    }
    // Use DataTransfer interface to access the file(s)
    for (let i = 0; i < ev.dataTransfer.files.length; i++) {
      loadFile(ev.dataTransfer.files[i], store);
    }
  };

  return (
    <ProjectContext.Provider value={project}>
      <div
        style={{
          width: "100vw",
          height: height + "px",
          display: "flex",
          flexDirection: "column",
        }}
        onDrop={handleDrop}
      >
        <Topbar store={store} />
        <div style={{ height: "calc(100vh - 50px)" }}>
          <PolotnoContainer className="polotno-app-container">
            <SidePanelWrap>
              <SidePanel store={store} sections={sections} />
            </SidePanelWrap>
            <WorkspaceWrap>
              <Toolbar
                store={store}
                components={{
                  ActionControls: ActionControls2,
                  TextAIWrite: AIWriteMenu,
                }}
              />
              <Workspace
                store={store}
                bleedColor="rgba(130, 54, 236, 0.25)"
                components={{ TextAIWrite: AIWriteMenu }}
              />
              <ZoomButtons store={store} />
              <PagesTimeline store={store} />
            </WorkspaceWrap>
          </PolotnoContainer>
        </div>
        {project.status === "loading" && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 5000,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
              }}
            >
              <Spinner />
            </div>
          </div>
        )}
      </div>
    </ProjectContext.Provider>
  );
};

export default Editor;
