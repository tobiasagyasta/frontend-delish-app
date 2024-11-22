export interface ReviewDetails {
  created_at: string;
  id: number;
  media_urls: string[]; // Array of media URLs
  restaurant_id: number;
  review_body: string;
  review_status: string;
  score: number;
  updated_at: string;
  user_id: number;
}
