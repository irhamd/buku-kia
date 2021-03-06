import Axios from 'axios'
import Cookies from 'js-cookie';
import { Cache } from 'services/Cache';
import { ubahText } from '../Crypto';
import { gcookies, globalText } from '../Text/GlobalText';
// export const baseURL = process.env.REACT_APP_BASE_URL_229
export const baseURL = process.env.REACT_APP_BASE_URL
// export const baseURL = process.env.REACT_APP_BASE_URL_JSON_SERVER

// let cek = Cache.get(globalText.authorization);
var cekcookies = Cookies.get(gcookies.kia)
let auth = ubahText(cekcookies ? cekcookies : "{}");


export const authToken = auth
const _Api = () => {

  // const auth = "15|SThEB5FoT7hxBmeckgn9nPquWkmtb0XXVc8az92Y";
  const defaultOptions = {
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': auth && `Bearer ${ubahText(auth)}`
      'Authorization': `Bearer ${auth}`
      // 'X-TOKEN' :auth,
      // 'X-CSRF-Token' : sessionStorage.getItem('tokencrsf')
    },
  };

  let instance = Axios.create(defaultOptions)
  instance.interceptors.request.use(function (config) {
    // const token =  auth ? auth : 'unAuthorization';
    // const token = 'Authorization';
    // config.headers.Authorization =  token;
    return config;
  });

  return instance;
};
export default _Api();
