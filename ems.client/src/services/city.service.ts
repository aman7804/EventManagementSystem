import baseService from "services/base.service";
import Config from "config/index";

const baseUrl = Config.env.BaseUrl;

const cityBaseUrl = `${baseUrl}/api/City`;

const getDropDownList = async (payload: { id?: number }) => {
  return payload.id
    ? baseService.get(`${cityBaseUrl}/drop-down-list/${payload.id}`)
    : baseService.get(`${cityBaseUrl}/drop-down-list`) 
} 


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getDropDownList
};
