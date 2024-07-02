import baseService from "services/base.service";
import Config from "config/index";
import { IPhotography, IPhotographyPagination } from "interfaces/photography.interface";

const baseUrl = Config.env.BaseUrl;

const photographyBaseUrl = `${baseUrl}/api/Photography`;

const getList = async (payload: IPhotographyPagination) => 
  baseService.post(`${photographyBaseUrl}/list`, payload);

const save = async (payload: IPhotography) =>
  baseService.post(`${photographyBaseUrl}/save`, payload);

const getById = async ( payload: { id: number }) =>
  baseService.get(`${photographyBaseUrl}/index/${payload.id}`);

const deleteById = async (payload: { id: number }) =>
  baseService.delete(`${photographyBaseUrl}/delete/${payload.id}`);

const getDropDownList = async () =>
  baseService.get(`${photographyBaseUrl}/drop-down-list`);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getList,
  save,
  getById,
  deleteById,
  getDropDownList
};
