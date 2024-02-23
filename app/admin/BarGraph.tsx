"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  Tooltip,
  Legend,
  LinearScale,
  BarElement,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import useSWR from "swr";
import CustomCheckBox from "../components/inputs/CustomCheckBoxs";
import { useForm } from "react-hook-form";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }
  return response.json();
};

const BarGraph = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      days: 6,
    },
  });
  const [days, setDays] = useState(6);
  const { data, isLoading } = useSWR(`/api/graph-data?days=${days}`, fetcher);
  // const isLoading = true;
  const watchAllFields = watch();
  useEffect(() => {
    const { days } = watchAllFields;
    console.log("days", days);

    setDays(days);
  }, [watchAllFields, days]);

  const labels = data?.map((item: any) => item.day);
  const amounts = data?.map((item: any) => item.totalAmount);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Sale amount",
        data: amounts,
        backgroundColor: "rgba(74, 192, 192 ,0.6)",
        borderColor: "rgba(74, 192, 192 ,1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mt-4 mx-auto max-w[11150px]  ">
      <form>
        <div className="flex flex-row mx-auto justify-center gap-6">
          <div>
            <label>
              <div>
                <input
                  defaultChecked
                  type="radio"
                  value={6}
                  {...register("days")}
                />
                last 6 days
              </div>
            </label>
          </div>

          <div>
            <label>
              <div>
                <input type="radio" value={30} {...register("days")} />
                last 30 days
              </div>
            </label>
          </div>

          <div>
            <label>
              <div>
                <input type="radio" value={185} {...register("days")} />
                last 6 months
              </div>
            </label>
          </div>

          <div>
            <label>
              <div>
                <input type="radio" value={365} {...register("days")} />
                last year
              </div>
            </label>
          </div>
        </div>
      </form>
      {isLoading ? (
        <div className="w-full text-center font-semibold text-lg">
          <p>Graph loading...</p>
        </div>
      ) : (
        <Bar data={chartData} options={options}></Bar>
      )}
    </div>
  );
};

export default BarGraph;
