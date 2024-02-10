"use client";
import "./globals.css";
import { useRouter } from "next/navigation";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  return (
    <html>
      <body className={"error"}>
        <h2>Something went wrong!{error.message}</h2>
        <button onClick={() => router.push("/")}>Back to the home page</button>
      </body>
    </html>
  );
}
