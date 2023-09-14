import { swatch, fileIcon, ai, logoShirt, stylishShirt, bgIcon } from '../assets'

export const EditorTabs = [
  {
    name: 'colorpicker',
    icon: swatch
  },
  {
    name: 'filepicker',
    icon: fileIcon
  },
  {
    name: 'aipicker',
    icon: ai
  },
  {
    name: 'bg-removal',
    icon: bgIcon
  }
]

export const FilterTabs = [
  {
    name: 'logoShirt',
    icon: logoShirt
  },
  {
    name: 'stylishShirt',
    icon: stylishShirt
  }
]

export const DecalTypes = {
  logo: {
    stateProperty: 'logoDecal',
    filterTab: 'logoShirt'
  },
  full: {
    stateProperty: 'fullDecal',
    filterTab: 'stylishShirt'
  }
}
