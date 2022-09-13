import axios from "axios";
import { IGoogleAPILocationResponse, ITrafficCamResponse } from "./interfaces";

const BACKEND_URL = "https://api.data.gov.sg/v1";

interface IFetchWrapper {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  externalUrl?: string;
}

const axiosWrapper = ({ url, method, body, externalUrl }: IFetchWrapper) => {
  let urlToCall = BACKEND_URL;

  if (externalUrl) {
    urlToCall = externalUrl;
  }

  switch (method) {
    case "GET":
      return axios.get(`${urlToCall}/${url}`).then((res) => {
        return res.data;
      });

    case "POST":
      return axios.post(`${urlToCall}/${url}`, body).then((res) => {
        return res.data;
      });

    case "PUT":
      return axios.put(`${urlToCall}/${url}`, body).then((res) => {
        return res.data;
      });

    case "DELETE":
      return axios.delete(`${urlToCall}/${url}`).then((res) => {
        return res.data;
      });
  }
};

export const getTrafficImages: (
  dateTime: string
) => Promise<ITrafficCamResponse> = (
  dateTime: string = "2022-09-13T11:45:57"
) => {
  console.log(dateTime);
  return axiosWrapper({
    url: `transport/traffic-images?date_time=${dateTime}`,
    method: "GET",
  });
};

export const getLocationUsingLatLong: (
  lat: number,
  long: number
) => Promise<IGoogleAPILocationResponse> = (lat: number, long: number) => {
  return axiosWrapper({
    externalUrl: `https://maps.googleapis.com`,
    url: `maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyByQN48s8m41InBkkfPS_7G9Sm5KoNDHi4`,
    method: "GET",
  });
};
