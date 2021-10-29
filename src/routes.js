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

const dashboardRoutes = [

  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/dataPasien",
    name: "Data Pasien",
    rtlName: "قائمة الجدول",
    icon: PersonAdd,
    component: DataPasien,
    layout: "/admin",
  },

  {
    path: "/InputPasienBaru",
    name: "Pasien Baru",
    rtlName: "قائمة الجدول",
    icon: PersonAdd,
    component: InputPasienBaru,
    layout: "/admin",
  },

  {
    path: "/ShowWebcam",
    name: "Webcam",
    rtlName: "قائمة الجدول",
    icon: PersonAdd,
    component: ShowWebcam,
    layout: "/admin",
  },
  {
    path: "/InputKehamilanSaatIni",
    name: "DataKehamilan",
    rtlName: "قائمة الجدول",
    icon: PersonAdd,
    component: InputKehamilanSaatIni,
    layout: "/admin",
  },

  {
    path: "/InputKunjungan",
    name: "Input Kunjungan",
    rtlName: "قائمة الجدول",
    icon: PersonAdd,
    component: InputKunjungan,
    layout: "/admin",
  },
  {
    path: "/JadwalKunjungan",
    name: "Jadwal Kunjungan",
    rtlName: "قائمة الجدول",
    icon: PersonAdd,
    component: JadwalKunjungan,
    layout: "/admin",
  },
];

export default dashboardRoutes;
