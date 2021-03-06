import { atom, selector } from "recoil";
import * as IconLibrary from "phosphor-react";
import { Icon } from "phosphor-react";

import { Weight, isIcon } from "../lib";

let controlIcons: Icon[] = Object.values(IconLibrary).filter(isIcon);

for (let i = controlIcons.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * i);
  const temp = controlIcons[i];
  controlIcons[i] = controlIcons[j];
  controlIcons[j] = temp;
}

controlIcons = controlIcons.slice(0, 80);

for (let i = controlIcons.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * i);
  const temp = controlIcons[i];
  controlIcons[i] = controlIcons[j];
  controlIcons[j] = temp;
}

export const textInputAtom = atom<string>({
  key: "textInputAtom",
  default: "",
});

export const fileInputAtom = atom<string[]>({
  key: "fileInputAtom",
  default: [],
});

export const iconWeightAtom = atom<Weight>({
  key: "iconWeightAtom",
  default: "regular",
});

export const iconSizeAtom = atom<number>({
  key: "iconSizeAtom",
  default: 32,
});

export const useControlSetAtom = atom<boolean>({
  key: "useControlSetAtom",
  default: true,
});

export const shuffleAtom = atom<number>({
  key: "shuffleAtom",
  default: 0,
});

type DisplayIcon = Icon | { name: string; svgString: string };

export const iconSetSelector = selector<DisplayIcon[]>({
  key: "iconSetSelector",
  get: ({ get }) => {
    const Q = get(shuffleAtom);
    void Q;
    const showControls = get(useControlSetAtom);
    const textInput = get(textInputAtom);
    const fileInput = get(fileInputAtom);

    let testIcons: DisplayIcon[] = [];
    if (textInput) {
      testIcons = testIcons.concat(
        new Array(8).fill({ name: "textInput", svgString: textInput })
      );
    }

    if (fileInput) {
      const newIcons = fileInput.map((file, index) => ({
        name: `fileInput-${index}`,
        svgString: file,
      }));

      testIcons = testIcons.concat(new Array(8).fill(newIcons).flat());
    }

    if (showControls) testIcons = testIcons.concat(controlIcons);

    for (let i = testIcons.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = testIcons[i];
      testIcons[i] = testIcons[j];
      testIcons[j] = temp;
    }

    return testIcons;
  },
});
