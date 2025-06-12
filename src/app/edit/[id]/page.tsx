"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Lottie from "lottie-react";
import animationData from "../../Animation - 1748181041132.json";
import animationCancel from "../../Animation - 1748797716617.json";
import useAuthRedirect from "@/utils/useAuthRedirect";

const Page = () => {
  const params = useParams();
  const [data, setData] = useState<{
    publicUserId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    products: any[];
  } | null>(null);
  const [error, setError] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const route = useRouter();
  const categoryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  useAuthRedirect(Array.isArray(params?.id) ? params.id[0] : params?.id);

  useEffect(() => {
    const fetchGuest = async () => {
      const res = await fetch("/api/guest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userAgent: navigator.userAgent }),
      });

      const result = await res.json();
      setData(result);
    };

    fetchGuest();
  }, []);

  useEffect(() => {
    if (data) {
      const found = data.products.find((e) => e._id === params?.id);
      if (found) {
        setTitle(found.title);
        setDescription(found.description);
      }
    }
  }, [data, params?.id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }

      if (
        statusRef.current &&
        !statusRef.current.contains(event.target as Node)
      ) {
        setShowStatusDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Lottie animationData={animationData} loop={true} />
      </div>
    );
  }
  const feedback = data.products.find((e) => e._id === params?.id);
  if (!feedback) return <div>Feedback not found</div>;

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
          src={"/assets/shared/icon-edit-feedback.svg"}
          width={56}
          height={56}
          alt="arrow left"
        />
        <h1>Editing ‘{feedback.title}’</h1>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            setError("");
            const res = await fetch("/api/edit-feedback", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                title,
                description,
                productId: feedback._id,
                category: categoryFilter || feedback.category,
                status: statusFilter || feedback.status,
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
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="relative" ref={categoryRef}>
            <label htmlFor="category">Category</label>
            <p>Choose a category for your feedback</p>
            <div
              className="dropdown-trigger"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              {categoryFilter.length ? categoryFilter : feedback.category}
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
          <div className="relative" ref={statusRef}>
            <label htmlFor="category">Update Status</label>
            <p>Change feature state</p>
            <div
              className="dropdown-trigger"
              onClick={() => setShowStatusDropdown((prev) => !prev)}
            >
              {statusFilter.length ? statusFilter : feedback.status}
              <Image
                src={"/assets/shared/icon-arrow-down.svg"}
                width={8}
                height={4}
                alt="arrow down"
              />
            </div>

            {showStatusDropdown && (
              <ul className="dropdown-menu">
                {["Suggestion", "Planned", "In-Progress", "Live"].map((cat) => (
                  <li
                    key={cat}
                    onClick={() => {
                      setStatusFilter(cat);
                      setShowStatusDropdown(false);
                    }}
                    className={statusFilter === cat ? "active" : ""}
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
            <textarea
              name="Detail"
              id="Detail"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="btnContainer">
            <button
              className="delete"
              onClick={async () => {
                const confirmed = window.confirm(
                  "Are you sure you want to delete this feedback?"
                );
                if (!confirmed) return;
                setIsCancelling(true);

                const res = await fetch("/api/delete-feedback", {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    productId: feedback._id,
                    publicId: localStorage.getItem("publicUserId"),
                  }),
                });

                if (res.ok) {
                  route.push("/");
                } else {
                  setError("Failed to delete feedback.");
                }
                setIsCancelling(false);
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
                "Delete"
              )}
            </button>
            <div>
              <button onClick={() => route.push("/")}>Cancel</button>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Lottie
                    animationData={animationCancel}
                    loop={true}
                    autoplay={true}
                    className="upvoteLoad"
                  />
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Page;
