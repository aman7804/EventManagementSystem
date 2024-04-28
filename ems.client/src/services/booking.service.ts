import baseService from "services/base.service";
import Config from "config/index";
import { IBookingPagination } from "interfaces/booking.interface";
import { EnumBookingReportType } from "utils/enums";

const baseUrl = Config.env.BaseUrl;

const bookingBaseUrl = `${baseUrl}/api/Booking`;

const getList = async (payload: IBookingPagination) => 
  baseService.post(`${bookingBaseUrl}/list`, payload);

const confirmBooking = async (payload: { id: number }) =>
  baseService.put(`${bookingBaseUrl}/confirm`, payload)

const rejectBooking = async (payload: { id: number }) =>
  baseService.put(`${bookingBaseUrl}/reject`, payload)

const getById = async ( payload: { id: number }) =>
  baseService.get(`${bookingBaseUrl}/index/${payload.id}`);

const deleteById = async (payload: { id: number }) =>
  baseService.delete(`${bookingBaseUrl}/delete/${payload.id}`);

const getSummary = async () => 
    baseService.post(`${bookingBaseUrl}/getSummary`);

const getRevenue = async () => 
    baseService.post(`${bookingBaseUrl}/getRevenue`);

const getReport = async (payload: EnumBookingReportType) => 
    baseService.get(`${bookingBaseUrl}/getReport?enumBookingReportType=${payload}`);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getList,
  confirmBooking,
  rejectBooking,
  getById,
  deleteById,
  getSummary,
  getRevenue,
  getReport
};