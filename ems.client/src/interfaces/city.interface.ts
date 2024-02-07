
import * as GENERIC from "interfaces/generic.interface"

/* Model */
export interface ICity {
  id: number;
  name: string;
  // stateId?: number|null;
}

export interface GetDropDownListPayload {
  data: { id?: number | null};
  callback: any;
  message?:string;
}

// export interface GetDropDownListSuccessResponse {
//   message?:string;
//   data?: GENERIC;
// }

// export interface GetSuccessResponse<GENERIC.IKeyValuePair> {
//   data: GENERIC.IKeyValuePair | null;
//   message?:string;
// }

/* Dispatch Container Model */
export interface ICityContainerDispatch {
  listRequest: (payload: GetDropDownListPayload) => {};
}

/* State Container Model */
export interface ICityContainerState {
  list: any;
}

