import React from 'react';
import { Button } from '@blueprintjs/core';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { PagesTimeline } from 'polotno/pages-timeline';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { SidePanel } from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';
import { unitToPx } from 'polotno/utils/unit';
import { DownloadButton } from './download-button';

import '@blueprintjs/core/lib/css/blueprint.css';

import { createStore } from 'polotno/model/store';





const store = createStore({
  key: 'nFA5H9elEytDyPyvKL7T', // you can create it here: https://polotno.com/cabinet/
  // you can hide back-link on a paid license
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});
const page = store.addPage();

var pxH = unitToPx({
  unit: 'mm',
  dpi: 300,
  unitVal: 63,
});

var pxW = unitToPx({
  unit: 'mm',
  dpi: 300,
  unitVal: 88,
});


// show bleed area on the <Workspace />
store.toggleBleed(true);
store.toggleRulers(true);

store.setUnit({
  unit: 'mm', // mm, cm, in, pt, px
  dpi: 300,
});

store.setSize(pxH, pxW, 'true');
store.activePage.set({ bleed: 40, width: pxH, height: pxW }); // set bleed in pixels


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
          store.saveAsPDF({ pixelRatio: 2, includeBleed: true, cropMarkSize: 20 });;
        }}
      >
        Bleed + Crops
      </Button>
      <Button
        minimal
        onClick={() => {
          store.setElementsPixelRatio(2);
          store.saveAsPDF({ pixelRatio: 2, includeBleed: true});;
        }}
      >
        Bleed
      </Button>
      <Button
        minimal
        onClick={() => {
          store.setElementsPixelRatio(2);
          store.saveAsImage({ pixelRatio: 2, includeBleed: false});;
        }}
      >
        PNG
      </Button>
    </div>
  );
};

export const Editor = () => {
  return (
    <PolotnoContainer style={{ width: '100vw', height: '100vh' }}>
      <SidePanelWrap>
        <SidePanel store={store} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} components={{
            ActionControls: ActionControls2,
          }} />
        <Workspace store={store} />
        <ZoomButtons store={store} />
        <PagesTimeline store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

export default Editor;
