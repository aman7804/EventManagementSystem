import baseService from "services/base.service";
import Config from "config/index";
import { IPackage, IPackagePagination } from "interfaces/package.interface";

const baseUrl = Config.env.BaseUrl;

const venueBaseUrl = `${baseUrl}/api/Package`;

const getList = async (payload: IPackagePagination) =>
  baseService.post(`${venueBaseUrl}/list`, payload);

const save = async (payload: IPackage) =>
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