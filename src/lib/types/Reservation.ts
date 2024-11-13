export interface Reservation {
  id: number;
  restaurant_id: number;
  user_id: number;
  number_of_people: number;
  reservation_time: string; // Time as string (you can parse it as Date if necessary)
  reservation_status: "pending" | "completed" | "cancelled"; // Enum-like values
  created_at: string; // ISO timestamp string
}
