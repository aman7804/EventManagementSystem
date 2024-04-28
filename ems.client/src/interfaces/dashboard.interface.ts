import { IBookingReport, IBookingReportRequestPayload, IBookingRevenue, IBookingSummary } from "./booking.interface";

/* Dispatch Container Model */
export interface IDashboardContainerDispatch {
  getBookingReport: (payload: IBookingReportRequestPayload) => {};
}

/* State Container Model */
export interface IDashboardContainerState {
  bookingReport: IBookingReport;
  // bookingSummary: IBookingSummary;
  // bookingRevenue: IBookingRevenue;
}
