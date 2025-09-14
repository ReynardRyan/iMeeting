import React, { useState, useEffect } from "react";
import { getDashboard } from "../../services/dashboard";
import DashboardSection from "../../components/molecules/DashboardSection";
import Layout from "../../components/organisms/Layout";
import "./Dashboard.css";
import { ReactComponent as IconGear } from "../../assets/icons/gear.svg";
import Select from "../../components/atoms/Select";

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Jan-2024");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const datas = await getDashboard();

      const periodData =
        datas.find((item) => item.period === selectedPeriod) || datas[0];
      setDashboardData(periodData);
      setError(null);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Gagal memuat data dashboard. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [selectedPeriod]);

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };

  return (
    <Layout>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{
          width: "100%",
          height: "56px",
          padding: "12px 20px",
          gap: "12px",
          opacity: 1,
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <div className="d-flex align-items-center" style={{ gap: "12px" }}>
          <IconGear size={30} />
          <label className="title-dashboard">DASHBOARD</label>
        </div>
      </div>

      <div className="dashboard-container">
        <div
          style={{
            width: "1256px",
            height: "936px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            opacity: 1,
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "240px",
              // height: "52px",
              gap: "4px",
            }}
          >
            <label
              style={{
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "100%",
                letterSpacing: "2%",
                color: "#4E4E4E",
              }}
            >
              Periode
            </label>
            <Select
              options={[
                {
                  value: "Jan-2024",
                  label: "Jan-2024",
                },
                {
                  value: "Feb-2024",
                  label: "Feb-2024",
                },
              ]}
              value={selectedPeriod}
              onChange={handlePeriodChange}
            />
          </div>

          {loading ? (
            <div className="d-flex justify-content-center my-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : dashboardData ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              {dashboardData.data.map((office, index) => (
                <DashboardSection
                  key={index}
                  office={office}
                  officeIndex={index}
                />
              ))}
            </div>
          ) : (
            <div className="alert alert-info" role="alert">
              Tidak ada data untuk ditampilkan.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
