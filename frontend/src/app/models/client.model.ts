export interface Client {
  id?: string;
  name: string;
  displayName?: string;
  phone_number: string;
  email: string;
  address: string;
  sex?: string;
  firstBookingDate?: string;
  lastBookingDate?: string;
  numberOfBookings?: number;
  totalValueOfBooks?: number;
}