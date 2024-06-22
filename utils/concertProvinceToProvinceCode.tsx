import { provinceCodes } from "./constants";

export const convertStateTo2char = (state: string) => {
  let formattedState;
  formattedState = state.replace(/[.]/g, "").toUpperCase();

  if (formattedState === "QR") {
    formattedState = "Q.R.";
  }

  console.log("formattedState 🍇 ", formattedState);

  for (let i = 0; i < provinceCodes.length; i++) {
    const element = provinceCodes[i];
    if (element.code_3_digits === formattedState) {
      return element.code_2_digits;
    }
  }
};
