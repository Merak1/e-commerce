// BOLSA/SOBRE AMARILLO GRANDE : 46cm x 35cm - 33 fundas - 2kg
// BOLSA/SOBRE AMARILLO CHICO: 30cm x 21cm - 6 fundas - 1kg
// BOLSA/SOBRE GRIS GRANDE : 40cm x 33cm - 20 fundas - 1kg
// BOLSA/SOBRE GRIS CHICO :  29cm x 21cm - 6 fundas - 1kg

// CAJA GRANDE CON LOGO (ALTA) : 40cm x 22cm x 30cm - 180 fundas o 15 termos - 5.5kg
// CAJA MEDIANA CON LOGO : 16cm x 27cm x 26 - 65 fundas o 4 termos - 2.5kg
// CAJA CHICA CON LOGO : 21cm x 20cm x 21cm - 40 fundas o 2 termos - 2kg
// CAJA GRANDE CHINA : 45cm x 40cm x 50 cm - 500 fundas o 40 termos - 20kg

export const SOBRE_AMARILLO_GRANDE = {
  h: 46,
  w: 35,
  hh: 1,
  case_capacity: 33,
  name: "sobre_amarillo_grande",
  weight: 2,
};
export const SOBRE_AMARILLO_CHICO = {
  h: 30,
  w: 21,
  hh: 1,
  case_capacity: 6,
  name: "sobre_amarillo_chico",
  weight: 1,
};
export const SOBRE_GRIS_GRANDE = {
  h: 40,
  w: 33,
  hh: 1,
  case_capacity: 20,
  name: "sobre_gris_grande",
  weight: 1,
};
export const SOBRE_GRIS_CHICO = {
  h: 29,
  w: 21,
  hh: 1,
  case_capacity: 6,
  name: "sobre_gris_chico",
  weight: 1,
};

export const CAJA_GRANDE_CON_LOGO_ALTA = {
  h: 40,
  w: 22,
  hh: 30,
  case_capacity: 180,
  thermos_capacity: 15,
  weight: 5.5,
};
export const CAJA_MEDIANA_CON_LOGO = {
  h: 16,
  w: 27,
  hh: 26,
  case_capacity: 65,
  thermos_capacity: 4,
  weight: 2.5,
};
export const CAJA_CHICA_CON_LOGO = {
  h: 21,
  w: 20,
  hh: 21,
  case_capacity: 40,
  thermos_capacity: 2,
  weight: 2,
};
export const CAJA_GRANDE_CHINA = {
  h: 45,
  w: 40,
  hh: 50,
  case_capacity: 500,
  thermos_capacity: 40,
  weight: 20,
};

export const getShippingContainers = (items: any) => {
  console.log("items from handlePackages", items);
  //recibe obj de items, con cantidades
  let result = [];
  let totalAmountCases = 0;
  let totalAmountThermos = 0;

  for (const cartProduct of items) {
    // console.log("cartProduct", cartProduct);

    const { productType, quantity } = cartProduct;
    console.log("🟣productType🟣 ", productType);
    if (productType === "THERMOS") {
      //   console.log("🟦amount of thermos", quantity);
      totalAmountThermos = totalAmountThermos + quantity;
    } else {
      //   console.log("🟦amount of cases", quantity);
      totalAmountCases = totalAmountCases + quantity;
    }
  }
  console.log(" 🟧 total amount of cases in order is " + totalAmountCases);
  console.log(" 🟧total amount of thermos in order is " + totalAmountThermos);

  if (totalAmountThermos == 0) {
    // no termos bought
    switch (true) {
      case totalAmountCases <= 6:
        result.push(SOBRE_AMARILLO_CHICO);
        break;
      case totalAmountCases <= 20:
        result.push(SOBRE_GRIS_GRANDE);
        break;
      case totalAmountCases <= 33:
        result.push(SOBRE_AMARILLO_GRANDE);
        break;
      case totalAmountCases <= 40:
        result.push(CAJA_CHICA_CON_LOGO);
        break;
      case totalAmountCases <= 65:
        result.push(CAJA_MEDIANA_CON_LOGO);
        break;
      case totalAmountCases <= 180:
        result.push(CAJA_GRANDE_CON_LOGO_ALTA);
        break;
      case totalAmountCases <= 180:
        result.push(CAJA_GRANDE_CHINA);
        break;
      default:
        console.log("No hay cases");
        break;
    }
  }

  if (totalAmountCases == 0) {
    switch (true) {
      case totalAmountThermos <= 2:
        result.push(CAJA_CHICA_CON_LOGO);
        break;
      case totalAmountThermos <= 4:
        result.push(CAJA_CHICA_CON_LOGO);
        break;
      case totalAmountThermos <= 4:
        result.push(CAJA_CHICA_CON_LOGO);
        break;
      default:
        console.log("No hay termos");
        break;
    }
  }
  return result;
};
