  export interface GenericState<Type> {
    pending: boolean;
    list: Type[] | null;
    current: Type | null;
    message: string | null;
  }
  
  export interface IPagination<Type>
  {
    pageNo: number;
    pageSize: number;
    pageCount?: number;
    recordCount?: number;
    sortBy?: 0 | 1;
    sortByColumns?: string;
    data?: Type[] | null;
  }
  
  export interface ListRequestPayload<Type> {
    data: Type;
    callback: any;
    message?:string;
  }
  
  export interface ListSuccessResponse<Type> {
    data: Type | null;
    message?:string;
  }
  
  export interface IKeyValuePair{
    id: number
    name: string
  }

  export interface ListFailureResponse {
    message: string;
    data?: any;
  }
  
  export interface SaveRequestPayload<Type> {
    data: Type;
    callback: any;
    message?:string;
  }
  
  export interface SaveSuccessResponse {
    isValid: boolean;
    message: string;
    data?: any;
  }
  
  export interface SaveFailureResponse {
    message: string;
    data?: any;
  }
  
  
  export interface GetRequestPayload {
    data: { id: number};
    callback: any;
    message?:string;
  }
  
  export interface GetSuccessResponse<Type> {
    data: Type | null;
    message?:string;
  }
  
  export interface GetFailureResponse {
    message: string;
    data?: any;
  }
  
  export interface DeleteRequestPayload {
    data: {
      id: number;
    };
    callback: any;
    message?:string;
  }
  
  export interface DeleteSuccessResponse {
    isValid: boolean;
    message: string;
    data?: any;
  }
  
  export interface DeleteFailureResponse {
    message: string;
    data?: any;
  }
  
  export interface IApiSuccessResponse<Type> {
    code: number;
    message: string;
    data: Type|null;
    isSuccessStatusCode: boolean;
    isValid: boolean;
  }