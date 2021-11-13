
import { People, PersonAdd } from "@material-ui/icons";
import Dashboard from "@material-ui/icons/Dashboard";
import InputKehamilanSaatIni from "components/DataKehamilan/InputKehamilanSaatIni";
import JadwalKunjungan from "components/DataKehamilan/JadwalKunjungan";
import InputKunjungan from "components/Kunjungan/InputKunjungan";
import AturTindakan from "components/Master/AturTindakan";
import DataPasien from "components/Pasien/DataPasien";
import InputPasienBaru from "components/Pasien/InputPasienBaru";
import LembarKerjaBidan from "components/Pasien/LembarKerjaBidan";
import EvaluasiKesehatanBumil from "components/Pasien/PemeriksaanDokter/EvaluasiKesehatanBumil";
import PemeriksaanDokter from "components/Pasien/PemeriksaanDokter/PemeriksaanDokter";
import DataPasienRujuk from "components/Pasien/Rujukan/DataPasienRujuk";
import MonitoringPasienEmergency from "components/Test/MonitoringPasienEmergency";
import TestFirebasePuskesmas from "components/Test/TestFirebasePuskesmas";
import TestMaps from "components/Test/TestMaps";
import DashboardPage from "views/Dashboard/Dashboard.js";


export const routes_rs = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    show: true,
  },
  {
    path: "/MonitoringPasienEmergency",
    name: "Pasien Emergency",
    icon: Dashboard,
    component: MonitoringPasienEmergency,
    layout: "/admin",
    show: true,
  },

]
