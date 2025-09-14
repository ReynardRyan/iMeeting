import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Layout from "../../components/organisms/Layout";
import PageHeader from "../../components/molecules/PageHeader";
import Input from "../../components/atoms/Input";
import Select from "../../components/atoms/Select";
import Checkbox from "../../components/atoms/Checkbox";
import CustomButton from "../../components/atoms/Button";
import { getMasterOffice } from "../../services/masterOffice";
import { getMasterMeetingRooms } from "../../services/masterMeetingRooms";
import { getMasterJenisKonsumsi } from "../../services/masterJenisKonsumsi";
import colors from "../../styles/colors";
import { getToday } from "../../utils/date";
import CustomDatepicker from "../../components/atoms/Datepicker";

const MeetingForm = () => {
  const navigate = useNavigate();
  const breadcrumbItems = [
    { label: "Ruang Meeting", path: "/meeting-room" },
    { label: "Pesan Ruangan" },
  ];

  const [units, setUnits] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [allJenisKonsumsi, setAllJenisKonsumsi] = useState([]);
  const [selectedRoomCapacity, setSelectedRoomCapacity] = useState(0);

  const fetchAll = async () => {
    try {
      const office = await getMasterOffice();
      setUnits(office.map((o) => ({ value: o.id, label: o.officeName })));

      const meetingRooms = await getMasterMeetingRooms();
      setAllRooms(meetingRooms);

      const konsumsi = await getMasterJenisKonsumsi();
      setAllJenisKonsumsi(konsumsi);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      unit: "",
      ruang: "",
      tanggal: "",
      waktuMulai: "",
      waktuSelesai: "",
      peserta: "",
      konsumsi: [],
      nominal: 0,
    },
    validationSchema: Yup.object().shape({
      unit: Yup.string().required("Unit wajib dipilih"),
      ruang: Yup.string().required("Ruang wajib dipilih"),
      tanggal: Yup.string().required("Tanggal wajib diisi"),
      waktuMulai: Yup.string().required("Waktu mulai wajib diisi"),
      waktuSelesai: Yup.string().required("Waktu selesai wajib diisi"),
      peserta: Yup.number()
        .typeError("Peserta harus berupa angka")
        .min(1, "Minimal 1 peserta")
        .required("Jumlah peserta wajib diisi"),
      nominal: Yup.number().typeError("Nominal harus angka"),
    }),
    validate: (values) => {
      const errors = {};

      if (values.tanggal && values.waktuMulai) {
        const now = new Date();
        const start = new Date(`${values.tanggal}T${values.waktuMulai}`);
        if (start < now) {
          errors.waktuMulai =
            "Waktu mulai tidak boleh lebih kecil dari waktu sekarang";
        }
      }

      if (values.tanggal && values.waktuMulai && values.waktuSelesai) {
        const start = new Date(`${values.tanggal}T${values.waktuMulai}`);
        const end = new Date(`${values.tanggal}T${values.waktuSelesai}`);
        if (end < start) {
          errors.waktuSelesai =
            "Waktu selesai tidak boleh lebih kecil dari waktu mulai";
        }
      }

      if (values.ruang && values.peserta) {
        const selectedRoom = allRooms.find((r) => r.id === values.ruang);
        if (selectedRoom && Number(values.peserta) > selectedRoom.capacity) {
          errors.peserta = `Jumlah peserta tidak boleh lebih dari kapasitas ruangan (${selectedRoom.capacity})`;
        }
      }

      return errors;
    },
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  useEffect(() => {
    const unit = formik.values.unit;
    if (unit) {
      const filtered = allRooms
        .filter((room) => room.officeId === unit)
        .map((room) => ({
          value: room.id,
          label: room.roomName,
          capacity: room.capacity,
        }));
      console.log(filtered, "ll");

      setRooms(filtered);
      if (formik.values.ruang) formik.setFieldValue("ruang", "");
    } else {
      setRooms([]);
      formik.setFieldValue("ruang", "");
    }
  }, [formik.values.unit, allRooms]);

  useEffect(() => {
    const selectedRoom = allRooms.find((r) => r.id === formik.values.ruang);
    setSelectedRoomCapacity(selectedRoom ? selectedRoom.capacity : 0);
  }, [formik.values.ruang, allRooms]);

  const { waktuMulai, waktuSelesai, peserta } = formik.values;
  useEffect(() => {
    if (!waktuMulai || !waktuSelesai || !peserta) {
      formik.setFieldValue("konsumsi", []);
      formik.setFieldValue("nominal", 0);
      return;
    }

    const startHour = parseInt(waktuMulai.split(":")[0], 10);
    const endHour = parseInt(waktuSelesai.split(":")[0], 10);
    const konsumsiList = [];

    if (startHour < 11) konsumsiList.push("Snack Siang");
    if (startHour < 14 && endHour >= 11) konsumsiList.push("Makan Siang");
    if (endHour >= 14) konsumsiList.push("Snack Sore");

    const uniqueKonsumsi = Array.from(new Set(konsumsiList));
    formik.setFieldValue("konsumsi", uniqueKonsumsi);

    const selectedKonsumsiObjects = allJenisKonsumsi.filter((jk) =>
      uniqueKonsumsi.includes(jk.name)
    );
    const totalPerPerson = selectedKonsumsiObjects.reduce(
      (sum, it) => sum + (Number(it.maxPrice) || 0),
      0
    );

    const pesertaNum = Number(peserta) || 0;
    formik.setFieldValue("nominal", pesertaNum * totalPerPerson);
  }, [waktuMulai, waktuSelesai, peserta, allJenisKonsumsi]);

  return (
    <Layout>
      <PageHeader
        status="form"
        title="Ruang Meeting"
        breadcrumbs={breadcrumbItems}
        onBack={() => navigate(-1)}
      />

      <Form
        onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          background: colors.background,
          padding: "20px 28px",
          boxShadow: "0px 4px 20px 0px rgba(106, 106, 106, 0.1)",
          border: "1px solid #EEEEEE",
          borderRadius: "8px",
          gap: "36px",
        }}
      >
        <div className="d-flex flex-column" style={{ gap: "16px" }}>
          <label
            style={{
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "100%",
              color: colors.text,
            }}
          >
            Informasi Ruang Meeting
          </label>
          <div className="row row-form">
            <div className="col-md-3">
              <Select
                label="Unit"
                name="unit"
                options={units}
                value={formik.values.unit}
                onChange={formik.handleChange}
                error={formik.touched.unit && formik.errors.unit}
              />
            </div>
            <div className="col-md-3">
              <Select
                label="Ruang Meeting"
                name="ruang"
                options={rooms}
                value={formik.values.ruang}
                onChange={formik.handleChange}
                error={formik.touched.ruang && formik.errors.ruang}
              />
            </div>
          </div>
          <div className="row row-form">
            <div className="col-md-3">
              <Input
                label="Kapasitas"
                type="number"
                name="kapasitas"
                value={selectedRoomCapacity}
                readOnly
              />
            </div>
          </div>
        </div>

        <hr />

        <div className="d-flex flex-column" style={{ gap: "16px" }}>
          <label
            style={{
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "100%",
              color: colors.text,
            }}
          >
            Informasi Rapat
          </label>
          <div className="row row-form">
            <div className="col-md-3">
              <CustomDatepicker
                label="Tanggal Rapat"
                name="tanggal"
                value={formik.values.tanggal}
                onChange={formik.handleChange}
                error={formik.touched.tanggal && formik.errors.tanggal}
                min={getToday()}
              />
            </div>
            <div className="col-md-3">
              <Input
                label="Waktu Mulai"
                type="time"
                name="waktuMulai"
                value={formik.values.waktuMulai}
                onChange={formik.handleChange}
                error={formik.touched.waktuMulai && formik.errors.waktuMulai}
              />
            </div>
            <div className="col-md-3">
              <Input
                label="Waktu Selesai"
                type="time"
                name="waktuSelesai"
                value={formik.values.waktuSelesai}
                onChange={formik.handleChange}
                error={
                  formik.touched.waktuSelesai && formik.errors.waktuSelesai
                }
              />
            </div>
          </div>
          <div className="row row-form">
            <div className="col-md-3">
              <Input
                label="Jumlah Peserta"
                type="number"
                name="peserta"
                value={formik.values.peserta}
                onChange={formik.handleChange}
                error={formik.touched.peserta && formik.errors.peserta}
              />
            </div>
          </div>

          <div className="row row-form-konsumsi">
            <div className="mb-3">
              <label
                className="form-label"
                style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "100%",
                  color: colors.text,
                }}
              >
                Konsumsi Rapat
              </label>
              {formik.values.konsumsi.length > 0 ? (
                formik.values.konsumsi.map((k) => (
                  <Checkbox key={k} label={k} checked readOnly />
                ))
              ) : (
                <p className="text-muted">-</p>
              )}
            </div>
          </div>

          <div className="row row-form">
            <div className="col-md-3">
              <Input
                label="Nominal Konsumsi"
                type="currency"
                name="nominal"
                value={formik.values.nominal}
                onChange={() => {}}
                error={formik.touched.nominal && formik.errors.nominal}
                readOnly
              />
            </div>
          </div>
        </div>

        <hr />

        <div className="d-flex justify-content-end" style={{ gap: "10px" }}>
          <CustomButton
            variant="nude"
            style={{ color: colors.danger }}
            type="button"
            onClick={() => formik.resetForm()}
          >
            Batal
          </CustomButton>
          <CustomButton
            type="submit"
            disabled={
              !formik.values.unit ||
              !formik.values.ruang ||
              !formik.values.tanggal ||
              !formik.values.waktuMulai ||
              !formik.values.waktuSelesai ||
              !formik.values.peserta
            }
          >
            Simpan
          </CustomButton>
        </div>
      </Form>
    </Layout>
  );
};

export default MeetingForm;
