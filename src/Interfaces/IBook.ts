import { IBooking } from './IBooking';

export interface IBook {
   id: string,
   title: string,
   imageUrl: string,
   categoryId: string,
   createdAt?: string,
   updatedAt?: string
   bookings: IBooking[] 
}