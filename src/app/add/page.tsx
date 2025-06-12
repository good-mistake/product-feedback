"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Lottie from "lottie-react";
import animationData from "../Animation - 1748181041132.json";
import animationCancel from "../Animation - 1748797716617.json";
import useAuthRedirect from "@/utils/useAuthRedirect";

const Page = () => {
  const route = useRouter();
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("Select a Category");
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  useAuthRedirect();
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Lottie animationData={animationData} loop={true} />
      </div>
    );
  }
  return (
    <div className="flex items-start justify-center gap-10 min-h-screen p-10 add">
      <button onClick={() => route.push("/")}>
        <Image
          src={"/assets/shared/icon-arrow-left.svg"}
          width={8}
          height={4}
          alt="arrow left"
        />
        Go Back
      </button>
      <div>
        <Image
          src={"/assets/shared/icon-new-feedback.svg"}
          width={56}
          height={56}
          alt="arrow left"
        />
        <h1>Create New Feedback</h1>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            setError("");
            const publicUserId = localStorage.getItem("publicUserId");
            const title = (
              e.currentTarget.elements.namedItem("title") as HTMLInputElement
            ).value;
            const description = (
              e.currentTarget.elements.namedItem(
                "detail"
              ) as HTMLTextAreaElement
            ).value;
            if (
              !title ||
              !description ||
              !publicUserId ||
              categoryFilter === "Select a category"
            ) {
              setError("Please fill in all fields and choose a category.");
              setIsSubmitting(false);
              return;
            }
            const res = await fetch("/api/add-feedback", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                title,
                description,
                publicUserId,
                category: categoryFilter,
              }),
            });
            if (res.ok) {
              setTimeout(() => {
                route.push("/");
              }, 300);
            } else {
              setError("Failed to add feedback.");
            }
            setIsSubmitting(false);
          }}
        >
          <div>
            <label htmlFor="title">Feedback Title</label>
            <p>Add a short, descriptive headline</p>
            <input type="text" name="title" id="title" />
          </div>{" "}
          <div className="relative">
            <label htmlFor="category">Category</label>
            <p>Choose a category for your feedback</p>
            <div
              className="dropdown-trigger"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              {categoryFilter}
              <Image
                src={"/assets/shared/icon-arrow-down.svg"}
                width={8}
                height={4}
                alt="arrow down"
              />
            </div>

            {showDropdown && (
              <ul className="dropdown-menu">
                {["UI", "UX", "Enhancement", "Bug", "Feature"].map((cat) => (
                  <li
                    key={cat}
                    onClick={() => {
                      setCategoryFilter(cat);
                      setShowDropdown(false);
                    }}
                    className={categoryFilter === cat ? "active" : ""}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <label htmlFor="Detail">Feedback Detail</label>
            <p>
              Include any specific comments on what should be improved, added,
              etc.
            </p>
            <textarea name="detail" id="detail"></textarea>
          </div>
          <div className="btnContainer">
            <button
              type="button"
              onClick={() => {
                setIsCancelling(true);
                setTimeout(() => route.push("/"), 300);
              }}
            >
              {isCancelling ? (
                <Lottie
                  animationData={animationCancel}
                  loop={true}
                  autoplay={true}
                  className="upvoteLoad"
                />
              ) : (
                "Cancel"
              )}
            </button>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Lottie
                  animationData={animationCancel}
                  loop={true}
                  autoplay={true}
                  className="upvoteLoad"
                />
              ) : (
                "Add Feedback"
              )}
            </button>
          </div>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Page;
