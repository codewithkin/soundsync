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
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Hi there !</CardTitle>
          <CardDescription>What's today's mood ?</CardDescription>
        </CardHeader>

        <CardFooter>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              // Start the mutation
              getSongsMutation();
            }}
          >
            <Input type="text" required />

            <Button disabled={loading} type="submit">
              {loading ? "Getting recommendations..." : "Recommend some music"}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </section>
  );
}

export default Main;
