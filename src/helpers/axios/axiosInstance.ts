import setAccessToken from "@/app/services/actions/setAccessToken";
import { getNewAccessToken } from "@/app/services/auth.services";
import { authKey } from "@/constants/authKey";
import { TGenericErrorResponse, TResponseSuccessType } from "@/types";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    console.log(response)
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const responseObject: TResponseSuccessType = {
      //**we are getting response from backend and we get our data in response.data but redux add one more data object here
      data: response?.data?.data,
      meta: response?.data?.meta,
     

    };
    return responseObject;
  },
  async function (error) {
    const config = error?.config;
    if (error?.response?.status === 500 && !config.sent) {
      config.sent = true;

      const response = await getNewAccessToken();
      console.log(response);
      const accessToken = response?.data?.accessToken;
      config.headers["Authorization"] = accessToken;
      setToLocalStorage(authKey, accessToken);
      //setting access token also in cookie
      setAccessToken(accessToken)
      return instance(config);
    } else {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      const responseObject: TGenericErrorResponse = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "Something went wrong !",
        errorMessages: error?.response?.data?.message,
      };
      // return Promise.reject(error);
      return responseObject;
    }
  }
);
export { instance };
