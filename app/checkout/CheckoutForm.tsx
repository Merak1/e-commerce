"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import Quotes from "./Quotes";
import { convertStateTo2char } from "@/utils/concertProvinceToProvinceCode";
import { convertProvinceCodeToProvince } from "@/utils/convertProvinceCodeToProvince";
import { getShippingContainers } from "@/utils/bussinessLogic";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
  loading: boolean;
  currentUserEmail: string;
  packagesDetails: any;
  setPackagesDetails: any;
  shippingDetailsExist: boolean;
  setShippingDetailsExist: any;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  currentUserEmail,
  clientSecret,
  handleSetPaymentSuccess,
  loading,
  packagesDetails,
  setPackagesDetails,
  shippingDetailsExist,
  setShippingDetailsExist,
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      courier: "FedEx",
    },
  });
  const {
    cartTotalAmount,
    handleClearCart,
    handleSetPaymentIntent,
    cartProducts,
    handleAddShippingPriceToCart,
    shippingPrice,
  } = useCart();
  const elements = useElements();
  const stripe = useStripe();
  const [selectedCourier, setSelectedCourier] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [addres, setAddres] = useState<any>();
  const [name, setName] = useState<any>();
  const [phone, setPhone] = useState<any>();
  const [email, setEmail] = useState<any>(currentUserEmail);

  const [success, setSuccess] = useState<boolean>(false);
  const [token, setToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();

  const [serviceType, setSelectedService] = useState<string>("");

  const [serviceName, setServiceName] = useState<string>("");
  const [quotes, setQuotes] = useState<any>();

  const [selectedQuote, setSelectedQuote] = useState<any>({
    alias: "",
    amount: 0,
    amount_insurance: 0,
    amount_insurance_courier: 0,
    courier: "",
    courierId: "",
    currency: "",
    deliveryDayOfWeek: "",
    deliveryTimestamp: "",
    expectedDelivery: [],
    image: false,
    insurance_availability: false,
    maxInsurance: 0,
    minInsurance: 0,
    serviceName: "",
    serviceType: "",
    zone: "",
  });

  const watchAllFields = watch();

  const [sender, setSender] = useState<any>({
    name: "JRL",
    email: "jrlstoremanagerbackup@gmail.com",
    companyName: "JRL",
    phone: "5525258864",
    country: "México",
    country_code: "MX",
    province: "Ciudad de México",
    province_code: "DF",
    city: "Cuauhtémoc",
    address1: "Manuel María Contreras 66",
    address2: "col san Rafael",
    optionalInfo: " ",
    zip: "06470",
  });
  const [recipient, setRecipient] = useState<any>({
    name: "", //☑️
    email: "", //☑️
    companyName: "", //☑️
    phone: "", //☑️
    country: "", //☑️
    country_code: "", //☑️
    province: "", //☑️
    province_code: "", //☑️
    city: "", //☑️
    address1: "", //☑️
    address2: "", //☑️
    optionalInfo: " ", //☑️
    zip: "", //☑️
  });

  useEffect(() => {
    if (packagesDetails.success === true) {
      setShippingDetailsExist(true);
    }
  }, [packagesDetails]);

  useEffect(() => {
    handleAddShippingPriceToCart(selectedQuote.amount);
  }, [selectedQuote]);

  useEffect(() => {
    const { courier } = watchAllFields;
    setSelectedCourier(courier);
  }, [watchAllFields, selectedCourier]);

  useEffect(() => {
    setRecipient({
      ...recipient,
      name: name,
      companyName: name,
      email: currentUserEmail,
    });
  }, [name]);

  useEffect(() => {
    setRecipient({
      ...recipient,
      email: currentUserEmail,
    });
  }, [currentUserEmail, email]);

  useEffect(() => {
    setRecipient({
      ...recipient,
      phone: phone,
    });
  }, [phone]);

  useEffect(() => {
    authentificateWeShip();
  }, []);

  useEffect(() => {
    handlePackagesDetails(cartProducts);
  }, [cartProducts]);

  useEffect(() => {
    console.log("quotes  🔵🔵", quotes);
  }, [quotes]);

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    // console.log("elements", elements);

    if (!stripe || !elements) {
      console.log("No stripe or elements found");
      return;
    }
    // setIsLoading(true);

    // authentificateWeShip();
    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Checkout completed successfully");

          handleClearCart();
          handleSetPaymentSuccess(true);
          handleSetPaymentIntent(null);
        }
        setIsLoading(false);
      });
  };

  const WESHIP_API = "api.weship.com";
  const EMAIL = "arias_jl@outlook.com";
  const PASSWORD = "DAre1234!";

  const showProducts = () => {
    console.log("cartProducts ", cartProducts);
  };

  const authentificateWeShip = () => {
    const myHeaders = new Headers();
    myHeaders.append("Weship-API-Version", "1.0");

    const raw =
      '{\r\n    "email": "arias_jl@outlook.com",\r\n    "password": "DAre1234!"\r\n}';

    fetch(`https://${WESHIP_API}/user/login`, {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => {
        const resultObj = JSON.parse(result);
        const { success, token, refreshToken } = resultObj;
        setSuccess(success);
        setToken(token);
        setRefreshToken(refreshToken);
      })
      .catch((error) => console.log("error", error));
  };

  const couriers = [
    "FedEx",
    "Estafeta",
    "RedPack",
    "99minutos",
    "DHL",
    "Paquetexpress",
    "JyT",
    "Borzo",
  ];

  const setFomrValueToState = (event: any) => {
    // console.log("setting form to state: ");

    console.log("event from event 💅", event);
    const address = event.value.address;
    const name = event.value.name;
    const phone = event.value.phone;

    // change address.state to all provincecode 2 char

    const provinceCoded2Char = convertStateTo2char(address.state);
    const provinceName = convertProvinceCodeToProvince(address.state);

    setAddres(address);
    setName(name);
    setPhone(phone);
    setRecipient({
      ...recipient,
      country: "México",
      country_code: addres.country,
      province: provinceName,
      province_code: provinceCoded2Char,
      city: address.city,
      address1: address.line1,
      address2: address.line2,
      // optionalInfo: " ",
      zip: address.postal_code,
    });
  };

  const handlePackagesDetails = (cartProducts: any) => {
    //! logica de que cajas van dónde dependiendo de la cantidad de cosas
    console.log("cartProducts from handlePackageDetails", cartProducts);

    const shippingContainers = getShippingContainers(cartProducts);
    // dependiendo de la cantidad de elementos, y los tipos de elementos obtener el tipo y la cantidad de cajas
    // for (const cartProduct of cartProducts) {
    //   console.log("cartProduct", cartProduct);

    //   // const {productType} = cartProduct
    // }

    console.log(
      "result of getShippingContainers from checkoutForm ✋",
      shippingContainers
    );
  };

  const createNewQuote = () => {
    var myHeaders = new Headers();

    // setFomrValueToState()
    let packages = {
      h: 10,
      w: 10,
      hh: 5,
      weight: 1,
      sizeUnit: "CM",
      weightUnit: "KG",
      declaredValue: 0,
    };
    myHeaders.append("Weship-API-Version", "1.0");
    myHeaders.append("authorization", `${token}`);

    let packagesDetails = "";

    if (cartProducts) {
      for (let i = 0; i < cartProducts.length; i++) {
        const element = cartProducts[i];
        console.log("element 👮", element);
        const { packageInfo } = element;
        console.log("packageInfo", packageInfo);
        //  let individualItem = `{\r\n            "name": "${name}",\r\n            "quantity": ${quantity},\r\n            "originCountry": {\r\n                "name": "México",\r\n                "code": "MX"\r\n            },\r\n            "price_set": {\r\n                "shop_money": {\r\n                    "amount": "${price}",\r\n                    "currency_code": "MXN"\r\n                }\n      \r\n            }\r\n        },\r\n`;
        //  let individualItemLast = `{\r\n            "name": "${name}",\r\n            "quantity": ${quantity},\r\n            "originCountry": {\r\n                "name": "México",\r\n                "code": "MX"\r\n            },\r\n            "price_set": {\r\n                "shop_money": {\r\n                    "amount": "${price}",\r\n                    "currency_code": "MXN"\r\n                }\n      \r\n            }\r\n        }\r\n`;

        let individualItem = `{\r\n            "h": ${packageInfo.h},\r\n            "w": ${packageInfo.w},\r\n            "hh": ${packageInfo.hh},\r\n            "weight": ${packageInfo.weight},\r\n            "sizeUnit": "cm",\r\n            "weightUnit": "kg",\r\n            "declaredValue": ${packageInfo.declaredValue}\r\n        }\,\r\n`;
        // let individualItem;

        let individualItemLast = `{\r\n            "h": ${packageInfo.h},\r\n            "w": ${packageInfo.w},\r\n            "hh": ${packageInfo.hh},\r\n            "weight": ${packageInfo.weight},\r\n            "sizeUnit": "cm",\r\n            "weightUnit": "kg",\r\n            "declaredValue": ${packageInfo.declaredValue}\r\n\}`;

        if (i === cartProducts.length - 1) {
          packagesDetails += individualItemLast;
        } else {
          packagesDetails += individualItem;
        }
      }

      // console.log("packagesDetails full 👮", packagesDetails);
    }
    //  var raw =
    // '{\r\n    "sender": {\r\n        "name": "Sender Name",\r\n        "email": "sender@email.com",\r\n        "companyName": "Sender Company",\r\n        "phone": "811111111111",\r\n        "country": "México",\r\n        "country_code": "MX",\r\n        "province": "Puebla",\r\n        "province_code": "PU",\r\n        "city": "Puebla",\r\n        "address1": "Cuauhtémoc 28",\r\n        "address2": "Agrícola Ignacio Zaragoza",\r\n        "optionalInfo": "",\r\n        "zip": "72100"\r\n    },\r\n    "recipient": {\r\n        "name": "Recipient Name",\r\n        "email": "recipient@email.com",\r\n        "companyName": "ASD",\r\n        "phone": "211111111111",\r\n        "country": "Mexico",\r\n        "country_code": "MX",\r\n        "province": "Nuevo León",\r\n        "province_code": "NL",\r\n        "city": "San Pedro Garza García",\r\n        "address1": "Valle del Mezquite 1431",\r\n        "address2": "Palo Blanco",\r\n        "optionalInfo": "",\r\n        "zip": "66236"\r\n    },\r\n    "packages": [\r\n        {\r\n            "h": 10,\r\n            "w": 10,\r\n            "hh": 2,\r\n            "weight": 1,\r\n            "sizeUnit": "CM",\r\n            "weightUnit": "KG",\r\n            "declaredValue": 0\r\n        }\r\n    ],\r\n    "courier": [\r\n        "fedex",\r\n        "estafeta",\r\n        "99minutos"\r\n    ]\r\n}';

    let raw = `{\r\n    "sender": {\r\n        "name": "${sender.name}",\r\n        "email": "${sender.email}",\r\n        "companyName": "${sender.companyName}",\r\n        "phone": "${sender.phone}",\r\n        "country": "${sender.country}",\r\n        "country_code": "${sender.country_code}",\r\n        "province": "${sender.province}",\r\n        "province_code": "${sender.province_code}",\r\n        "city": "${sender.city}",\r\n        "address1": "${sender.address1}",\r\n        "address2": "${sender.address2}",\r\n        "optionalInfo": "${sender.optionalInfo}",\r\n        "zip": "${sender.zip}"\r\n    },\r\n    "recipient": {\r\n        "name": "${recipient.name}",\r\n        "email": "${recipient.email}",\r\n        "companyName": "${recipient.companyName}",\r\n        "phone": "${recipient.phone}",\r\n        "country": "${recipient.country}",\r\n        "country_code": "${recipient.country_code}",\r\n        "province": "${recipient.province}",\r\n        "province_code": "${recipient.province_code}",\r\n        "city": "${recipient.city}",\r\n        "address1": "${recipient.address1}",\r\n        "address2": "${recipient.address2}",\r\n        "optionalInfo": " 🙂",\r\n        "zip": "${recipient.zip}"\r\n    },\r\n    "packages": [\r\n        {\r\n            "h": ${packages.h},\r\n            "w": ${packages.w},\r\n            "hh": ${packages.hh},\r\n            "weight": ${packages.weight},\r\n            "sizeUnit": "${packages.sizeUnit}",\r\n            "weightUnit": "${packages.weightUnit}",\r\n            "declaredValue": ${packages.declaredValue}\r\n        }\r\n    ],\r\n    "courier": [\r\n        "${selectedCourier}"]\r\n}`;
    // let raw = `{\r\n    "sender": {\r\n        "name": "${sender.name}",\r\n        "email": "${sender.email}",\r\n        "companyName": "${sender.companyName}",\r\n        "phone": "${sender.phone}",\r\n        "country": "${sender.country}",\r\n        "country_code": "${sender.country_code}",\r\n        "province": "${sender.province}",\r\n        "province_code": "${sender.province_code}",\r\n        "city": "${sender.city}",\r\n        "address1": "${sender.address1}",\r\n        "address2": "${sender.address2}",\r\n        "optionalInfo": "${sender.optionalInfo}",\r\n        "zip": "${sender.zip}"\r\n    },\r\n    "recipient": {\r\n        "name": "${recipient.name}",\r\n        "email": "${recipient.email}",\r\n        "companyName": "${recipient.companyName}",\r\n        "phone": "${recipient.phone}",\r\n        "country": "${recipient.country}",\r\n        "country_code": "${recipient.country_code}",\r\n        "province": "${recipient.province}",\r\n        "province_code": "${recipient.province_code}",\r\n        "city": "${recipient.city}",\r\n        "address1": "${recipient.address1}",\r\n        "address2": "${recipient.address2}",\r\n        "optionalInfo": " 🙂",\r\n        "zip": "${recipient.zip}"\r\n    },\r\n    "packages": [\r\n        {\r\n            "h": ${packages.h},\r\n            "w": ${packages.w},\r\n            "hh": ${packages.hh},\r\n            "weight": ${packages.weight},\r\n            "sizeUnit": "cm",\r\n            "weightUnit": "kg",\r\n            "declaredValue": ${packages.declaredValue}\r\n        }\r\n    ],\r\n    "courier": [\r\n        "${selectedCourier}"]\r\n}`;
    // let raw = `{\r\n    "sender": {\r\n        "name": "${sender.name}",\r\n        "email": "${sender.email}",\r\n        "companyName": "${sender.companyName}",\r\n        "phone": "${sender.phone}",\r\n        "country": "${sender.country}",\r\n        "country_code": "${sender.country_code}",\r\n        "province": "${sender.province}",\r\n        "province_code": "${sender.province_code}",\r\n        "city": "${sender.city}",\r\n        "address1": "${sender.address1}",\r\n        "address2": "${sender.address2}",\r\n        "optionalInfo": "${sender.optionalInfo}",\r\n        "zip": "${sender.zip}"\r\n    },\r\n    "recipient": {\r\n        "name": "${recipient.name}",\r\n        "email": "${recipient.email}",\r\n        "companyName": "${recipient.companyName}",\r\n        "phone": "${recipient.phone}",\r\n        "country": "${recipient.country}",\r\n        "country_code": "${recipient.country_code}",\r\n        "province": "${recipient.province}",\r\n        "province_code": "${recipient.province_code}",\r\n        "city": "${recipient.city}",\r\n        "address1": "${recipient.address1}",\r\n        "address2": "${recipient.address2}",\r\n        "optionalInfo": " 🙂",\r\n        "zip": "${recipient.zip}"\r\n    },\r\n    "packages": [\r\n   ${packagesDetails}     \r\n    ],\r\n    "courier": [\r\n        "${selectedCourier}"]\r\n}`;

    console.log("🧡🧡raw 🧡🧡: ", raw);

    fetch(`https://${WESHIP_API}/orders/quoteOrder`, {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.success === true) {
          setQuotes(result.data);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const createShipment = () => {
    var myHeaders = new Headers();
    myHeaders.append("Weship-API-Version", "1.0");
    myHeaders.append("authorization", `${token}`);

    let bodyProducts = "";

    if (cartProducts) {
      for (let i = 0; i < cartProducts.length; i++) {
        const element = cartProducts[i];

        const { name, quantity, price } = element;

        let individualItem = `{\r\n            "name": "${name}",\r\n            "quantity": ${quantity},\r\n            "originCountry": {\r\n                "name": "México",\r\n                "code": "MX"\r\n            },\r\n            "price_set": {\r\n                "shop_money": {\r\n                    "amount": "${price}",\r\n                    "currency_code": "MXN"\r\n                }\n      \r\n            }\r\n        },\r\n`;
        let individualItemLast = `{\r\n            "name": "${name}",\r\n            "quantity": ${quantity},\r\n            "originCountry": {\r\n                "name": "México",\r\n                "code": "MX"\r\n            },\r\n            "price_set": {\r\n                "shop_money": {\r\n                    "amount": "${price}",\r\n                    "currency_code": "MXN"\r\n                }\n      \r\n            }\r\n        }\r\n`;

        if (i === cartProducts.length - 1) {
          bodyProducts += individualItemLast;
        } else {
          bodyProducts += individualItem;
        }
      }
    }
    // console.log("👩‍🦳 bodyProducts 👩‍🦳", bodyProducts);

    let raw = `{\r\n    \"sender\": {\r\n        \"name\": \"${sender.name}\",\r\n        \"email\": \"${sender.email}\",\r\n        \"companyName\": \"${sender.companyName}\",\r\n        \"phone\": \"${sender.phone}\",\r\n        \"country\": \"${sender.country}\",\r\n        \"country_code\": \"${sender.country_code}\",\r\n        \"province\": \"${sender.province}\",\r\n        \"province_code\": \"${sender.province_code}\",\r\n        \"city\": \"${sender.city}\",\r\n        \"address1\": \"${sender.address1}\",\r\n        \"address2\": \"${sender.address2}\",\r\n        \"optionalInfo\":${sender.optionalInfo}\"\",\r\n        \"zip\": \"${sender.zip}\"\r\n    },\r\n    \"recipient\": {\r\n        \"name\": \"${recipient.name}\",\r\n        \"email\": \"${recipient.email}\",\r\n        \"companyName\":"${recipient.companyName}",\r\n        \"phone\": \"${recipient.phone}\",\r\n        \"country\": \"${recipient.country}\",\r\n        \"country_code\": \"${recipient.country_code}\",\r\n        \"province\": \"${recipient.province}\",\r\n        \"province_code\": \"${recipient.province_code}\",\r\n        \"city\": \"${recipient.city}\",\r\n        \"address1\": \"${recipient.address1}\",\r\n        \"address2\": \"${recipient.address2}\",\r\n        \"optionalInfo\":"${recipient.optionalInfo}",\r\n        \"zip\": \"${recipient.zip}\"\r\n    },\r\n    \"selectedService\": {\r\n        \"serviceType\": "${selectedQuote.serviceType}",\r\n        \"serviceName\": \"${selectedQuote.serviceName}\",\r\n        \"courier\": \"${selectedCourier}\"\r\n    },\r\n    \"enabledInsurance\": false,\r\n    \"items\": [\r\n        \r\n  ${bodyProducts} \r\n    ],\r\n    \"packages\": [\r\n        {\r\n            \"h\": 10,\r\n            \"w\": 10,\r\n            \"hh\": 2,\r\n            \"weight\": 1,\r\n            \"sizeUnit\": \"CM\",\r\n            \"weightUnit\": \"KG\",\r\n            \"declaredValue\": 0\r\n        }\r\n    ],\r\n    \"fulfillment\": true,\r\n    \"currency_code\": \"MXN\",\r\n    \"total_amount_insurance\": 0\r\n}`;

    // console.log(" 💜");
    // console.log("raw  from new shiptment 💜", raw);
    // console.log(" 💜");

    fetch(`https://${WESHIP_API}/shipments/createShipment`, {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        let parsed = JSON.parse(result);
        const { data, order_id, success } = parsed;
        const { trackingNumber, labelsNumber, amount, data: dataArray } = data;
        console.log("CREATED SHIPMENT this updates packageDetials");
        setPackagesDetails((prev: any) => {
          return {
            ...prev,
            success: success,
            order_id: order_id,
            courier: selectedCourier,
            data: {
              orderId: order_id,
              success: success,
              trackingNumber: trackingNumber,
              labelsNumber: labelsNumber,
              amount: amount,
              dataArray: dataArray,
            },
          };
        });
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      {loading && <div className="text-center">Loading Checkout...</div>}
      {!loading && (
        <div className="">
          <form onSubmit={handleSubmitForm} id="payment-form">
            <div className="mb-6">
              <Heading title="Enter your details to complete checkout" />
            </div>
            <h2 className="font-semibold mt-4 mb-2">Addres Information</h2>
            <AddressElement
              onChange={(event) => {
                setFomrValueToState(event);
              }}
              id="address-element"
              options={{
                mode: "shipping",
                allowedCountries: ["MX"],
                fields: {
                  phone: "always",
                },
              }}
            />
            <h2 className="font-semibold mt-4 mb-2">Choose a carrier</h2>
            <div className="flex justify-between">
              <button
                className="mb-2 font-semibold p-3 bg-purple-200"
                onClick={() => createNewQuote()}
              >
                cotizar mi envio
              </button>
              {/* <button
                className="mb-2 font-semibold p-3 bg-purple-200"
                onClick={() => showProducts()}
              >
                show products
              </button> */}
              <button
                className="mb-2 font-semibold p-3 bg-purple-200"
                onClick={() => showProducts()}
              >
                show products
              </button>
              <button
                className="mb-2 font-semibold p-3 bg-purple-200"
                onClick={() => createShipment()}
              >
                create shipment
              </button>
            </div>
            <Quotes
              quotes={quotes}
              selectedQuote={selectedQuote}
              setSelectedQuote={setSelectedQuote}
            />
            <div className="flex justify-center">
              {couriers &&
                couriers.map((courier) => {
                  return (
                    <div key={courier} className="flex flex-col m-2 ">
                      <h1>{courier} </h1>
                      <input
                        className="cursor-pointer"
                        type="radio"
                        value={courier}
                        {...register("courier")}
                      />
                    </div>
                  );
                })}
            </div>
            <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
            <div className="py-4 text-center text-slate-700 text-xl font-bold">
              Total with no shipping: {formatPrice(cartTotalAmount)}
            </div>
            <div className="py-4 text-center text-slate-700 text-xl font-bold">
              {shippingPrice ? (
                <span>
                  Total: {formatPrice(cartTotalAmount + shippingPrice)}
                </span>
              ) : (
                <span> </span>
              )}
            </div>
            <Button
              label={isLoading && isLoading ? "Processing" : "Pay now"}
              disabled={(isLoading && isLoading) || !stripe || !elements}
              // label={isLoading ? "Processing" : "Pay now"}
              // disabled={isLoading || !stripe || !elements}
              onClick={() => {}} // this submits the form by default
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
