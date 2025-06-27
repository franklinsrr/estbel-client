import { IMember } from './member';

export interface IEventRequestResponse {
  events: IEventElement[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IAttendance {
  id: string;
  attended: boolean;
  createdAt: Date;
  updatedAt: Date;
  Member: IMember;
  event: IEventElement;
}

export interface IEventElement {
  id: string;
  name: string;
  description: string;
  address: string;
  location: string;
  repeat: boolean;
  startCronExpression: null | string;
  endCronExpression: null | string;
  isActive: boolean;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
  attendances?: IAttendance[];
}

export interface IMemberStatus {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
