import baseService from "services/base.service";
import Config from "config/index";
import { IUser, IUserPagination } from "interfaces/user.interface";

const baseUrl = Config.env.BaseUrl;

const userBaseUrl = `${baseUrl}/api/User`;

const getList = async (payload: IUserPagination) => 
  baseService.post(`${userBaseUrl}/list`, payload);

const save = async (payload: IUser) =>
  baseService.post(`${userBaseUrl}/save`, payload);

const getById = async ( payload: { id: number }) =>
  baseService.get(`${userBaseUrl}/index/${payload.id}`);

const deleteById = async (payload: { id: number }) =>
  baseService.delete(`${userBaseUrl}/delete/${payload.id}`);

const getProfile = async () =>
  baseService.delete(`${userBaseUrl}/profile`);

const updateProfile = async (payload: IUser) =>
  baseService.put(`${userBaseUrl}/profile/update`, payload);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getList,
  save,
  getById,
  deleteById,
  getProfile,
  updateProfile
};
