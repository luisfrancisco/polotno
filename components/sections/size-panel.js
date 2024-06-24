"use strict";
var __rest =
    (this && this.__rest) ||
    function (e, t) {
      var i = {};
      for (var a in e)
        Object.prototype.hasOwnProperty.call(e, a) &&
          t.indexOf(a) < 0 &&
          (i[a] = e[a]);
      if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
        var n = 0;
        for (a = Object.getOwnPropertySymbols(e); n < a.length; n++)
          t.indexOf(a[n]) < 0 &&
            Object.prototype.propertyIsEnumerable.call(e, a[n]) &&
            (i[a[n]] = e[a[n]]);
      }
      return i;
    },
  __importDefault =
    (this && this.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SizePanel = exports.DEFAULT_SIZES = void 0);
const react_1 = __importDefault(require("react")),
  mobx_react_lite_1 = require("mobx-react-lite"),
  core_1 = require("@blueprintjs/core"),
  l10n_1 = require("polotno/utils/l10n"),
  AiOutlineFacebook_1 = __importDefault(
    require("@meronex/icons/ai/AiOutlineFacebook")
  ),
  AiOutlineInstagram_1 = __importDefault(
    require("@meronex/icons/ai/AiOutlineInstagram")
  ),
  AiOutlineYoutube_1 = __importDefault(
    require("@meronex/icons/ai/AiOutlineYoutube")
  ),
  AiOutlineVideoCamera_1 = __importDefault(
    require("@meronex/icons/ai/AiOutlineVideoCamera")
  ),
  ZoDocument_1 = __importDefault(require("@meronex/icons/zo/ZoDocument")),
  AiOutlineIdcard_1 = __importDefault(
    require("@meronex/icons/ai/AiOutlineIdcard")
  ),
  unit_1 = require("polotno/utils/unit");
exports.DEFAULT_SIZES = [
  [
    "Instagram Post",
    1080,
    1080,
    "px",
    react_1.default.createElement(AiOutlineInstagram_1.default, null),
  ],
  [
    "Instagram Story",
    1080,
    1920,
    "px",
    react_1.default.createElement(AiOutlineInstagram_1.default, null),
  ],
  [
    "Instagram Ad",
    1080,
    1080,
    "px",
    react_1.default.createElement(AiOutlineInstagram_1.default, null),
  ],
  [
    "Facebook Post",
    940,
    788,
    "px",
    react_1.default.createElement(AiOutlineFacebook_1.default, null),
  ],
  [
    "Facebook Cover",
    851,
    315,
    "px",
    react_1.default.createElement(AiOutlineFacebook_1.default, null),
  ],
  [
    "Facebook Ad",
    1200,
    628,
    "px",
    react_1.default.createElement(AiOutlineFacebook_1.default, null),
  ],
  [
    "Youtube Thumbnail",
    1280,
    720,
    "px",
    react_1.default.createElement(AiOutlineYoutube_1.default, null),
  ],
  [
    "Youtube Channel",
    2560,
    1440,
    "px",
    react_1.default.createElement(AiOutlineYoutube_1.default, null),
  ],
  [
    "Full HD",
    1920,
    1080,
    "px",
    react_1.default.createElement(AiOutlineVideoCamera_1.default, null),
  ],
  [
    "Invitation",
    14,
    14,
    "cm",
    react_1.default.createElement(ZoDocument_1.default, null),
  ],
  [
    "A4",
    21,
    29.7,
    "cm",
    react_1.default.createElement(ZoDocument_1.default, null),
  ],
  [
    "Business card",
    3.5,
    2,
    "in",
    react_1.default.createElement(AiOutlineIdcard_1.default, null),
  ],
  [
    "Padrão",
    63,
    88,
    "mm",
    react_1.default.createElement(AiOutlineIdcard_1.default, null),
  ],
];
const MIN_SIZE_PX = 10,
  NumericInputDelayed = (e) => {
    var { value: t, onChange: i } = e,
      a = __rest(e, ["value", "onChange"]);
    const [n, l] = react_1.default.useState(t.toString()),
      u = react_1.default.useRef(t);
    u.current = n;
    const r = () => {
      i(Math.max(a.min || 0, parseFloat(u.current)));
    };
    react_1.default.useEffect(() => {
      l(t);
    }, [t]);
    return react_1.default.createElement(
      core_1.NumericInput,
      Object.assign({}, a, {
        value: n.toString(),
        onValueChange: (e, t) => {
          Number.isNaN(t) || l(t);
        },
        onBlur: r,
        allowNumericCharactersOnly: !1,
        onKeyDown: (e) => {
          "Enter" === e.key && r();
        },
      })
    );
  };
