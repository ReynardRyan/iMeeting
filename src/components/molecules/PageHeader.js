import CustomBreadcrumb from "../../components/atoms/Breadcrumb";
import colors from "../../styles/colors";
import { IoIosArrowBack } from "react-icons/io";
import CustomButton from "../atoms/Button";

const PageHeader = ({
  title,
  breadcrumbs,
  action,
  status = "list",
  onBack,
}) => {
  return (
    <div
      style={{
        width: "100%",
        // minHeight: "121px",
        // padding: "24px 36px 36px 28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "32px",
        borderRadius: "8px",
        top: "68px",
        left: "72px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "start",
          gap: "16px",
        }}
      >
        {status === "form" && (
          <CustomButton
            variant="light"
            onClick={onBack}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "8px",
              padding: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.primary,
              color: "#fff",
              border: "none",
              flexShrink: 0,
            }}
          >
            <IoIosArrowBack size={18} />
          </CustomButton>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <label
            style={{
              margin: 0,
              fontWeight: 700,
              fontSize: "28px",
              lineHeight: "100%",
              letterSpacing: "0.25%",
              color: colors.text,
            }}
          >
            {title}
          </label>
          <CustomBreadcrumb items={breadcrumbs} />
        </div>
      </div>

      {status === "list" && <div>{action}</div>}
    </div>
  );
};

export default PageHeader;
