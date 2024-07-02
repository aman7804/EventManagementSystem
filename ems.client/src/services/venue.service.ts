import baseService from "services/base.service";
import Config from "config/index";
import { IVenue, IVenuePagination } from "interfaces/venue.interface";

const baseUrl = Config.env.BaseUrl;

const venueBaseUrl = `${baseUrl}/api/Venue`;

const getList = async (payload: IVenuePagination) => 
  baseService.post(`${venueBaseUrl}/list`, payload);

const save = async (payload: IVenue) =>
  baseService.post(`${venueBaseUrl}/save`, payload);

const getById = async ( payload: { id: number }) =>
  baseService.get(`${venueBaseUrl}/index/${payload.id}`);

const deleteById = async (payload: { id: number }) =>
  baseService.delete(`${venueBaseUrl}/delete/${payload.id}`);

const getDropDownList = async () =>
  baseService.get(`${venueBaseUrl}/drop-down-list`);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getList,
  save,
  getById,
  deleteById,
  getDropDownList
};
