import { useEffect, useState } from "react";

interface QuotesProps {
  quotes: any;
  selectedQuote: any;
  setSelectedQuote: any;
}
const Quotes: React.FC<QuotesProps> = ({
  quotes,
  selectedQuote,
  setSelectedQuote,
}) => {
  if (quotes && quotes.length > 0) {
    return (
      <div className="flex justify-between ">
        {quotes.map((quote: any) => {
          const {
            alias,
            amount,
            amount_insurance,
            amount_insurance_courier,
            courier,
            courierId,
            currency,
            deliveryDayOfWeek,
            deliveryTimestamp,
            image,
            insurance_availability,
            maxInsurance,
            minInsurance,
            serviceName,
            serviceType,
            zone,
          } = quote;
          return (
            <div
              onClick={() => setSelectedQuote(quote)}
              key={serviceName}
              className={`bg-slate-400  p-4 cursor-pointer rounded
                ${selectedQuote === quote ? "bg-slate-600 text-white" : ""}
                `}
            >
              <p
                className={`${
                  selectedQuote === quote ? " text-white" : "text-black "
                }
                `}
              >
                {serviceName}
              </p>
              <p className="font-bold text-center">
                {amount} {currency}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
};

export default Quotes;
