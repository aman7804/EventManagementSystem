export enum HttpStatusCodes {
    Ok = 200,
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    InternalServerError = 500,
  }

export type Order = "asc" | "desc";

export enum EnumBookingStatus {
  pending = 0,
  cancelled = 1,
  rejected = 2,
  paid = 3,
  confirmed = 4
}

export enum EnumBookingReportType {
  daily = 0,
  weekly = 1,
  monthly = 2,
  yearly = 3
}