"use client";
import { useParams } from "next/navigation";
import HeaderNav from "@/components/created_components/HeaderNav";
import { Restaurant } from "@/lib/types/Restaurant";
import { Reservation } from "@/lib/types/Reservation";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import { AutosizeTextarea } from "@/components/ui/autosized-textarea";
import { Button } from "@/components/ui/button";
import { CircleArrowRight, Upload, CircleArrowLeft, Image } from "lucide-react";
import RatingCard from "@/components/created_components/RatingsCard";
import { StarRatings } from "@/components/created_components/StarRatings";
import { apiUrl } from "@/lib/env";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const WriteReviewPage = () => {
  const { restaurantId, reviewId } = useParams();
  const { toast } = useToast();
  const router = useRouter();

  const restaurantDatasets: {
    restaurant: Restaurant[];
  } = require("../../../../../lib/datasets/restaurant.json");

  const reservationDatasets: {
    reservation: Reservation[];
  } = require("../../../../../lib/datasets/reservation.json");

  const categories = [
    {
      name: "Makanan",
      tags: {
        5: ["Sangat Direkomendasikan", "Sangat Enak", "Istimewa"],
        4: ["Enak", "Cukup Baik", "Layak"],
        3: ["Biasa", "Kurang Memuaskan", "Biasa Saja"],
        2: ["Buruk", "Tidak Memuaskan", "Tidak Direkomendasikan"],
        1: ["Mengecewakan", "Sangat Buruk", "Tidak Layak"],
      },
    },
    {
      name: "Suasana",
      tags: {
        5: ["Sangat Nyaman", "Romantis", "Indah"],
        4: ["Nyaman", "Ramah", "Terang"],
        3: ["Cukup Nyaman", "Bising", "Kurang Terang"],
        2: ["Tidak Nyaman", "Panas", "Berantakan"],
        1: ["Sangat Tidak Nyaman", "Sangat Panas", "Sangat Berantakan"],
      },
    },
    {
      name: "Pelayanan",
      tags: {
        5: ["Ramah", "Cepat", "Profesional"],
        4: ["Baik", "Cepat", "Menyenangkan"],
        3: ["Cukup Baik", "Lambat", "Kurang Ramah"],
        2: ["Biasa", "Tidak Cepat", "Tidak Ramah"],
        1: ["Lambat", "Kurang Ramah", "Biasa"],
      },
    },
  ];

  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [ratings, setRatings] = useState<number[]>(categories.map(() => 0));
  const [selectedTags, setSelectedTags] = useState<{ [key: string]: string[] }>(
    {}
  ); // State for selected tags
  const [overallRating, setOverallRating] = useState(0); // State for overall rating
  const [additionalComments, setAdditionalComments] = useState(""); //State for overall review

  const [mediaFiles, setMediaFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      if (file) {
        const isImage = file.type.startsWith("image/");
        const isVideo = file.type.startsWith("video/");
        const maxSize = isImage ? 5 : isVideo ? 75 : 0;

        if (file.size > maxSize * 1024 * 1024) {
          alert(`File too large! Max size is ${maxSize}MB.`);
          return;
        }

        const updatedFiles = [...mediaFiles];
        updatedFiles[index] = file;
        setMediaFiles(updatedFiles);
      }
    };

  const handleNextCategory = () => {
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex((prev) => prev + 1);
    }
  };

  const handlePrevCategory = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex((prev) => prev - 1);
    }
  };

  const handleCategoryRatingChange = (rating: number) => {
    setRatings((prev) => {
      const updatedRatings = [...prev];
      updatedRatings[currentCategoryIndex] = rating;
      return updatedRatings;
    });

    // Reset selected tags for the category when the rating changes
    setSelectedTags((prev) => {
      const updatedTags = { ...prev };
      updatedTags[categories[currentCategoryIndex].name] = []; // Reset the selected tags
      return updatedTags;
    });
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) => {
      const updatedTags = { ...prev };
      const currentCategoryName = categories[currentCategoryIndex].name;
      const currentSelectedTags = updatedTags[currentCategoryName] || [];
      if (currentSelectedTags.includes(tag)) {
        // Remove the tag if it is already selected
        updatedTags[currentCategoryName] = currentSelectedTags.filter(
          (t) => t !== tag
        );
      } else {
        // Add the tag to the selected list
        updatedTags[currentCategoryName] = [...currentSelectedTags, tag];
      }
      return updatedTags;
    });
  };

  const handleOverallRatingChange = (rating: number) => {
    setOverallRating(rating); // Handle overall rating change
  };

  const restaurantIdStr = Array.isArray(restaurantId)
    ? restaurantId[0]
    : restaurantId;

  const completedReservations = reservationDatasets.reservation.filter(
    (res) => res.reservation_status === "completed"
  );
  const reservation = completedReservations.find(
    (res) =>
      res.restaurant_id === parseInt(restaurantIdStr || "") &&
      res.reservation_status === "completed"
  );

  const restaurant = restaurantIdStr
    ? restaurantDatasets.restaurant.find(
        (restaurant) => restaurant.id === parseInt(restaurantIdStr)
      )
    : null;

  const currentCategory = categories[currentCategoryIndex];
  const handleClearAll = () => {
    setMediaFiles([null, null, null, null, null]); // Reset to initial empty state
  };
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle review submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    if (!token) {
      alert("User is not authenticated. Please log in.");
      return;
    }

    try {
      const formData = new FormData();

      // Append review data
      const reviewData = {
        review: {
          score: overallRating,
          review_body: additionalComments,
        },
        food: {
          food_score: ratings[0],
          food_comment: selectedTags["Makanan"]?.join(", ") || "",
        },
        service: {
          service_score: ratings[1],
          service_comment: selectedTags["Pelayanan"]?.join(", ") || "",
        },
        ambience: {
          ambience_score: ratings[2],
          ambience_comment: selectedTags["Suasana"]?.join(", ") || "",
        },
      };

      formData.append("data", JSON.stringify(reviewData));

      // Append media files
      mediaFiles.forEach((file, index) => {
        if (file) {
          formData.append(`media`, file, file.name);
        }
      });

      // API call
      const response = await fetch(`${apiUrl}/api/reviews/${restaurantId}`, {
        method: "PUT",
        body: formData,
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast({
          title: "Selamat!",
          description: `Anda berhasil submit review anda! Terima kasih atas ulasannya`,
          className: "bg-[#FEF0C7]",
          duration: 2000,
        });

        // Redirect to home page after a delay
        setTimeout(() => {
          router.push("/reviews");
        }, 2000);
      } else {
        const errorData = await response.json();
        alert(`Failed to submit review: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("An error occurred while submitting the review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <HeaderNav name="Tulis Ulasan" link="reviews"></HeaderNav>
      <main className="w-full my-5 min-h-full">
        <div className="text-base flex flex-col md:flex-row justify-between items-center px-7">
          <span className="font-medium">Restoran : {restaurant?.name}</span>
          <span>
            {reservation?.created_at
              ? formatDate(reservation?.created_at, undefined, true)
              : null}
          </span>
        </div>
        {/* <button
          onClick={() =>
            toast({
              title: "Selamat!",
              description: `Anda berhasil submit review anda! Terima kasih atas ulasannya`,
              className: " w-max h-max bg-[#FEF0C7]",
              duration: 2000,
            })
          }
        >
          Show Toast
        </button> */}
        {/* Overall Rating */}
        <div className="flex flex-col justify-center items-center my-8 p-4 gap-y-2">
          <StarRatings
            rating={overallRating} // Use the overallRating state here
            totalStars={5}
            size={48}
            variant="default"
            disabled={false}
            disableHover={true}
            onRatingChange={handleOverallRatingChange} // Update overall rating on change
            starGap={2}
          />
          <p>Berikan penilaian secara keseluruhan</p>
        </div>

        {/* Category-specific Rating */}
        <div className="bg-[#F2F4F7] px-7 pt-4 flex flex-col">
          <p className="text-start self-start py-2 font-bold">
            Bagaimana pengalaman anda?
          </p>

          <div className="flex flex-row items-center gap-8 justify-evenly w-full">
            <CircleArrowLeft
              size={48}
              className={`${
                currentCategoryIndex === 0
                  ? "opacity-30 cursor-not-allowed"
                  : "cursor-pointer"
              } text-[#b7bbc3]`}
              strokeWidth={0.75}
              onClick={() => {
                if (currentCategoryIndex > 0) {
                  handlePrevCategory();
                }
              }}
            />
            <RatingCard
              key={currentCategoryIndex}
              category={currentCategory.name}
              tags={
                currentCategory.tags[
                  ratings[currentCategoryIndex] as 1 | 2 | 3 | 4 | 5
                ] || []
              }
              rating={ratings[currentCategoryIndex]}
              onRatingChange={handleCategoryRatingChange} // Handle category-specific rating
              onTagSelect={handleTagSelect} // Add tag selection handler
              selectedTags={selectedTags[currentCategory.name] || []} // Pass selected tags
            />

            <CircleArrowRight
              size={48}
              className={`${
                currentCategoryIndex === categories.length - 1
                  ? "opacity-30 cursor-not-allowed"
                  : "cursor-pointer"
              } text-[#b7bbc3]`}
              strokeWidth={0.75}
              onClick={() => {
                if (currentCategoryIndex < categories.length - 1) {
                  handleNextCategory();
                }
              }}
            />
          </div>
        </div>

        {/* Additional Comments */}
        <div className="p-6">
          <AutosizeTextarea
            className="p-3"
            placeholder="Beritahu kami lebih lanjut"
            minHeight={100}
            maxHeight={300}
            onChange={(e) => setAdditionalComments(e.target.value)} // Update state on input change
          ></AutosizeTextarea>
        </div>

        {/* Upload Section */}

        {!isUploading ? (
          <>
            <div className="flex flex-row text-center gap-x-3 mx-6 p-2 border border-black/20 w-1/4 justify-center rounded-md shadow-sm text-sm cursor-pointer">
              <Upload />
              <p onClick={() => setIsUploading(true)}>Unggah</p>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="ml-6 flex gap-4 mt-4">
              {mediaFiles.map((file, index) => (
                <div
                  key={index}
                  className="relative w-16 h-16 border-2 border-dashed rounded-md flex items-center justify-center"
                >
                  {file ? (
                    <div className="w-full h-full">
                      {file.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Uploaded ${index + 1}`}
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <video
                          src={URL.createObjectURL(file)}
                          className="w-full h-full rounded-md"
                          controls
                        />
                      )}
                    </div>
                  ) : (
                    <label
                      htmlFor={`file-upload-${index}`}
                      className="w-full h-full flex flex-col items-center justify-center text-gray-500 cursor-pointer"
                    >
                      <div className="flex flex-col items-center">
                        <img
                          src="/assets/add-image.png"
                          alt="Add"
                          className="w-6 h-6"
                        />
                      </div>
                      <input
                        id={`file-upload-${index}`}
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={handleFileChange(index)}
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
            <button
              className="bg-[#FEF0C7] text-black px-4 py-2 rounded-md text-sm hover:bg-[#ead9a5] ml-6 mt-2"
              onClick={handleClearAll}
              disabled={mediaFiles.every((file) => file === null)} // Disable if no files are uploaded
            >
              Hapus Semua
            </button>
          </>
        )}

        <div className="text-sm mx-6 mb-8 mt-2 text-[#667085]">
          Unggah Foto &lt; 5MB atau Video &lt; 75MB
        </div>

        {/* Submit Button */}
        <div className="border border-x-0 border-b-0 py-4">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex justify-center items-center mx-auto w-11/12 rounded-xl p-5 text-base bg-black/90"
          >
            {isSubmitting ? "Submitting..." : "Kirim"}
          </Button>
        </div>
      </main>
    </>
  );
};

export default WriteReviewPage;
