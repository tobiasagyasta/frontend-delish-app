"use client";

import HeaderNav from "@/components/created_components/HeaderNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverallReview } from "@/lib/types/OverallReview";
import { Reservation } from "@/lib/types/Reservation";
import { Media } from "@/lib/types/Media";
import { Restaurant } from "@/lib/types/Restaurant";
import PendingReviews from "@/components/created_components/PendingReviews";
import HistoryReviews from "@/components/created_components/HistoryReviews";
import { useEffect, useState } from "react";
import { apiUrl } from "@/lib/env";
import { Review, ReviewsData } from "@/lib/types/Reviews";
import { LoadingSpinner } from "@/components/ui/loading-spinner"; // Import the LoadingSpinner

const ReviewsPage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [reviews, setReviews] = useState<ReviewsData | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]); // New state for reservations
  const [loading, setLoading] = useState(true); // Add loading state

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

  const getProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${apiUrl}/api/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch profile");
      }

      const profileData = await response.json();
      const id = profileData.id;
      if (id) {
        // Fetch reviews
        const reviewsResponse = await fetch(
          `${apiUrl}/api/reviews?user_id=${id}&sort_order=desc`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!reviewsResponse.ok) {
          const errorData = await reviewsResponse.json();
          throw new Error(errorData.message || "Failed to fetch reviews");
        }

        const reviewsData = await reviewsResponse.json();

        // Fetch reservations
        const reservationsResponse = await fetch(`${apiUrl}/api/reservations`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!reservationsResponse.ok) {
          const errorData = await reservationsResponse.json();
          throw new Error(errorData.message || "Failed to fetch reservations");
        }

        const reservationsData = await reservationsResponse.json();

        return {
          profile: profileData,
          reviews: reviewsData,
          reservations: reservationsData,
        };
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true); // Set loading to true when starting to fetch data
        const result = await getProfile();
        if (result) {
          setProfile(result.profile);
          setReviews(result.reviews);
          setReservations(result.reservations);
          setUserId(result.profile.id);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false once fetching is complete
      }
    };

    fetchProfile();
  }, []);

  const completedReservations = reservations.filter(
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
    if (!reviews || !reviews.reviews) return {};

    return reviews.reviews
      .filter((review) => review.review_status === reviewStatus)
      .reduce((groups, review) => {
        const reviewDate = new Date(review.created_at).toLocaleDateString(
          "id-ID"
        );
        if (!groups[reviewDate]) {
          groups[reviewDate] = [];
        }
        groups[reviewDate].push(review);
        return groups;
      }, {} as { [key: string]: Review[] });
  };

  return (
    <>
      <HeaderNav name="Ulasan" link="profile" />
      <main className="min-h-full">
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="flex items-center gap-x-6 text-center w-full py-4 px-2 md:py-8 md:px-4 text-xl bg-white">
            <TabsTrigger value="pending">Menunggu</TabsTrigger>
            <TabsTrigger value="history">Riwayat</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            {loading ? ( // Show the spinner when loading
              <LoadingSpinner />
            ) : (
              <PendingReviews
                groupedReviews={groupedReviews("pending")}
                groupedReservations={groupedReservations}
                mediaDatasets={mediaDatasets}
                restaurantDatasets={restaurantDatasets}
              />
            )}
          </TabsContent>

          <TabsContent value="history">
            {loading ? ( // Show the spinner when loading
              <LoadingSpinner />
            ) : (
              <HistoryReviews
                groupedReviews={groupedReviews("completed")}
                groupedReservations={groupedReservations}
                mediaDatasets={mediaDatasets}
                restaurantDatasets={restaurantDatasets}
              />
            )}
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export default ReviewsPage;
