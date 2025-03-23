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

function Main() {
  const [mood, setMood] = useState("");

  const { mutate: getSongsMutation } = useMutation({
    mutationKey: ["getSongs"],
    mutationFn: async () => {
      const res = await axios.post("/api/songs", { mood });

      return res.data;
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
          <form action="">
            <Input type="text" required />

            <Button>Recommend some music</Button>
          </form>
        </CardFooter>
      </Card>
    </section>
  );
}

export default Main;
