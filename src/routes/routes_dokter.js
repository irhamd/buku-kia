
import { People, PersonAdd } from "@material-ui/icons";
import Dashboard from "@material-ui/icons/Dashboard";
import InputKehamilanSaatIni from "components/DataKehamilan/InputKehamilanSaatIni";
import JadwalKunjungan from "components/DataKehamilan/JadwalKunjungan";
import InputKunjungan from "components/Kunjungan/InputKunjungan";
import AturTindakan from "components/Master/AturTindakan";
import DataPasien from "components/Pasien/DataPasien";
import InputPasienBaru from "components/Pasien/InputPasienBaru";
import LembarKerjaBidan from "components/Pasien/LembarKerjaBidan";
import PasienRegistrasi from "components/Pasien/PasienRegistrasi copy";
import EvaluasiKesehatanBumil from "components/Pasien/PemeriksaanDokter/EvaluasiKesehatanBumil";
import PemeriksaanDokter from "components/Pasien/PemeriksaanDokter/PemeriksaanDokter";
import DataPasienRujuk from "components/Pasien/Rujukan/DataPasienRujuk";
import MonitoringPasienEmergency from "components/Test/MonitoringPasienEmergency";
import TestFirebasePuskesmas from "components/Test/TestFirebasePuskesmas";
import TestMaps from "components/Test/TestMaps";
import DashboardPage from "views/Dashboard/Dashboard.js";


export const routes_dokter = [
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
      icon: People,
      component: DataPasien,
      layout: "/admin",
      show : true,
    },
    {
      path: "/PemeriksaanDokter",
      name: "Pemeriksaan Dokter",
      icon: PersonAdd,
      component: PemeriksaanDokter,
      layout: "/admin",
      show : true,
    },
    {
      path: "/EvaluasiKesehatanBumil",
      name: "Evaluasi Kesehatan",
      icon: PersonAdd,
      component: EvaluasiKesehatanBumil,
      layout: "/admin",
    },
  
  ]
   