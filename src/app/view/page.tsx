"use client";
import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import animationLoad from "../Animation - 1748797716617.json";
import animationClick from "../Animation - 1749320637246.json";
import animationData from "../Animation - 1748181041132.json";
import Lottie from "lottie-react";
import { useIsMobile } from "@/utils/useIsMobile";
import useAuthRedirect from "@/utils/useAuthRedirect";
const Page = () => {
  const route = useRouter();
  const [data, setData] = useState<{
    publicUserId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    products: any[];
  } | null>(null);
  const [upvoteLoadingId, setUpvoteLoadingId] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState("");
  const [addFeedback, setAddFeedback] = useState(false);
  const [activeStatus, setActiveStatus] = useState<
    "planned" | "in-progress" | "live"
  >("planned");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [prevStatus, setPrevStatus] = useState<string | any>(null);
  const isMobile = useIsMobile(600);
  useAuthRedirect();
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
  const normalizedStatuses = data?.products?.map((product) => ({
    ...product,
    status: product.status.toLowerCase(),
  }));
  const groupedByStatus =
    normalizedStatuses?.reduce((acc, product) => {
      const status = product.status.toLowerCase();
      if (!acc[status]) acc[status] = [];
      acc[status].push(product);
      return acc; // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as Record<string, any[]>) ?? {};

  const statuses = ["planned", "in-progress", "live"] as const;
  const statusLabels: Record<
    string,
    { label: string; text: string; color: string }
  > = {
    planned: {
      label: "Planned",
      text: "Ideas prioritized for research",
      color: "#F49F85",
    },
    "in-progress": {
      label: "In-Progress",
      text: "Currently being developed",
      color: "#AD1FEA",
    },
    live: {
      label: "Live",
      text: "Released features",
      color: "#62BCFA",
    },
  };
  const handleStatusChange = (newStatus: typeof activeStatus) => {
    if (newStatus === activeStatus) return;
    setPrevStatus(activeStatus);
    setActiveStatus(newStatus);
  };
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Lottie animationData={animationData} loop={true} autoplay={true} />
      </div>
    );
  }
  return (
    <div className="flex items-start justify-center gap-10 min-h-screen p-10 view">
      <section className="header">
        <div>
          <button onClick={() => route.push("/")}>
            <Image
              src={"/assets/shared/icon-arrow-left.svg"}
              width={8}
              height={4}
              alt="arrow left"
            />
            Go Back
          </button>
          <h3>Roadmap </h3>
        </div>
        <button
          onClick={() => {
            setAddFeedback((prev) => !prev);
            setTimeout(() => {
              route.push("/add");
            }, 200);
          }}
        >
          {addFeedback ? (
            <Lottie
              animationData={animationLoad}
              loop={true}
              autoplay={true}
              className="upvoteLoad addFeedBack"
            />
          ) : (
            " + Add Feedback"
          )}
        </button>{" "}
      </section>
      {!isMobile ? (
        <section className="roadmapContent">
          {groupedByStatus &&
            statuses.map((status) => (
              <ul key={status}>
                <h3 key={status}>
                  {statusLabels[status].label}
                  <span>
                    {`(${
                      groupedByStatus[status]
                        ? groupedByStatus[status].length
                        : "0"
                    })`}
                  </span>
                </h3>
                <p>{statusLabels[status].text}</p>
                <div>
                  {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    groupedByStatus[status]?.map((product: any) => (
                      <div
                        key={product._id}
                        style={{ borderTopColor: statusLabels[status].color }}
                      >
                        <div>
                          {isNavigating === product._id ? (
                            <div className="flex justify-center items-center w-full min-h-[100px]  ">
                              <Lottie
                                animationData={animationClick}
                                loop={true}
                              />
                            </div>
                          ) : (
                            <div className="details">
                              <p className="label">
                                <span
                                  style={{
                                    backgroundColor: statusLabels[status].color,
                                  }}
                                ></span>
                                {statusLabels[status].label}
                              </p>
                              <div
                                onClick={() => {
                                  setIsNavigating(product._id);
                                  setTimeout(() => {
                                    route.push(`/${product._id}`);
                                  }, 100);
                                }}
                              >
                                <h4>{product.title}</h4>
                                <p className="description">
                                  {product.description}
                                </p>
                                <p className="category">{product.category}</p>
                              </div>
                            </div>
                          )}{" "}
                          <div className="commentAndUpvote">
                            <div
                              className="upvotes"
                              onClick={async () => {
                                setUpvoteLoadingId(product._id);
                                const res = await fetch("/api/upvote", {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    productId: product._id,
                                    publicUserId: data?.publicUserId,
                                  }),
                                });

                                const result = await res.json();

                                setData((prev) => {
                                  if (!prev) return prev;
                                  return {
                                    ...prev,
                                    products: prev.products.map((prod) =>
                                      prod._id === product._id
                                        ? { ...prod, upvotes: result.upvotes }
                                        : prod
                                    ),
                                  };
                                });
                                setUpvoteLoadingId(null);
                              }}
                            >
                              {upvoteLoadingId === product._id ? (
                                <Lottie
                                  animationData={animationLoad}
                                  loop={true}
                                  autoplay={true}
                                  className="upvoteLoad"
                                />
                              ) : (
                                <>
                                  <Image
                                    src={`/assets/shared/icon-arrow-up.svg`}
                                    width={8}
                                    height={4}
                                    alt="comment"
                                  />
                                  {product.upvotes}
                                </>
                              )}
                            </div>
                            <p className="commentNumber">
                              <Image
                                src={`/assets/shared/icon-comments.svg`}
                                width={18}
                                height={16}
                                alt="comment"
                              />
                              {product.comments?.length ?? 0}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </ul>
            ))}
        </section>
      ) : (
        <section className="roadmapContent">
          <div className="statusTabs flex gap-4 mb-6">
            {statuses.map((status) => (
              <button
                key={status}
                className={`px-4 py-2 rounded-lg ${
                  activeStatus === status ? "activeBtn" : "notActiveBtn"
                }`}
                onClick={() => handleStatusChange(status)}
                style={{ borderBottomColor: statusLabels[status].color }}
              >
                {statusLabels[status].label}
                <span>
                  {`(${
                    groupedByStatus[status]
                      ? groupedByStatus[status].length
                      : "0"
                  })`}
                </span>
              </button>
            ))}
          </div>

          <div
            key={activeStatus}
            className={`mobileViewContent ${
              prevStatus
                ? statuses.indexOf(activeStatus) > statuses.indexOf(prevStatus)
                  ? "slide-in-left"
                  : "slide-in-right"
                : ""
            }`}
          >
            <h3>
              {statusLabels[activeStatus].label}
              <span>({groupedByStatus[activeStatus]?.length ?? 0})</span>
            </h3>
            <p>{statusLabels[activeStatus].text}</p>

            <div>
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                groupedByStatus[activeStatus]?.map((product: any) => (
                  <div
                    key={product._id}
                    style={{ borderTopColor: statusLabels[activeStatus].color }}
                  >
                    <div>
                      {isNavigating === product._id ? (
                        <div className="flex justify-center items-center w-full min-h-[100px]">
                          <Lottie animationData={animationClick} loop />
                        </div>
                      ) : (
                        <div className="details">
                          <p className="label">
                            <span
                              style={{
                                backgroundColor:
                                  statusLabels[activeStatus].color,
                              }}
                            ></span>
                            {statusLabels[activeStatus].label}
                          </p>
                          <div
                            onClick={() => {
                              setIsNavigating(product._id);
                              setTimeout(() => {
                                route.push(`/${product._id}`);
                              }, 100);
                            }}
                          >
                            <h4>{product.title}</h4>
                            <p className="description">{product.description}</p>
                            <p className="category">{product.category}</p>
                          </div>
                        </div>
                      )}
                      <div className="commentAndUpvote">
                        <div
                          className="upvotes"
                          onClick={async () => {
                            setUpvoteLoadingId(product._id);
                            const res = await fetch("/api/upvote", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                productId: product._id,
                                publicUserId: data?.publicUserId,
                              }),
                            });

                            const result = await res.json();

                            setData((prev) => {
                              if (!prev) return prev;
                              return {
                                ...prev,
                                products: prev.products.map((prod) =>
                                  prod._id === product._id
                                    ? { ...prod, upvotes: result.upvotes }
                                    : prod
                                ),
                              };
                            });
                            setUpvoteLoadingId(null);
                          }}
                        >
                          {upvoteLoadingId === product._id ? (
                            <Lottie
                              animationData={animationLoad}
                              loop
                              autoplay
                              className="upvoteLoad"
                            />
                          ) : (
                            <>
                              <Image
                                src={`/assets/shared/icon-arrow-up.svg`}
                                width={8}
                                height={4}
                                alt="upvote"
                              />
                              {product.upvotes}
                            </>
                          )}
                        </div>
                        <p className="commentNumber">
                          <Image
                            src={`/assets/shared/icon-comments.svg`}
                            width={18}
                            height={16}
                            alt="comment"
                          />
                          {product.comments?.length ?? 0}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Page;
