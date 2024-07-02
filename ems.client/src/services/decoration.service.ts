import baseService from "services/base.service";
import Config from "config/index";
import { IDecoration, IDecorationPagination } from "interfaces/decoration.interface";

const baseUrl = Config.env.BaseUrl;

const decorationBaseUrl = `${baseUrl}/api/Decoration`;

const getList = async (payload: IDecorationPagination) => 
  baseService.post(`${decorationBaseUrl}/list`, payload);

const save = async (payload: IDecoration) =>
  baseService.post(`${decorationBaseUrl}/save`, payload);

const getById = async ( payload: { id: number }) =>
  baseService.get(`${decorationBaseUrl}/index/${payload.id}`);

const deleteById = async (payload: { id: number }) =>
  baseService.delete(`${decorationBaseUrl}/delete/${payload.id}`);

const getDropDownList = async () =>
  baseService.get(`${decorationBaseUrl}/drop-down-list`);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getList,
  save,
  getById,
  deleteById,
  getDropDownList
};
