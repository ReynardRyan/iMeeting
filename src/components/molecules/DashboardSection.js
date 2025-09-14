import RoomCard from "./RoomCard";
import { ReactComponent as IconFlash } from "../../assets/icons/flash.svg";

const DashboardSection = ({ office, officeIndex }) => {
  return (
    <div>
      <div className="d-flex flex-column" style={{ gap: "16px" }}>
        <div style={{ display: "flex", gap: "12px" }}>
          <IconFlash width={24} height={24} />
          <label className="office-label">{office.officeName}</label>
        </div>
        {office.detailSummary.map((room, index) => (
          <RoomCard
            key={index}
            room={room}
            index={index}
            officeIndex={officeIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardSection;
