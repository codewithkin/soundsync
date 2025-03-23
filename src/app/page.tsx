"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { Headphones, Loader2 } from "lucide-react";

function Main() {
  const [mood, setMood] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const { mutate: getSongsMutation, isPending: loading } = useMutation({
    mutationKey: ["getSongs"],
    mutationFn: async () => {
      const res = await axios.post("/api/songs", { mood });

      return res.data;
    },
    onError: () => {
      // Show an error toast
      toast.error("An error occured while fetching song recommendtations");
    },
    onSuccess: (data) => {
      // Log the data for debugging
      console.log(data);

      // Update the song recommendations
      setRecommendations(data);
    },
  });

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <Card className="border border-purple-300">
        <CardHeader className="text-center flex flex-col justify-between items-center">
          <Headphones size={50} className="text-purple-600" />
          <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Hi there !
          </CardTitle>
          <CardDescription className="text-md">
            What's today's mood ?
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <form
            className="flex flex-col gap-2 items-center items-center"
            onSubmit={(e) => {
              e.preventDefault();

              // Start the mutation
              getSongsMutation();
            }}
          >
            <Input
              required
              type="text"
              placeholder="Cloudy..."
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            />

            <Button
              className="w-full bg-purple-700 disabled:bg-purple-800 hover:cursor-pointer hover:bg-purple-500 font-medium"
              disabled={loading}
              type="submit"
            >
              {loading && <Loader2 size={20} />}
              {loading ? "Getting recommendations..." : "Recommend some music"}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </section>
  );
}

export default Main;
