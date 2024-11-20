export type Review = {
  id: number;
  user_id: number;
  restaurant_id: number;
  review_status: "pending" | "completed";
  review_body: string | null;
  score: number | null;
  created_at: string;
  updated_at: string;
};

export type ReviewsData = {
  reviews: Review[];
  pagination: any; // You can define the pagination type if needed
};
