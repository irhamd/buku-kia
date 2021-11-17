import { AirlineSeatFlatAngled, DeveloperBoard, People, PermContactCalendar, PersonAdd, PlaylistAddCheckOutlined } from "@material-ui/icons";
import InputKehamilanSaatIni from "components/DataKehamilan/InputKehamilanSaatIni";
import JadwalKunjungan from "components/DataKehamilan/JadwalKunjungan";
import InputKunjungan from "components/Kunjungan/InputKunjungan";
import AturTindakan from "components/Master/AturTindakan";
import DataPasien from "components/Pasien/DataPasien";
import InputPasienBaru from "components/Pasien/InputPasienBaru";
import LembarKerjaBidan from "components/Pasien/LembarKerjaBidan";
import PasienRegistrasi from "components/Pasien/PasienRegistrasi";
import DataPasienRujuk from "components/Pasien/Rujukan/DataPasienRujuk";
import MonitoringPasienEmergency from "components/Test/MonitoringPasienEmergency";
import TestFirebasePuskesmas from "components/Test/TestFirebasePuskesmas";
import TestMaps from "components/Test/TestMaps";

import DashboardPage from "views/Dashboard/Dashboard.js";
import Dashboard from "@material-ui/icons/Dashboard";



export  const routes_bidan = [
    
    {
      path: "/TestMaps",
      name: "TestMaps",
      icon: Dashboard,
      component: TestMaps,
      layout: "/admin",
      show : true,
    },
    {
      path: "/TestFirebase",
      name: "Test Firebase",
      icon: Dashboard,
      component: TestFirebasePuskesmas,
      layout: "/admin",
      // show : true,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: Dashboard,
      component: DashboardPage,
      layout: "/admin",
      show : true,
    },
    {
      path: "/dataPasien",
      name: "Data Pasien",
      icon: PermContactCalendar,
      component: DataPasien,
      layout: "/admin",
      show : true,
    },
    {
      path: "/PasienRegistrasi",
      name: "Pasien Registrasi",
      icon: People,
      component: PasienRegistrasi,
      layout: "/admin",
      show : true,
    },
  
    {
      path: "/InputPasienBaru",
      name: "Pasien Baru",
      icon: PersonAdd,
      component: InputPasienBaru,
      layout: "/admin",
      show : true,
    },
    {
      path: "/InputKehamilanSaatIni",
      name: "DataKehamilan",
      icon: PersonAdd,
      component: InputKehamilanSaatIni,
      layout: "/admin",
    },
  
    {
      path: "/InputKunjungan",
      name: "Input Kunjungan",
      icon: PersonAdd,
      component: InputKunjungan,
      layout: "/admin",
    },
    {
      path: "/JadwalKunjungan",
      name: "Jadwal Kunjungan",
      icon: PersonAdd,
      component: JadwalKunjungan,
      layout: "/admin",
    },
    {
      path: "/DataPasienRujuk",
      name: "Data Pasien Di Rujuk",
      icon: AirlineSeatFlatAngled,
      component: DataPasienRujuk,
      layout: "/admin",
      show : true,
    },
    {
      path: "/LembarKerjaBidan",
      name: "Lembar Kerja Bidan",
      icon: PersonAdd,
      component: LembarKerjaBidan,
      layout: "/admin",
    },
    {
      path: "/AturTindakan",
      name: "Master Keluhan",
      icon: PlaylistAddCheckOutlined,
      component: AturTindakan,
      layout: "/admin",
      show : true,
    },
  
  ];
  