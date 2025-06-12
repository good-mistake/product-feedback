"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import animationUpvote from "../Animation - 1748797716617.json";
import { useIsMobile } from "@/utils/useIsMobile";
import Lottie from "lottie-react";
import animationLoad from "../Animation - 1748797716617.json";
import animationData from "../Animation - 1748181041132.json";
import useAuthRedirect from "@/utils/useAuthRedirect";

type GuestUser = {
  name: string;
  username: string;
  image: string;
  id: string | null;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Client = ({ feedback }: { feedback: any }) => {
  const route = useRouter();
  const [upvotes, setUpvotes] = useState(feedback.upvotes);
  const [isLoading, setIsLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [feedbackData, setFeedbackData] = useState(feedback);
  const [replyContent, setReplyContent] = useState<Record<string, string>>({});
  const [currentUser, setCurrentUser] = useState<GuestUser | null>(null);
  const [addFeedComment, setAddFeedComment] = useState(false);
  const [addFeedReply, setAddFeedReply] = useState<string | null>(null);
  const [addFeedback, setAddFeedback] = useState(false);
  const [addFeedReplyToReply, setAddFeedReplyToReply] = useState<string | null>(
    null
  );
  const [activeReply, setActiveReply] = useState<{
    commentId: string;
    replyingToId: string;
    replyingToUsername: string;
  } | null>(null);
  const [replyInputsOpen, setReplyInputsOpen] = React.useState<{
    [key: string]: boolean;
  }>({});
  const isMobile = useIsMobile(600);

  const [repliesToReplyContent, setRepliesToReplyContent] = useState<{
    [replyId: string]: string;
  }>({});

  const totalCommentsAndReplies =
    (feedbackData.comments?.length || 0) +
    (feedbackData.comments?.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (acc: number, comment: any) => acc + (comment?.replies?.length || 0),
      0
    ) || 0);
  useAuthRedirect();
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch(`/api/feedback?id=${feedback._id}`);
        if (!res.ok) throw new Error("Failed to fetch feedback");
        const data = await res.json();
        setFeedbackData(data);
      } catch (err) {
        console.error("Error fetching feedback:", err);
      }
    };

    fetchFeedback();
  }, [feedback._id]);

  useEffect(() => {
    const publicUserId = localStorage.getItem("publicUserId");
    const randomUsername = `guest${Math.floor(Math.random() * 10000)}`;
    const randomColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
    setCurrentUser({
      name: randomUsername,
      username: randomUsername,
      image: `${randomColor}`,
      id: publicUserId,
    });
  }, []);
  if (!currentUser)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Lottie
          animationData={animationData}
          loop
          autoplay
          className="w-24 h-24"
        />
      </div>
    );
  return (
    <div className="flex items-start justify-center gap-10 min-h-screen p-10 detail">
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
        <button
          onClick={() => {
            setAddFeedback((prev) => !prev);
            setTimeout(() => {
              route.push(`/edit/${feedbackData._id}`);
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
            " Edit Feedback"
          )}
        </button>{" "}
      </div>
      <div className="content">
        <ul>
          <div>
            {!isMobile && (
              <li
                className="upvotes"
                onClick={async () => {
                  setIsLoading(true);

                  const res = await fetch("/api/upvote", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      productId: feedback._id,
                      publicUserId: feedback.publicUserId,
                    }),
                  });

                  const result = await res.json();

                  setUpvotes(result.upvotes);
                  setIsLoading(false);
                }}
              >
                <Image
                  src={`/assets/shared/icon-arrow-up.svg`}
                  width={8}
                  height={4}
                  alt="comment"
                />

                {isLoading ? animationUpvote : upvotes}
              </li>
            )}

            <ul>
              <li>{feedbackData.title}</li>
              <li>{feedbackData.description}</li>
              <li>{feedbackData.category}</li>
            </ul>
          </div>
          {isMobile && (
            <div className="mobileUpvote">
              <li
                className="upvotes"
                onClick={async () => {
                  setIsLoading(true);

                  const res = await fetch("/api/upvote", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      productId: feedback._id,
                      publicUserId: feedback.publicUserId,
                    }),
                  });

                  const result = await res.json();

                  setUpvotes(result.upvotes);
                  setIsLoading(false);
                }}
              >
                <Image
                  src={`/assets/shared/icon-arrow-up.svg`}
                  width={8}
                  height={4}
                  alt="comment"
                />

                {isLoading ? animationUpvote : upvotes}
              </li>
              <li className="commentNumber">
                <Image
                  src={`/assets/shared/icon-comments.svg`}
                  width={18}
                  height={16}
                  alt="comment"
                />
                {feedbackData.comments?.length ?? 0}
              </li>
            </div>
          )}
          {!isMobile && (
            <li className="commentNumber">
              <Image
                src={`/assets/shared/icon-comments.svg`}
                width={18}
                height={16}
                alt="comment"
              />
              {feedbackData.comments?.length ?? 0}
            </li>
          )}
        </ul>
      </div>
      <div className="comments">
        <h2>{totalCommentsAndReplies} Comments</h2>
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          feedbackData?.comments?.map((comment: any) => {
            return (
              <div
                key={comment._id}
                className={`commentDetail ${
                  comment.replies.length ? "replyThread" : ""
                }`}
              >
                <ul>
                  <ul>
                    <ul>
                      {comment.user.image.startsWith("#") ? (
                        <li
                          style={{
                            backgroundColor:
                              currentUser.image ||
                              comment.user.image ||
                              "purple",
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                          }}
                        />
                      ) : (
                        <li>
                          <Image
                            src={`/${comment.user.image.replace(/^\.\//, "")}`}
                            width={40}
                            height={40}
                            alt="profile"
                          />
                        </li>
                      )}
                      <div>
                        <li>{comment.user.name}</li>
                        <li>@{comment.user.username}</li>
                      </div>
                    </ul>
                    <button
                      onClick={() =>
                        setActiveReply({
                          commentId: comment._id,
                          replyingToId: comment._id,
                          replyingToUsername: comment.user.username,
                        })
                      }
                    >
                      Reply
                    </button>
                  </ul>
                  <li>{comment.content}</li>
                </ul>
                {comment.replies &&
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  comment.replies.map((reply: any) => {
                    return (
                      <React.Fragment key={reply._id}>
                        <ul key={reply._id} className="replies">
                          <ul>
                            <ul>
                              {reply.user.image.startsWith("#") ? (
                                <li
                                  style={{
                                    backgroundColor:
                                      currentUser.image || reply.user.image,
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                  }}
                                />
                              ) : (
                                <li>
                                  <Image
                                    src={`/${reply.user.image.replace(
                                      /^\.\//,
                                      ""
                                    )}`}
                                    width={40}
                                    height={40}
                                    alt="profile"
                                  />
                                </li>
                              )}
                              <div>
                                <li>{reply.user.name}</li>
                                <li>@{reply.user.username}</li>
                              </div>
                            </ul>
                            <button
                              onClick={() =>
                                setReplyInputsOpen((prev) => ({
                                  ...prev,
                                  [reply._id]: !prev[reply._id],
                                }))
                              }
                            >
                              Reply
                            </button>
                          </ul>
                          <li>
                            <span>@{reply.replyingTo}</span>
                            {reply.content}
                          </li>{" "}
                          {replyInputsOpen[reply._id] && (
                            <div className="addreply">
                              <textarea
                                value={repliesToReplyContent[reply._id] || ""}
                                onChange={(e) =>
                                  setRepliesToReplyContent((prev) => ({
                                    ...prev,
                                    [reply._id]: e.target.value,
                                  }))
                                }
                              />
                              <button
                                onClick={async () => {
                                  setAddFeedReplyToReply(reply._id);

                                  const res = await fetch("/api/replyToReply", {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      productId: feedbackData._id,
                                      commentId: comment._id,
                                      replyId: reply._id,
                                      content: repliesToReplyContent[reply._id],
                                      replyingTo: reply.user.username,
                                      user: currentUser,
                                    }),
                                  });

                                  if (!res.ok) {
                                    console.error("Failed to post reply");
                                    setAddFeedReplyToReply(null);
                                    return;
                                  }

                                  const updatedFeedback = await res.json();
                                  setFeedbackData(updatedFeedback);
                                  setRepliesToReplyContent((prev) => ({
                                    ...prev,
                                    [reply._id]: "",
                                  }));
                                  setReplyInputsOpen({});
                                  setAddFeedReplyToReply(null);
                                }}
                              >
                                {addFeedReplyToReply === reply._id ? (
                                  <Lottie
                                    animationData={animationLoad}
                                    loop={true}
                                    autoplay={true}
                                    className="upvoteLoad addFeedBack"
                                  />
                                ) : (
                                  "Post Reply"
                                )}
                              </button>
                            </div>
                          )}
                        </ul>
                        {reply.repliesToReply?.map(
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (nestedReply: any, i: number) => (
                            <div
                              key={
                                nestedReply._id || `nested-${reply._id}-${i}`
                              }
                              className="nestedReply"
                            >
                              <ul>
                                <ul>
                                  {" "}
                                  {nestedReply.user.image.startsWith("#") ? (
                                    <li
                                      style={{
                                        backgroundColor:
                                          nestedReply.user.image ||
                                          currentUser.image,
                                        width: 40,
                                        height: 40,
                                        borderRadius: "50%",
                                      }}
                                    />
                                  ) : (
                                    <li>
                                      <Image
                                        src={`/${nestedReply.user.image.replace(
                                          /^\.\//,
                                          ""
                                        )}`}
                                        width={40}
                                        height={40}
                                        alt="profile"
                                      />
                                    </li>
                                  )}
                                  <div>
                                    <li>{nestedReply.user?.name}</li>
                                    <li>@{nestedReply.user?.username}</li>
                                  </div>
                                </ul>
                              </ul>
                              <li>
                                <span>@{nestedReply.replyingTo}</span>
                                {nestedReply.content}
                              </li>
                            </div>
                          )
                        )}
                      </React.Fragment>
                    );
                  })}

                {activeReply?.replyingToId === comment._id && (
                  <div className="addreply">
                    <textarea
                      value={replyContent[comment._id] || ""}
                      onChange={(e) =>
                        setReplyContent((prev) => ({
                          ...prev,
                          [comment._id]: e.target.value,
                        }))
                      }
                    />
                    <button
                      onClick={async () => {
                        setAddFeedReply(comment._id);

                        const res = await fetch("/api/reply", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            productId: feedbackData._id,
                            commentId: comment._id,
                            reply: {
                              content: replyContent[comment._id],
                              replyingTo: comment.user.username,
                              user: currentUser,
                            },
                          }),
                        });

                        const updatedFeedback = await res.json();
                        setFeedbackData(updatedFeedback);
                        setReplyContent((prev) => ({
                          ...prev,
                          [comment._id]: "",
                        }));
                        setActiveReply(null);
                        setAddFeedReply(null);
                      }}
                    >
                      {addFeedReply === comment._id ? (
                        <Lottie
                          animationData={animationLoad}
                          loop={true}
                          autoplay={true}
                          className="upvoteLoad addFeedBack"
                        />
                      ) : (
                        "Post Reply"
                      )}
                    </button>
                  </div>
                )}
              </div>
            );
          })
        }
      </div>
      <div className="addComment">
        <h3>Add Comment</h3>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <div>
          <p>{250 - commentText.length} characters left</p>{" "}
          <button
            onClick={async () => {
              setAddFeedComment(true);
              const res = await fetch("/api/comment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  productId: feedbackData._id,
                  content: commentText,
                  user: currentUser,
                }),
              });

              const updatedFeedback = await res.json();
              setFeedbackData(updatedFeedback);
              setCommentText("");
              setAddFeedComment(false);
            }}
          >
            {addFeedComment ? (
              <Lottie
                animationData={animationLoad}
                loop={true}
                autoplay={true}
                className="upvoteLoad addFeedBack"
              />
            ) : (
              "Post Comment"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Client;
