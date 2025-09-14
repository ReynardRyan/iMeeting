import colors from "../../styles/colors";

const BarChartHorizontal = ({ type, value, color, maxValue = 200 }) => {
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
        height: "31px",
      }}
    >
      <span style={{ fontSize: "12px", color: "#495057" }}>{type}</span>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "120px",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontWeight: "600",
            lineHeight: "14px",
          }}
        >
          {value}
        </span>

        <div
          style={{
            height: "8px",
            width: "100%",
            backgroundColor: "#e9ecef",
            borderRadius: "4px",
            overflow: "hidden",
            marginTop: "4px",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${percentage}%`,
              backgroundColor: colors.chart,
              borderRadius: "4px",
              transition: "width 0.5s ease-in-out",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BarChartHorizontal;
