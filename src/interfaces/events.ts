import { IMember } from './member';

export interface RecentEvent {
  id: string;
  name: string;
  type:
    | 'Culto de Oración'
    | 'Escuela Dominical'
    | 'Culto Dominical'
    | 'Reunión de Jóvenes'
    | 'Estudio Bíblico';
  startDate: Date;
  endDate: Date;
  members: number;
  visitors: number;
  baptized: number;
  children: number;
  offerings: number; // Ofrendas en moneda local
  totalAttendance: number;
  location: string;
  minister: string; // Pastor o ministro a cargo
  notes?: string;
}

export interface IEvent {
  events: EventElement[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Attendance {
  id: string;
  attended: boolean;
  createdAt: Date;
  updatedAt: Date;
  Member: IMember;
  event: EventElement;
}

export interface EventElement {
  id: string;
  name: string;
  description: string;
  address: Address;
  location: string;
  repeat: boolean;
  startCronExpression: null | string;
  endCronExpression: null | string;
  isActive: boolean;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
  attendances?: Attendance[];
}

export enum BaptizedChurch {
  FirstBaptistChurch = 'First Baptist Church',
  GraceChapel = 'Grace Chapel',
  StMaryChurch = 'St. Mary Church',
}

export enum City {
  Chicago = 'Chicago',
  Houston = 'Houston',
  Miami = 'Miami',
}

export enum CivilStatus {
  Divorced = 'divorced',
  Married = 'married',
  Single = 'single',
}

export enum Country {
  Australia = 'Australia',
  Uk = 'UK',
  Usa = 'USA',
}

export enum FirstName {
  Alice = 'Alice',
  Bob = 'Bob',
  Charlie = 'Charlie',
  Diana = 'Diana',
  John = 'John',
}

export enum Gender {
  Female = 'female',
  Male = 'male',
}

export enum HowTheyArrived {
  FriendInvitation = 'Friend invitation',
  OnlineEvent = 'Online event',
  WalkIn = 'Walk-in',
}

export enum LastName {
  Doe = 'Doe',
  Johnson = 'Johnson',
  Smith = 'Smith',
  Taylor = 'Taylor',
  Wilson = 'Wilson',
}

export enum Location {
  Downtown = 'Downtown',
  Suburb = 'Suburb',
  Uptown = 'Uptown',
}

export interface MemberStatus {
  id: string;
  name: Name;
  description: Description;
  createdAt: Date;
  updatedAt: Date;
}

export enum Description {
  LoremIpsumIsSimplyDummyTextOfThePrintingAndTypesetting = 'Lorem Ipsum is simply dummy text of the printing and typesetting',
}

export enum Name {
  Baptized = 'baptized',
  Converted = 'converted',
  Visitor = 'visitor',
}

export enum Zone {
  East = 'East',
  North = 'North',
  South = 'South',
  West = 'West',
}

export enum Address {
  AVLibertador1234Caracas = 'av. libertador 1234, caracas',
  CampamentoMonteAltoVenezuela = 'campamento monte alto, venezuela',
  HotelMarriottCaracas = 'hotel marriott, caracas',
  PlayaLosCaracasVenezuela = 'playa los caracas, venezuela',
}
