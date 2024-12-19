import { CardDescription, CardTitle } from "@/components/ui/card";
import React from "react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl py-10 text-center">
      <article className="space-y-2">
        <CardTitle>404 | Page not found</CardTitle>
        <CardDescription>The requested page could not be found</CardDescription>
      </article>
    </div>
  );
}