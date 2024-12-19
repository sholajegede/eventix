"use client";

import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const EditEvent = () => {
  const params = useParams();
  const eventId = params.eventId as Id<"events">;
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [organizer, setOrganizer] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  
  const event = useQuery(api.events.getEventById, {
    id: eventId,
  });

  const mutation = useMutation(api.events.updateEvent);
  const router = useRouter();

  useEffect(() => {
    if (event) {
      setName(event.name || "");
      setDescription(event.description || "");
      setLocation(event.location || "");
      setOrganizer(event.organizer || "");
      setDate(event.date && !isNaN(new Date(event.date).getTime()) ? new Date(event.date) : undefined);
    }
  }, [event]);

  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      console.log("Please select a valid date.");
      return;
    }

    setLoading(true);

    try {
      await mutation({
        id: eventId,
        name,
        date: event?.date || format(date, "do MMMM yyyy"),
        description,
        location,
        organizer,
      });

      toast.success("Event updated successfully");
      router.push("/all-events");
    } catch (err) {
      console.log("Failed to update event. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto mt-10 max-w-4xl">
        <Loader2 className="mx-auto block size-9 animate-spin text-neutral-400" />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-2xl space-y-4">
      <h2 className="mb-4 text-xl font-bold">Edit/Update Event</h2>

      <div>
        <form onSubmit={handleUpdateEvent} className="grid gap-4">
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
                value={name !== undefined ? name : event?.name || ""}
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
                    {date ? (
                      format(date, "do MMMM yyyy")
                    ) : (
                      <span className="text-primary">{event?.date}</span>
                    )}
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
              value={description !== undefined ? description : event?.description || ""}
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
                value={location !== undefined ? location : event?.location || ""}
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
                value={organizer !== undefined ? organizer : event?.organizer || ""}
                onChange={(e) => setOrganizer(e.target.value)}
                minLength={3}
                maxLength={64}
              />
            </article>
          </div>

          <Button type="submit" variant="default" size="lg">
            Update event
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;