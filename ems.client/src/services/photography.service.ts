import baseService from "services/base.service";
import Config from "config/index";
import { IPhotography, IPhotographyPagination } from "interfaces/photography.interface";

const baseUrl = Config.env.BaseUrl;

const venueBaseUrl = `${baseUrl}/api/Photography`;

const getList = async (payload: IPhotographyPagination) => 
  baseService.post(`${venueBaseUrl}/list`, payload);

const save = async (payload: IPhotography) =>
  baseService.post(`${venueBaseUrl}/save`, payload);

const getById = async ( payload: { id: number }) =>
  baseService.get(`${venueBaseUrl}/index/${payload.id}`);

const deleteById = async (payload: { id: number }) =>
  baseService.delete(`${venueBaseUrl}/delete/${payload.id}`);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getList,
  save,
  getById,
  deleteById,
};
