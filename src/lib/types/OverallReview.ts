export interface OverallReview {
  id: number;
  restaurant_id: number;
  user_id: number;
  score: number;
  review_status: "pending" | "completed" | "cancelled"; // Enum-like values
  review_body: string;
  created_at: string; // ISO timestamp string
}
