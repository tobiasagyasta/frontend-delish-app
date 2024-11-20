import { Button } from "@/components/ui/button";
// Access environment variables (API in the future.)
import { apiUrl } from "@/lib/env";
// import { apiKey, apiUrl } from "@/lib/env";

export default function Home() {
  return (
    <>
      <Button className="mx-5 my-10 bg-pink-50 text-black">Hello world!</Button>
    </>
  );
}
