import baseService from "services/base.service";
import Config from "config/index";
import { IDecoration, IDecorationPagination } from "interfaces/decoration.interface";

const baseUrl = Config.env.BaseUrl;

const venueBaseUrl = `${baseUrl}/api/Decoration`;

const getList = async (payload: IDecorationPagination) => 
  baseService.post(`${venueBaseUrl}/list`, payload);

const save = async (payload: IDecoration) =>
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
