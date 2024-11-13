export interface Media {
  id: number;
  overall_id: number;
  location: string | null; // URL to the image (can be null if there's no media)
  created_at: string; // Timestamp in ISO string format (e.g., "2024-11-12T10:00:00Z")
}
