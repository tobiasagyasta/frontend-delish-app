import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { StarRatings } from "./StarRatings";

interface RatingCardProps {
  category: string;
  tags: string[];
  rating: number;
  onRatingChange: (rating: number) => void;
  onTagSelect: (tag: string) => void; // Add the onTagSelect function
  selectedTags: string[]; // Add the selectedTags array
  disableHover?: boolean;
}

const RatingCard = ({
  category,
  tags,
  rating,
  onRatingChange,
  onTagSelect,
  selectedTags,
  disableHover = true,
}: RatingCardProps) => {
  // Handle tag selection
  const handleTagClick = (tag: string) => {
    onTagSelect(tag); // Call the parent handler to toggle the selection
  };

  return (
    <Card className="my-6 flex flex-col items-center justify-center w-2/3 shadow-sm">
      <CardHeader className="text-center font-semibold text-lg text-[#667085]">
        {category}
      </CardHeader>
      <CardContent className="flex flex-row items-center justify-center gap-y-6">
        <StarRatings
          rating={rating} // Controlled by the parent
          totalStars={5}
          size={48}
          variant="default"
          disabled={false}
          disableHover={disableHover} // Use the passed disableHover prop
          onRatingChange={onRatingChange} // Pass the parent's handler
          starGap={1}
        />
      </CardContent>
      <CardFooter>
        <div className="inline-flex flex-shrink-0 min-w-0 w-fit flex-wrap gap-y-2 gap-x-3 justify-center items-center text-center text-sm">
          {tags.map((tag, index) => (
            <p
              key={index}
              className={`basis-[75%] p-2 rounded-md text-nowrap cursor-pointer ${
                selectedTags.includes(tag)
                  ? "bg-[#FEF0C7] text-[#667085]"
                  : "bg-[#E5E7EB] text-[#667085]"
              }`}
              onClick={() => handleTagClick(tag)} // Trigger tag selection on click
            >
              {tag}
            </p>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default RatingCard;
