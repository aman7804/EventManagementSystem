import baseService from "services/base.service";
import Config from "config/index";
import { ICatering, ICateringPagination } from "interfaces/catering.interface";

const baseUrl = Config.env.BaseUrl;

const cateringBaseUrl = `${baseUrl}/api/Catering`;

const getList = async (payload: ICateringPagination) => 
  baseService.post(`${cateringBaseUrl}/list`, payload);

const save = async (payload: ICatering) =>
  baseService.post(`${cateringBaseUrl}/save`, payload);

const getById = async ( payload: { id: number }) =>
  baseService.get(`${cateringBaseUrl}/index/${payload.id}`);

const deleteById = async (payload: { id: number }) =>
  baseService.delete(`${cateringBaseUrl}/delete/${payload.id}`);

const getDropDownList = async () =>
  baseService.get(`${cateringBaseUrl}/drop-down-list`);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getList,
  save,
  getById,
  deleteById,
  getDropDownList
};
