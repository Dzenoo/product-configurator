export const EditorTabs = [
  {
    name: "colorpicker",
    icon: "/images/swatch.png",
  },
  {
    name: "filepicker",
    icon: "/images/file.png",
  },
];

export const FilterTabs = [
  {
    name: "logoShirt",
    icon: "/images/logo-tshirt.png",
  },
  {
    name: "stylishShirt",
    icon: "/images/stylish-tshirt.png",
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};
