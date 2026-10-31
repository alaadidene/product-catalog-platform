"use client";

import { useParams } from "next/navigation";
import { Suspense } from "react";

function ContactContent() {
  const params = useParams<{ id: string }>();

  return (
    <>
      <div>Contact Page</div>
      <h2>Contact ID: {params.id}</h2>
    </>
  );
}

export default function ContactDetail() {
  return (
    <Suspense fallback={<p>Loading contact...</p>}>
      <ContactContent />
    </Suspense>
  );
}