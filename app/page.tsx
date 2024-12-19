import React from "react";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";

export default function Home() {
  return (
    <section className="mx-auto max-w-2xl space-y-8 px-4 py-20">
      <div>
        <article className="space-y-4 text-center">
          <h1 className="text-3xl font-bold lg:text-4xl">
            See upcoming events from Eventix
          </h1>
          <CardDescription className="leading-7 lg:text-lg">
            Use this web app to view upcoming events from Eventix and plan
            yourself according to the releases and launches of YouTube videos,
            books, and video courses.
          </CardDescription>
        </article>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-4">
        <Button
          asChild
          variant="default"
          className="border border-neutral-800 transition hover:opacity-75"
        >
          <LoginLink>Sign in</LoginLink>
        </Button>
        <Button asChild variant="secondary">
          <RegisterLink>Sign up</RegisterLink>
        </Button>
      </div>
    </section>
  );
};