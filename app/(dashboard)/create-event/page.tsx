"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

export default function CreateEvent() {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [organizer, setOrganizer] = useState<string>("");

  const router = useRouter();

  const mutation = useMutation(api.events.createEvent);

  function handleCreateEvent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!date) {
      toast.error("Please select a valid date");
      return;
    }

    mutation({
      name,
      date: format(date, "do MMMM yyyy"),
      description,
      location,
      organizer,
    });

    toast("New event has been created", {
      description: "You have successfully created a new event",
    });
    router.push("/all-events");
  }

  return (
    <div className="mx-auto mt-10 max-w-2xl space-y-4">
      <h2 className="mb-4 text-xl font-bold">Create Event</h2>

      <div>
        <form onSubmit={handleCreateEvent} className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <article>
              <Label
                htmlFor="event-name"
                className="mb-2 inline-block font-semibold"
              >
                Event name
              </Label>
              <Input
                type="text"
                id="event-name"
                placeholder="Event name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                minLength={3}
                maxLength={64}
              />
            </article>

            <article>
              <Label
                htmlFor="event-date"
                className="mb-2 inline-block font-semibold"
              >
                Event date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={date ? "secondary" : "default"}
                    className={cn(
                      "w-full justify-start bg-transparent hover:bg-transparent text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "do MMMM yyyy") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </article>
          </div>

          <div>
            <Label
              htmlFor="description"
              className="mb-2 inline-block font-semibold"
            >
              Event description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter event description"
              rows={8}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              minLength={3}
              maxLength={500}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <article>
              <Label
                htmlFor="event-location"
                className="mb-2 inline-block font-semibold"
              >
                Event location
              </Label>
              <Input
                type="text"
                id="event-location"
                placeholder="Event location"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                minLength={3}
                maxLength={64}
              />
            </article>
            <article>
              <Label
                htmlFor="event-organizer"
                className="mb-2 inline-block font-semibold"
              >
                Event organizer
              </Label>
              <Input
                type="text"
                id="event-organizer"
                placeholder="Event organizer"
                required
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                minLength={3}
                maxLength={64}
              />
            </article>
          </div>

          <Button type="submit" variant="default" size="lg">
            Create new event
          </Button>
        </form>
      </div>
    </div>
  );
};