"use client";

import React from "react";

interface TitleProps {
  type: string;
}

export default function ScoutTitle({ type }: TitleProps) {
  const label =
    type === "LOBITO"
      ? "Lobito"
      : type === "JUNIOR"
      ? "Junior"
      : type === "SENIOR"
      ? "Senior"
      : type === "TRUCKER"
      ? "Caminheiro"
      : "";

  return (
    <h2 className="text-xl font-semibold mb-4">
      {label}
    </h2>
  );
}
