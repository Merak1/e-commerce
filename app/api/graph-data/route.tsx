import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import moment from "moment";

export async function GET(request: NextRequest) {
  //   console.log("request", request);
  console.log("this is request 🎲");
  const query = request.nextUrl.searchParams.get("days");

  console.log("query 😫", query);
  try {
    //get the start and end dates for the data range (7 days ago to today)
    const startDate = moment().subtract(query, "days").startOf("day");
    const endDate = moment().endOf("day");

    //query the db  to get order data grouped by createdDate

    const result = await prisma.order.groupBy({
      by: ["createDate"],
      where: {
        createDate: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
        status: "complete",
      },
      _sum: {
        amount: true,
      },
    });

    //initialize object to aggregate the data by day

    const aggregateData: {
      [day: string]: { day: string; date: string; totalAmount: number };
    } = {};

    // Create a clone of the start date to iterate over each day
    const currentDate = startDate.clone();

    //Iterate over each day in the date range

    while (currentDate <= endDate) {
      //Fromat the day as a string eg: "Monday"
      const day = currentDate.format("dddd");
      console.log("day >>", day, "currentdate >>", currentDate);

      //Initialize the aggregated data for the day with the day, date and totalamount

      aggregateData[day] = {
        day,
        date: currentDate.format("YYYY-MM-DD"),
        totalAmount: 0,
      };

      //move to the next day

      currentDate.add(1, "day");
    }

    //   calculate the total amount for each day by adding the order amounts

    result.forEach((entry) => {
      const day = moment(entry.createDate).format("dddd");
      const amount = entry._sum.amount || 0;
      aggregateData[day].totalAmount += amount;
    });

    //   convert the aggregated data object to an array and sort it by date

    const formattedData = Object.values(aggregateData).sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    );

    return NextResponse.json(formattedData);
  } catch (error: any) {
    throw new Error(error);
  }
}
