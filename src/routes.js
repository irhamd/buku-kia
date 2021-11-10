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
import TestMaps from "components/Test/TestMaps";
import MonitoringPasienEmergency from "components/Test/MonitoringPasienEmergency";
import PasienRegistrasi from "components/Pasien/PasienRegistrasi";

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

const bidan = [
  {
    path: "/MonitoringPasienEmergency",
    name: "Pasien Emergency",
    icon: Dashboard,
    component: MonitoringPasienEmergency,
    layout: "/admin",
    show : true,
  },
  {
    path: "/TestMaps",
    name: "TestMaps",
    icon: Dashboard,
    component: TestMaps,
    layout: "/admin",
    show : true,
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
    icon: People,
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
    icon: PersonAdd,
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
    name: "Atur Tindakan",
    icon: PersonAdd,
    component: AturTindakan,
    layout: "/admin",
    show : true,
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
