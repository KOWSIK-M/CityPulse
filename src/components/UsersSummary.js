import React, { useEffect, useState } from "react";
import axiosInstance from "./AxiosInstance";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function UsersSummary() {
  const [userCount, setUserCount] = useState(0);
  const [chartData, setChartData] = useState({});

  // Fetch total user count
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axiosInstance.get("/users/count");
        setUserCount(response.data);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    fetchUserCount();
  }, []);

  // Fetch payment statistics
  useEffect(() => {
    const fetchPaymentStats = async () => {
      try {
        const response = await axiosInstance.get("/users/payment-stats");
        const { Paid, Unpaid } = response.data;

        setChartData({
          labels: ["Paid Users", "Unpaid Users"],
          datasets: [
            {
              label: "Number of Users",
              data: [Paid, Unpaid],
              backgroundColor: ["#4CAF50", "#FF5722"],
              hoverBackgroundColor: ["#66BB6A", "#FF7043"],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching payment stats:", error);
      }
    };

    fetchPaymentStats();
  }, []);

  return (
    <div>
      {/* Total Users */}
      <div className="card-dashboard" style={{ marginBottom: "20px" }}>
        <div>
          <h2>Total Users: {userCount}</h2>
        </div>
      </div>

      {/* Doughnut Chart for User Payment Stats */}
      <div className="card-dashboard">
        <h2>User Payment Stats</h2>
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
    </div>
  );
}
