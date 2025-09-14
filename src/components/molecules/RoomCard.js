import React from "react";
import DonutChart from "./DonutChart";
import BarChartHorizontal from "./BarChartHorizontal";
import colors from "../../styles/colors";
import { formatCurrencyWithSymbol } from "../../utils/currency";

const calculateOccupancyPercentage = (occupancy, capacity) => {
  return ((parseInt(occupancy) / parseInt(capacity)) * 100).toFixed(1);
};

const RoomCard = ({ room, index, officeIndex }) => {
  const occupancyPercentage = calculateOccupancyPercentage(
    room.averageOccupancyPerMonth,
    room.capacity
  );
  const totalConsumptionValue = room.totalConsumption.reduce(
    (sum, item) => sum + parseInt(item.totalPrice),
    0
  );

  const chartData = [
    { value: parseInt(room.averageOccupancyPerMonth) },
    {
      value: parseInt(room.capacity) - parseInt(room.averageOccupancyPerMonth),
    },
  ];

  const chartId = `chart-${officeIndex}-${index}`;

  return (
    <div style={{ width: "230px", minHeight: "253px" }}>
      <div
        className="card shadow-sm border-0"
        style={{ backgroundColor: "#F2F2F2" }}
      >
        <div className="card-body d-flex flex-column">
          <label className="room-name">{room.roomName}</label>

          <div className="d-flex flex-column">
            <div
              className="d-flex align-items-center justify-content-between"
              style={{ padding: "8px 0" }}
            >
              <div className="d-flex flex-column" style={{ gap: "6px" }}>
                <label className="percentage-category">
                  Persentase Pemakaian
                </label>
                <label className="chart-value">{occupancyPercentage}%</label>
              </div>
              <DonutChart data={chartData} chartId={chartId} />
            </div>

            <div
              className="d-flex flex-column align-items-start"
              style={{ gap: "6px", marginBottom: "6px" }}
            >
              <label className="percentage-category">Nominal Konsumsi</label>
              <label className="chart-value">
                {formatCurrencyWithSymbol(totalConsumptionValue)}
              </label>
            </div>

            <div>
              <div className="consumption-details">
                {room.totalConsumption.map((consumption, idx) => {
                  return (
                    <BarChartHorizontal
                      key={idx}
                      type={consumption.name}
                      value={consumption.totalPackage}
                      color={colors.chart}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
