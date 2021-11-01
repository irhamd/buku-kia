import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import DataPasien from "components/Pasien/DataPasien";
import { PersonAdd, VerifiedUserSharp } from "@material-ui/icons";
import InputPasienBaru from "components/Pasien/InputPasienBaru";
import ShowWebcam from "services/WebCam/ShowWebcam";
import InputKehamilanSaatIni from "components/DataKehamilan/InputKehamilanSaatIni";
import InputKunjungan from "components/Kunjungan/InputKunjungan";
import AttemptLogin from "components/Auth/AttemptLogin";
import JadwalKunjungan from "components/DataKehamilan/JadwalKunjungan";
import DataPasienRujuk from "components/Pasien/Rujukan/DataPasienRujuk";
import PemeriksaanDokter from "components/Pasien/PemeriksaanDokter/PemeriksaanDokter";
import { _Cache } from "services/Cache";
import { dataPegawai, userLogin } from "services/Text/GlobalText";

// var role =  _Cache.get(globalText.x_auth_resu)

console.log(`role`, userLogin)

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
    icon: PersonAdd,
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

]

const bidan = [
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
    icon: PersonAdd,
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
