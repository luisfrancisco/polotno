import React from "react";
import { observer } from "mobx-react-lite";
import { SectionTab } from "polotno/side-panel";
import * as svg from "polotno/utils/svg";
import AiOutlineBarcode from "@meronex/icons/ai/AiOutlineBarcode";
import { Button, InputGroup, Radio, RadioGroup } from "@blueprintjs/core";
import JsBarcode from "jsbarcode";

// create svg image for QR code for input text
export async function getBarcode(text, format) {
  const xmlSerializer = new XMLSerializer();
  const svgNode = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  JsBarcode(svgNode, text, { format: format });

  const svgText = xmlSerializer.serializeToString(svgNode);
  const src = svg.svgToURL(svgText);
  const { width, height } = await svg.getSvgSize(src);
  return {
    src,
    width,
    height,
  };
}

// define the new custom section
export const BarcodeSection = {
  name: "barcode",
  Tab: (props) => (
    <SectionTab name="Barcode" {...props}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <AiOutlineBarcode />
      </div>
    </SectionTab>
  ),
  // we need observer to update component automatically on any store changes
  Panel: observer(({ store }) => {
    const [val, setVal] = React.useState("");
    const [format, setFormat] = React.useState("CODE128");

    const el = store.selectedElements[0];
    const isBarcode = el?.name === "barcode";

    // if selection is changed we need to update input value
    React.useEffect(() => {
      if (el?.custom?.value) {
        setVal(el?.custom.value);
      }
    }, [isBarcode, el]);

    // update image src when we change input data
    React.useEffect(() => {
      if (isBarcode && val) {
        getBarcode(val, format).then(({ src }) => {
          el.set({
            src,
            custom: {
              value: val,
              format: format,
            },
          });
        });
      }
    }, [el, val, isBarcode, format]);

    return (
      <div>
        {isBarcode && <p>Update select bar code:</p>}
        {!isBarcode && <p>Create new bar code:</p>}
        <InputGroup
          onChange={(e) => {
            setVal(e.target.value);
          }}
          placeholder="Type bar code content"
          value={val}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <RadioGroup
          onChange={(e) => setFormat(e.target.value)}
          selectedValue={format}
          inline={true}
        >
          <Radio label="CODE128" value="CODE128" />
          <Radio label="UPC" value="UPC" />
          <Radio label="EAN13" value="EAN13" />
          <Radio label="EAN8" value="EAN8" />
        </RadioGroup>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "20px",
          }}
        >
          <Button
            style={{
              display: isBarcode ? "" : "none",
            }}
            onClick={() => {
              store.selectElements([]);
              setVal("");
            }}
          >
            Cancel
          </Button>
          <Button
            style={{
              display: isBarcode ? "none" : "",
            }}
            onClick={async () => {
              const { src, width, height } = await getBarcode(val, format);

              store.activePage.addElement({
                type: "svg",
                name: "barcode",
                x: 50,
                y: 50,
                width,
                height,
                src,
                custom: {
                  value: val,
                  format: format,
                },
              });
            }}
          >
            Add new barcode
          </Button>
        </div>
      </div>
    );
  }),
};
