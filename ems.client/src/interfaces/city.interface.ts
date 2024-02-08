/* Model */
export interface ICity {
  id: number;
  name: string;
}

export interface GetDropDownListPayload {
  data: { id?: number | null};
  callback: any;
  message?:string;
}

/* Dispatch Container Model */
export interface ICityContainerDispatch {
  listRequest: (payload: GetDropDownListPayload) => {};
}

/* State Container Model */
export interface ICityContainerState {
  list: any;
}

