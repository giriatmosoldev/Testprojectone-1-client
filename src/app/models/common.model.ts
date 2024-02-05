export interface IExpiresTime {
  expires: Date
}

export interface ITimeRange {
  from: string;
  to: string;
}


export type ObjectKeyValuePair = {
  [key: string]: string | number | boolean
}
