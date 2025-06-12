"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Lottie from "lottie-react";
import animationData from "./Animation - 1748181041132.json";
import { useRouter } from "next/navigation";
import animationView from "./scene.json";
import animationClick from "./Animation - 1749320637246.json";
import animationLoad from "./Animation - 1748797716617.json";
import { useIsMobile } from "@/utils/useIsMobile";

export default function Home() {
  const [data, setData] = useState<{
    publicUserId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    products: any[];
  } | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dropdownRef = useRef<HTMLDivElement | null | any>(null);
  const [sort, setSort] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showBy, setShowBy] = useState("");
  const [isNavigating, setIsNavigating] = useState<string | null>(null);
  const [isView, setIsView] = useState<boolean | null>(false);
  const [upvoteLoadingId, setUpvoteLoadingId] = useState<string | null>(null);
  const [addFeedback, setAddFeedback] = useState(false);
  const isMobile = useIsMobile(600);
  const [openNav, setOpenNav] = useState(false);
  const route = useRouter();

  useEffect(() => {
    const fetchGuest = async () => {
      const guestToken = localStorage.getItem("guestToken");

      const res = await fetch("/api/guest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userAgent: navigator.userAgent,
          guestToken: guestToken || null,
        }),
      });

      const result = await res.json();

      if (result?.publicUserId) {
        localStorage.setItem("publicUserId", result.publicUserId);
      }
      if (result?.guestToken) {
        localStorage.setItem("guestToken", result.guestToken);
        localStorage.setItem("publicUserId", result.publicUserId);
      }

      setData(result);
    };

    fetchGuest();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSort(false);
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
  let suggestions =
    data?.products?.filter((p) => p.status === "suggestion") || [];

  if (categoryFilter !== "All") {
    suggestions = suggestions?.filter(
      (p) => p.category?.toLowerCase() === categoryFilter.toLowerCase()
    );
  }

  const totalSuggestions = suggestions ? suggestions.length : 0;
  const sortedSuggestions = [...suggestions];
  const planned = data.products?.filter((p) => p.status === "planned");
  const progres = data.products?.filter((p) => p.status === "in-progress");
  const live = data.products?.filter((p) => p.status === "live");

  switch (showBy) {
    case "MostU":
      sortedSuggestions.sort((a, b) => b.upvotes - a.upvotes);
      break;
    case "LeastU":
      sortedSuggestions.sort((a, b) => a.upvotes - b.upvotes);
      break;
    case "MostC":
      sortedSuggestions.sort(
        (a, b) => (b.comments?.length || 0) - (a.comments?.length || 0)
      );
      break;
    case "LeastC":
      sortedSuggestions.sort(
        (a, b) => (a.comments?.length || 0) - (b.comments?.length || 0)
      );
      break;
    default:
      sortedSuggestions.sort((a, b) => b.upvotes - a.upvotes);
      break;
  }

  return (
    <main className="flex items-start justify-center gap-10 min-h-screen p-10 ">
      {isMobile ? (
        <div className="nav">
          <div className="logo">
            <h2>Frontend Mentor</h2>
            <p>Feedback Board</p>
          </div>

          <button onClick={() => setOpenNav((prev) => !prev)}>
            {openNav ? (
              <Image
                src={"/assets/shared/mobile/icon-close.svg"}
                width={20}
                height={20}
                alt="navbar"
              ></Image>
            ) : (
              <Image
                src={"/assets/shared/mobile/icon-hamburger.svg"}
                width={20}
                height={20}
                alt="navbar"
              ></Image>
            )}
          </button>
        </div>
      ) : (
        <div className="left">
          <div className="logo">
            <h2>Frontend Mentor</h2>
            <p>Feedback Board</p>
          </div>
          <div className="filter">
            <ul>
              {["All", "UI", "UX", "Enhancement", "Bug", "Feature"].map(
                (category) => (
                  <li
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                    className={categoryFilter === category ? "active" : ""}
                  >
                    {category}
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="roadMap">
            <div>
              <h3>Roadmap</h3>
              <button
                onClick={() => {
                  setIsView(true);
                  route.push(`/view`);
                }}
              >
                View
              </button>
            </div>
            {isView ? (
              <div className="flex justify-center items-center min-h-[100px] viewLoad ">
                <Lottie
                  animationData={animationView}
                  loop={true}
                  autoplay={true}
                  initialSegment={[0, 100]}
                />
              </div>
            ) : (
              <ul>
                <li>
                  <div>
                    <span className="color"></span> <p>Planned</p>
                  </div>
                  <span>{planned?.length ?? 0}</span>
                </li>
                <li>
                  <div>
                    <span className="color"></span> <p>In-Progress</p>
                  </div>
                  <span>{progres?.length ?? 0}</span>
                </li>
                <li>
                  <div>
                    <span className="color"></span> <p>Live</p>
                  </div>
                  <span>{live?.length ?? 0}</span>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}

      <div className="right">
        <div className="header">
          {" "}
          {isMobile && (
            <>
              {" "}
              <div
                className={`overLay  inset-0 bg-black bg-opacity-10 z-40 ${
                  openNav ? "show" : ""
                }`}
                onClick={() => setOpenNav(false)}
              />
              <div
                className={`slide fixed top-0 right-0 h-full bg-white z-50 ${
                  openNav ? "show" : ""
                }`}
              >
                <div className="filter">
                  <ul>
                    {["All", "UI", "UX", "Enhancement", "Bug", "Feature"].map(
                      (category) => (
                        <li
                          key={category}
                          onClick={() => setCategoryFilter(category)}
                          className={
                            categoryFilter === category ? "active" : ""
                          }
                        >
                          {category}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="roadMap">
                  <div>
                    <h3>Roadmap</h3>
                    <button
                      onClick={() => {
                        setIsView(true);
                        route.push(`/view`);
                      }}
                    >
                      View
                    </button>
                  </div>
                  {isView ? (
                    <div className="flex justify-center items-center min-h-[100px] viewLoad ">
                      <Lottie
                        animationData={animationView}
                        loop={true}
                        autoplay={true}
                        initialSegment={[0, 100]}
                      />
                    </div>
                  ) : (
                    <ul className="viewList">
                      <li>
                        <div>
                          <span className="color"></span> <p>Planned</p>
                        </div>
                        <span>{planned?.length ?? 0}</span>
                      </li>
                      <li>
                        <div>
                          <span className="color"></span> <p>In-Progress</p>
                        </div>
                        <span>{progres?.length ?? 0}</span>
                      </li>
                      <li>
                        <div>
                          <span className="color"></span> <p>Live</p>
                        </div>
                        <span>{live?.length ?? 0}</span>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </>
          )}
          <div>
            <Image
              src={"/assets/suggestions/icon-suggestions.svg"}
              width={24}
              height={24}
              alt="suggestions"
            />
            <h3>
              <span>{totalSuggestions}</span> Suggestions
            </h3>
            <div>
              <button onClick={() => setSort((prev) => !prev)}>
                <span>Sort by : </span>
                {showBy === "MostU"
                  ? "Most Upvotes"
                  : showBy === "LeastU"
                  ? "Least Upvotes"
                  : showBy === "MostC"
                  ? "Most Comments"
                  : showBy === "LeastC"
                  ? "Least Comments"
                  : "Most Upvotes"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="6"
                  viewBox="0 0 12 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`${sort ? "rotate" : ""} arrow-icon`}
                >
                  <polyline points="1,1 6,5 11,1" />
                </svg>
              </button>
              {sort && (
                <ul ref={dropdownRef}>
                  <li
                    onClick={() => setShowBy("MostU")}
                    className={`${
                      showBy === "MostU" ? "active" : ""
                    } flex justify-between items-center`}
                  >
                    Most Upvotes
                    {showBy === "MostU" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </li>
                  <li
                    onClick={() => setShowBy("LeastU")}
                    className={`${
                      showBy === "LeastU" ? "active" : ""
                    } flex justify-between items-center`}
                  >
                    Least Upvotes
                    {showBy === "LeastU" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </li>
                  <li
                    onClick={() => setShowBy("MostC")}
                    className={`${
                      showBy === "MostC" ? "active" : ""
                    } flex justify-between items-center`}
                  >
                    Most Comments
                    {showBy === "MostC" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </li>
                  <li
                    onClick={() => setShowBy("LeastC")}
                    className={`${
                      showBy === "LeastC" ? "active" : ""
                    } flex justify-between items-center`}
                  >
                    Least Comments
                    {showBy === "LeastC" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </li>
                </ul>
              )}
            </div>
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
                className="upvoteLoad"
              />
            ) : (
              " + Add Feedback"
            )}
          </button>
        </div>
        <div className="content">
          {data ? (
            sortedSuggestions.map((p) => (
              <ul key={p._id}>
                <div>
                  {!isMobile && (
                    <li
                      className="upvotes"
                      onClick={async () => {
                        setUpvoteLoadingId(p._id);
                        const res = await fetch("/api/upvote", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            productId: p._id,
                            publicUserId: data.publicUserId,
                          }),
                        });

                        const result = await res.json();

                        setData((prev) => {
                          if (!prev) return prev;
                          return {
                            ...prev,
                            products: prev.products.map((prod) =>
                              prod._id === p._id
                                ? { ...prod, upvotes: result.upvotes }
                                : prod
                            ),
                          };
                        });
                        setUpvoteLoadingId(null);
                      }}
                    >
                      {upvoteLoadingId === p._id ? (
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
                          {p.upvotes}
                        </>
                      )}
                    </li>
                  )}

                  <div
                    onClick={() => {
                      setIsNavigating(p._id);
                      setTimeout(() => {
                        route.push(`/${p._id}`);
                      }, 100);
                    }}
                  >
                    {isNavigating === p._id ? (
                      <div className="flex justify-center items-center min-h-[100px] load bg-black">
                        <Lottie animationData={animationClick} loop={true} />
                      </div>
                    ) : (
                      <ul>
                        <li>{p.title}</li>
                        <li>{p.description}</li>
                        <li>{p.category}</li>
                      </ul>
                    )}
                  </div>
                </div>
                {!isMobile && (
                  <li className="commentNumber">
                    <Image
                      src={`/assets/shared/icon-comments.svg`}
                      width={18}
                      height={16}
                      alt="comment"
                    />
                    {p.comments?.length ?? 0}
                  </li>
                )}{" "}
                {isMobile && (
                  <div className="mobileUpvote">
                    <li
                      className="upvotes"
                      onClick={async () => {
                        setUpvoteLoadingId(p._id);
                        const res = await fetch("/api/upvote", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            productId: p._id,
                            publicUserId: data.publicUserId,
                          }),
                        });

                        const result = await res.json();

                        setData((prev) => {
                          if (!prev) return prev;
                          return {
                            ...prev,
                            products: prev.products.map((prod) =>
                              prod._id === p._id
                                ? { ...prod, upvotes: result.upvotes }
                                : prod
                            ),
                          };
                        });
                        setUpvoteLoadingId(null);
                      }}
                    >
                      {upvoteLoadingId === p._id ? (
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
                          {p.upvotes}
                        </>
                      )}
                    </li>
                    <li className="commentNumber">
                      <Image
                        src={`/assets/shared/icon-comments.svg`}
                        width={18}
                        height={16}
                        alt="comment"
                      />
                      {p.comments?.length ?? 0}
                    </li>
                  </div>
                )}
              </ul>
            ))
          ) : (
            <div className="empty">
              <Image
                src={"/assets/suggestions/illustration-empty.svg"}
                width={130}
                height={130}
                alt="empty"
              ></Image>
              <h1>There is no feedback yet.</h1>
              <p>
                Got a suggestion? Found a bug that needs to be squashed? We love
                hearing about new ideas to improve our app.
              </p>
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
                    className="upvoteLoad"
                  />
                ) : (
                  " + Add Feedback"
                )}
              </button>{" "}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
