import { provinceCodes } from "./constants";

export const convertProvinceCodeToProvince = (state: string) => {
  let formattedState;
  formattedState = state.replace(/[.]/g, "").toUpperCase();
  if (formattedState === "QR") {
    formattedState = "Q.R.";
  }

  for (let i = 0; i < provinceCodes.length; i++) {
    const element = provinceCodes[i];

    if (element.code_3_digits === formattedState) {
      return element.name;
    }
  }
};