exports.SizePanel = (0, mobx_react_lite_1.observer)(({ store: e }) => {
  var t, i;
  const [a, n] = react_1.default.useState(!0),
    [l, u] = react_1.default.useState(e.width),
    [r, o] = react_1.default.useState(e.height),
    c = (0, unit_1.pxToUnit)({ px: 10, unit: e.unit, dpi: e.dpi }),
    d =
      (null === (t = e.activePage) || void 0 === t
        ? void 0
        : t.computedWidth) || e.width;
  react_1.default.useEffect(() => {
    u((0, unit_1.pxToUnitRounded)({ px: d, unit: e.unit, dpi: e.dpi }));
  }, [d, e.unit, e.dpi]);
  const _ =
    (null === (i = e.activePage) || void 0 === i ? void 0 : i.computedHeight) ||
    e.height;
  react_1.default.useEffect(() => {
    o((0, unit_1.pxToUnitRounded)({ px: _, unit: e.unit, dpi: e.dpi }));
  }, [_, e.unit, e.dpi]);
  return react_1.default.createElement(
    "div",
    { style: { height: "100%", overflow: "auto", paddingRight: "3px" } },
    react_1.default.createElement(
      "div",
      { style: { paddingBottom: "15px" } },
      react_1.default.createElement(
        core_1.Switch,
        {
          checked: a,
          onChange: (e) => {
            n(e.target.checked);
          },
          alignIndicator: core_1.Alignment.RIGHT,
          style: { marginTop: "8px", marginBottom: "25px" },
        },
        (0, l10n_1.t)("sidePanel.useMagicResize"),
        " ",
        react_1.default.createElement(
          core_1.Tooltip,
          {
            content: (0, l10n_1.t)("sidePanel.magicResizeDescription"),
            position: core_1.Position.BOTTOM,
          },
          react_1.default.createElement(core_1.Icon, { icon: "help" })
        )
      ),
      react_1.default.createElement(
        "div",
        { style: { width: "50%", display: "inline-block" } },
        (0, l10n_1.t)("sidePanel.width"),
        " (",
        e.unit,
        ")"
      ),
      react_1.default.createElement(
        "div",
        { style: { width: "50%", display: "inline-block" } },
        react_1.default.createElement(NumericInputDelayed, {
          fill: !0,
          value: l,
          onChange: (e) => {
            e || (e = c), u(e);
          },
          min: c,
          max: 1e4,
          selectAllOnFocus: !0,
          stepSize: "px" === e.unit ? 1 : 0.1,
        })
      )
    ),
    react_1.default.createElement(
      "div",
      { style: { paddingBottom: "15px" } },
      react_1.default.createElement(
        "div",
        { style: { width: "50%", display: "inline-block" } },
        (0, l10n_1.t)("sidePanel.height"),
        " (",
        e.unit,
        ")"
      ),
      react_1.default.createElement(
        "div",
        { style: { width: "50%", display: "inline-block" } },
        react_1.default.createElement(NumericInputDelayed, {
          fill: !0,
          value: r,
          onChange: (e) => {
            e || (e = c), o(e);
          },
          min: c,
          max: 1e4,
          selectAllOnFocus: !0,
          stepSize: "px" === e.unit ? 1 : 0.1,
        })
      )
    ),
    react_1.default.createElement(
      "div",
      { style: { paddingBottom: "15px" } },
      react_1.default.createElement(
        core_1.Button,
        {
          fill: !0,
          intent: "primary",
          onClick: () => {
            var t, i, n, u;
            const o = (0, unit_1.unitToPx)({
                unitVal: l,
                dpi: e.dpi,
                unit: e.unit,
              }),
              c = (0, unit_1.unitToPx)({
                unitVal: r,
                dpi: e.dpi,
                unit: e.unit,
              });
            e.setSize(o, c, a),
              "auto" !==
                (null === (t = e.activePage) || void 0 === t
                  ? void 0
                  : t.width) &&
                (null === (i = e.activePage) ||
                  void 0 === i ||
                  i.set({ width: o })),
              "auto" !==
                (null === (n = e.activePage) || void 0 === n
                  ? void 0
                  : n.height) &&
                (null === (u = e.activePage) ||
                  void 0 === u ||
                  u.set({ height: c }));
          },
        },
        (0, l10n_1.t)("sidePanel.resize")
      )
    ),
    exports.DEFAULT_SIZES.map(([t, i, n, l, u]) =>
      react_1.default.createElement(
        core_1.Button,
        {
          key: t,
          style: {
            width: "100%",
            paddingTop: "10px",
            paddingBottom: "10px",
            fontSize: "16px",
          },
          minimal: !0,
          onClick: () => {
            var t, u, r, o;
            const c = (0, unit_1.unitToPx)({ unitVal: i, dpi: e.dpi, unit: l }),
              d = (0, unit_1.unitToPx)({ unitVal: n, dpi: e.dpi, unit: l });
            e.setUnit({ unit: l, dpi: e.dpi }),
              e.setSize(c, d, a),
              "auto" !==
                (null === (t = e.activePage) || void 0 === t
                  ? void 0
                  : t.width) &&
                (null === (u = e.activePage) ||
                  void 0 === u ||
                  u.set({ width: c })),
              "auto" !==
                (null === (r = e.activePage) || void 0 === r
                  ? void 0
                  : r.height) &&
                (null === (o = e.activePage) ||
                  void 0 === o ||
                  o.set({ height: d }));
          },
          icon: u,
          alignText: "left",
        },
        t,
        react_1.default.createElement(
          "span",
          {
            style: {
              fontSize: "0.7rem",
              paddingLeft: "20px",
              float: "right",
              lineHeight: "1.1rem",
            },
          },
          i,
          " x ",
          n,
          " ",
          l
        )
      )
    )
  );
});
