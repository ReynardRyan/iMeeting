import { Navbar, Container, Nav } from "react-bootstrap";
import plnImage from "../../assets/images/pln_image.png";
import { MdKeyboardArrowDown } from "react-icons/md";
import colors from "../../styles/colors";
import CustomButton from "../atoms/Button";
import { ReactComponent as IconSpeaker } from "../../assets/icons/speaker.svg";
import { ReactComponent as IconNotification } from "../../assets/icons/notification.svg";

const CustomNavbar = () => {
  return (
    <Navbar
      expand="lg"
      fixed="top"
      style={{
        background: "linear-gradient(to right, #0099cc, #006699)",
        height: "68px",
        padding: "8px 24px",
      }}
    >
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        <Navbar.Brand
          href="/"
          className="d-flex align-items-center"
          style={{ gap: 20 }}
        >
          <img
            src={plnImage}
            alt="PLN Logo"
            style={{
              width: "38px",
              height: "52px",
              opacity: 1,
            }}
          />
          <span
            style={{
              fontFamily: "Open Sans, sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "0.25%",
              color: "#FFFFFF",
            }}
          >
            iMeeting
          </span>
        </Navbar.Brand>

        <Nav className="d-flex align-items-center" style={{ gap: "12px" }}>
          <a
            href="https://web.pln.co.id/kontak-kami"
            className="text-decoration-none"
          >
            <CustomButton
              style={{
                width: "148px",
                height: "40px",
                paddingTop: "8px",
                paddingRight: "12px",
                paddingBottom: "8px",
                paddingLeft: "8px",
                gap: "8px",
                borderRadius: "8px",
                backgroundColor: colors.secondary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                cursor: "pointer",
              }}
              icon={<IconSpeaker width={18} height={20} />}
            >
              Kotak Aduan
            </CustomButton>
          </a>
          <Nav.Link href="#">
            <IconNotification
              width={18}
              height={18}
              color={colors.background}
            />
          </Nav.Link>
          <Nav.Link href="#" className="text-white d-flex align-items-center">
            <img
              src="https://i.pravatar.cc/30"
              alt="avatar"
              className="rounded-circle me-2"
              style={{ width: "32px", height: "32px" }}
            />
            <span className="fw-semibold">
              John Doe <MdKeyboardArrowDown />
            </span>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
