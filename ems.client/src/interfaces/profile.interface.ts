import * as GENERIC from './generic.interface'

  export interface IProfile{
    id: number;
    firstName: string;
    lastName: string;
    emailId: string;
    mobileNo: string;
    address: string;
}

  export interface ProfileState{
    user: IProfile | null
  }

/* Dispatch Container Model */
export interface IProfileContainerDispatch {
  getRequest: (payload: GENERIC.GetRequestPayload) => {};
  updateRequest: (payload: GENERIC.SaveRequestPayload<IProfile>) => {};
}

/* State Container Model */
export interface IProfileContainerState {
  profile: IProfile
}


