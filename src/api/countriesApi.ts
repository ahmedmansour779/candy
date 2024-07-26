import axios from "axios";
import { country } from "../types/backend";

function getCountries() {
  return axios.get<null, { data: country[] }>(
    `https://restcountries.com/v3.1/all`
    // { params: { fields: "name,timezones" } }
  );
}
function getTimezone(countryName: string) {
  return axios.get<null, { data: country[] }>(
    `https://restcountries.com/v3.1/name/${countryName}`,
    { params: { fields: "name,timezones" } }
  );
}
const countriesApi = {
  getCountries,
  getTimezone,
};
export default countriesApi;
