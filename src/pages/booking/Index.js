import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../../components/atoms/Button";
import Layout from "../../components/organisms/Layout";
import PageHeader from "../../components/molecules/PageHeader";
import { FiPlus } from "react-icons/fi";
const MeetingList = () => {
  return (
    <Layout>
      <PageHeader
        title="Ruang Meeting"
        breadcrumbs={[{ label: "Ruang Meeting" }]}
        action={
          <Link
            to="/meeting-room/booking-meeting-room"
            className="text-decoration-none"
          >
            <CustomButton icon={<FiPlus />}>Pesan Ruangan</CustomButton>
          </Link>
        }
      />
    </Layout>
  );
};

export default MeetingList;
