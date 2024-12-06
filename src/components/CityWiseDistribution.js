import React, { useEffect, useState } from "react";
import axiosInstance from "./AxiosInstance";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function CityWiseDistribution() {
  const [chartData, setChartData] = useState({});

  // Fetch city-wise user distribution
  useEffect(() => {
    const fetchCityWiseData = async () => {
      try {
        // Fetch city-wise data from the backend
        const response = await axiosInstance.get("/admin/city-stats");
        const data = response.data;

        // Transform API data into chart format
        const cityLabels = Object.keys(data); // Extract city names
        const cityCounts = Object.values(data); // Extract corresponding user counts

        setChartData({
          labels: cityLabels,
          datasets: [
            {
              label: "Users by City",
              data: cityCounts,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
              hoverBackgroundColor: [
                "#FF6384AA",
                "#36A2EBAA",
                "#FFCE56AA",
                "#4BC0C0AA",
                "#9966FFAA",
                "#FF9F40AA",
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching city-wise user data:", error);
      }
    };

    fetchCityWiseData();
  }, []);

  return (
    <div className="card-dashboard">
      <h2>City-Wise User Distribution</h2>
      {chartData.labels ? (
        <div style={{ height: "300px", width: "300px", margin: "auto" }}>
          <Doughnut
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: true, position: "top" },
              },
            }}
          />
        </div>
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
}
