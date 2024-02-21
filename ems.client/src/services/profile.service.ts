import baseService from "services/base.service";
import Config from "config/index";
import { IProfile } from "interfaces/profile.interface";

const baseUrl = Config.env.BaseUrl;

const profileBaseUrl = `${baseUrl}/api/User`;

const getProfile = async () =>
  baseService.get(`${profileBaseUrl}/profile`);

const updateProfile = async (payload: IProfile) =>
  baseService.put(`${profileBaseUrl}/update-profile`, payload);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  updateProfile,
  getProfile,
};
