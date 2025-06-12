import React from "react";
import { getFeedbackById } from "@/lib/getFeedbackById";
import { generateParamsFromFeedbacks } from "@/lib/generateParams";
import { notFound } from "next/navigation";
import Client from "./Client";
export async function generateStaticParams() {
  return await generateParamsFromFeedbacks();
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Page = async ({ params }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const feedback = (await getFeedbackById(params.id)) as any;

  if (!feedback) return notFound();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function serializeMongoDoc(doc: any): any {
    if (Array.isArray(doc)) return doc.map(serializeMongoDoc);

    if (doc && typeof doc === "object") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: any = {};
      for (const key in doc) {
        const value = doc[key];

        if (value instanceof Date) {
          result[key] = value.toISOString();
        } else if (
          value &&
          typeof value === "object" &&
          typeof value.toHexString === "function"
        ) {
          result[key] = value.toString();
        } else if (typeof value === "object") {
          result[key] = serializeMongoDoc(value);
        } else {
          result[key] = value;
        }
      }
      return result;
    }

    return doc;
  }
  const serializedFeedback = serializeMongoDoc(feedback);

  return <Client feedback={serializedFeedback} />;
};

export default Page;
