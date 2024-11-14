import HeaderNav from "@/components/created_components/HeaderNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverallReview } from "@/lib/types/OverallReview";
import { Reservation } from "@/lib/types/Reservation";
import { Media } from "@/lib/types/Media";
import { Restaurant } from "@/lib/types/Restaurant";
import PendingReviews from "@/components/created_components/PendingReviews";
import HistoryReviews from "@/components/created_components/HistoryReviews";

const ReviewsPage = () => {
  const overallReviewDatasets: {
    overall_review: OverallReview[];
  } = require("../../lib/datasets/overall_review.json");
  const reservationDatasets: {
    reservation: Reservation[];
  } = require("../../lib/datasets/reservation.json");
  const mediaDatasets: {
    media: Media[];
  } = require("../../lib/datasets/media.json");
  const restaurantDatasets: {
    restaurant: Restaurant[];
  } = require("../../lib/datasets/restaurant.json");

  const completedReservations = reservationDatasets.reservation.filter(
    (res) => res.reservation_status === "completed"
  );

  const groupedReservations = completedReservations.reduce(
    (acc, reservation) => {
      if (!acc[reservation.restaurant_id]) {
        acc[reservation.restaurant_id] = [];
      }
      acc[reservation.restaurant_id].push(reservation);
      return acc;
    },
    {} as { [key: number]: Reservation[] }
  );

  const groupedReviews = (reviewStatus: "pending" | "completed") => {
    return overallReviewDatasets.overall_review
      .filter((review) => review.review_status === reviewStatus)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .reduce((groups, review) => {
        const reviewDate = new Date(review.created_at).toLocaleDateString(
          "id-ID"
        );
        if (!groups[reviewDate]) {
          groups[reviewDate] = [];
        }
        groups[reviewDate].push(review);
        return groups;
      }, {} as { [key: string]: OverallReview[] });
  };

  return (
    <>
      <HeaderNav name="Ulasan" link="/" />
      <main className="min-h-full">
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="flex items-center gap-x-6 text-center w-full py-4 px-2 md:py-8 md:px-4 text-xl bg-white">
            <TabsTrigger value="pending">Menunggu</TabsTrigger>
            <TabsTrigger value="history">Riwayat</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <PendingReviews
              groupedReviews={groupedReviews("pending")}
              groupedReservations={groupedReservations}
              mediaDatasets={mediaDatasets}
              restaurantDatasets={restaurantDatasets}
            />
          </TabsContent>

          <TabsContent value="history">
            <HistoryReviews
              groupedReviews={groupedReviews("completed")}
              groupedReservations={groupedReservations}
              mediaDatasets={mediaDatasets}
              restaurantDatasets={restaurantDatasets}
            />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export default ReviewsPage;
