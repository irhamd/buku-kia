import Dashboard from "@material-ui/icons/Dashboard";
import DashboardPage from "views/Dashboard/Dashboard.js";
import DataPasien from "components/Pasien/DataPasien";
import { PersonAdd, People } from "@material-ui/icons";
import InputPasienBaru from "components/Pasien/InputPasienBaru";
import InputKehamilanSaatIni from "components/DataKehamilan/InputKehamilanSaatIni";
import InputKunjungan from "components/Kunjungan/InputKunjungan";
import JadwalKunjungan from "components/DataKehamilan/JadwalKunjungan";
import DataPasienRujuk from "components/Pasien/Rujukan/DataPasienRujuk";
import PemeriksaanDokter from "components/Pasien/PemeriksaanDokter/PemeriksaanDokter";
import { _Cache } from "services/Cache";
import { dataPegawai, userLogin } from "services/Text/GlobalText";
import LembarKerjaBidan from "components/Pasien/LembarKerjaBidan";
import AturTindakan from "components/Master/AturTindakan";
import EvaluasiKesehatanBumil from "components/Pasien/PemeriksaanDokter/EvaluasiKesehatanBumil";
import TestFirebase from "components/Test/TestFirebase";

// var role =  _Cache.get(globalText.x_auth_resu)

console.log(`userLogin`, userLogin)

var role = userLogin.role

const dokter = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/dataPasien",
    name: "Data Pasien",
    icon: People,
    component: DataPasien,
    layout: "/admin",
  },
  {
    path: "/PemeriksaanDokter",
    name: "Pemeriksaan Dokter",
    icon: PersonAdd,
    component: PemeriksaanDokter,
    layout: "/admin",
  },
  {
    path: "/EvaluasiKesehatanBumil",
    name: "Evaluasi Kesehatan",
    icon: PersonAdd,
    component: EvaluasiKesehatanBumil,
    layout: "/admin",
  },

]

const bidan = [
  {
    path: "/TestFirebase",
    name: "TestFirebase",
    icon: Dashboard,
    component: TestFirebase,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/dataPasien",
    name: "Data Pasien",
    icon: People,
    component: DataPasien,
    layout: "/admin",
  },

  {
    path: "/InputPasienBaru",
    name: "Pasien Baru",
    icon: PersonAdd,
    component: InputPasienBaru,
    layout: "/admin",
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
    icon: PersonAdd,
    component: DataPasienRujuk,
    layout: "/admin",
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
    name: "Atur Tindakan",
    icon: PersonAdd,
    component: AturTindakan,
    layout: "/admin",
  },

];

var dashboardRoutes = ""

switch (role) {
  case 'dokter':
    dashboardRoutes = dokter
    break;
  case 'bidan':
    dashboardRoutes = bidan
    break;

}

export default dashboardRoutes;
