"use client";

import React from "react";
import { useMutation, useQuery } from "convex/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, Loader2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import Link from "next/link";

type EventData = {
  _id: Id<"events">;
  _creationTime: number;
  name: string;
  description: string;
  location: string;
  organizer: string;
  date: string;
};

export default function AllEvents() {
  const events = useQuery(api.events.getAll);
  const mutation = useMutation(api.events.deleteEvent);

  const handleDeleteEvent = (id: Id<"events">) => {
    mutation({ id });
    toast("Event deleted", {
      description: "You have successfully deleted the event",
    });
  };

  if (!events) {
    return (
      <div className="mx-auto mt-10 max-w-4xl">
        <Loader2 className="mx-auto block size-9 animate-spin text-neutral-400" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 py-10">
      <div className="mx-auto grid max-w-xl gap-4">
        {events?.map((event: EventData) => (
          <Card key={event._id} className="group relative max-w-xl">
            <CardHeader>
              <div className="flex flex-col flex-wrap items-start justify-between space-y-1">
                <CardDescription>
                  Created on:{" "}
                  {format(new Date(event._creationTime), "do MMMM yyyy")}
                </CardDescription>
                <CardTitle className="break-words leading-7">
                  {event.name}
                </CardTitle>
                <CardDescription>
                  Organized by {event.organizer}
                </CardDescription>
                <CardDescription>Location: {event.location}</CardDescription>
                <CardDescription>Event date: {event.date}</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex-1">
                <h4 className="text-sm font-bold">About the event</h4>
                <CardDescription className="text-sm leading-6 text-neutral-600">
                  {event.description}
                </CardDescription>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4 sm:mt-0">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="default"
                      size="sm"
                      className="ml-auto block opacity-0 transition group-hover:opacity-100"
                    >
                      <Edit />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Event</DialogTitle>
                      <DialogDescription>
                        You can modify the event details here.
                      </DialogDescription>
                    </DialogHeader>
                    <ul className="flex items-center justify-end gap-x-4">
                      <li>
                        <DialogClose asChild>
                          <Button variant="secondary" size="sm" className="bg-red-500 text-white">
                            Cancel
                          </Button>
                        </DialogClose>
                      </li>
                      <li>
                        <Link href={`/edit-event/${event._id as Id<"events">}`}>
                          <Button
                            variant="default"
                            size="sm"
                            className="flex items-center justify-center gap-x-2 transition"
                          >
                            <Edit /> Yes, edit
                          </Button>
                        </Link>
                      </li>
                    </ul>
                  </DialogContent>
                </Dialog>

                {/* Delete Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="ml-auto block opacity-0 transition group-hover:opacity-100"
                    >
                      <Trash2 />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        You are about to delete an event entry. This action
                        cannot be undone, and will permanently delete the entry
                        from the servers.
                      </DialogDescription>
                    </DialogHeader>
                    <ul className="flex items-center justify-end gap-x-4">
                      <li>
                        <DialogClose asChild>
                          <Button variant="secondary" size="sm">
                            Cancel
                          </Button>
                        </DialogClose>
                      </li>
                      <li>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex items-center justify-center gap-x-2 transition"
                          onClick={() => handleDeleteEvent(event._id)}
                        >
                          <Trash2 /> Delete
                        </Button>
                      </li>
                    </ul>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};