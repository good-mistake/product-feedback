module.exports = {

"[project]/.next-internal/server/app/[id]/page/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
}}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/src/app/[id]/loading.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/[id]/loading.tsx [app-rsc] (ecmascript)"));
}}),
"[externals]/mongoose [external] (mongoose, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}}),
"[project]/src/utils/db.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "connectDB": (()=>connectDB)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const MONGO_URI = process.env.MONGO_URI;
const connectDB = async ()=>{
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connection.readyState >= 1) return;
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connect(MONGO_URI);
    } catch (e) {
        console.error(e);
    }
};
}}),
"[project]/models/ProductRequest.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const productRequestSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    title: String,
    category: String,
    upvotes: Number,
    status: String,
    description: String,
    comments: [
        {
            content: String,
            user: {
                image: String,
                name: String,
                username: String
            },
            replies: [
                {
                    content: String,
                    replyingTo: String,
                    user: {
                        image: String,
                        name: String,
                        username: String
                    },
                    repliesToReply: [
                        {
                            _id: {
                                type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
                                auto: true
                            },
                            content: String,
                            replyingTo: String,
                            user: {
                                image: String,
                                name: String,
                                username: String
                            }
                        }
                    ]
                }
            ]
        }
    ],
    userId: String,
    user: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        ref: "GuestUser"
    },
    isSeed: {
        type: Boolean,
        default: false
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    publicId: String,
    upvotedBy: [
        {
            type: String
        }
    ]
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.ProductRequest || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("ProductRequest", productRequestSchema);
}}),
"[project]/src/lib/getFeedbackById.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getFeedbackById": (()=>getFeedbackById)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/db.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$ProductRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/ProductRequest.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
;
;
async function getFeedbackById(id) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Types.ObjectId.isValid(id)) return null;
    const feedback = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$ProductRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findById(id).lean();
    return feedback;
}
}}),
"[project]/src/lib/generateParams.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "generateParamsFromFeedbacks": (()=>generateParamsFromFeedbacks)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/db.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$ProductRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/ProductRequest.js [app-rsc] (ecmascript)");
;
;
async function generateParamsFromFeedbacks() {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
        const feedbacks = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$ProductRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].find({}, "_id").lean();
        if (!feedbacks || feedbacks.length === 0) {
            console.warn("No feedbacks found during build.");
            return [];
        }
        return feedbacks.map((f)=>({
                id: f._id.toString()
            }));
    } catch (error) {
        console.error("Error in generateParamsFromFeedbacks:", error);
        return [];
    }
}
}}),
"[project]/src/app/[id]/Client.tsx (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/[id]/Client.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/[id]/Client.tsx <module evaluation>", "default");
}}),
"[project]/src/app/[id]/Client.tsx (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/[id]/Client.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/[id]/Client.tsx", "default");
}}),
"[project]/src/app/[id]/Client.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$id$5d2f$Client$2e$tsx__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/[id]/Client.tsx (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$id$5d2f$Client$2e$tsx__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/src/app/[id]/Client.tsx (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$id$5d2f$Client$2e$tsx__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/src/app/[id]/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__),
    "generateStaticParams": (()=>generateStaticParams)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$getFeedbackById$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/getFeedbackById.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$generateParams$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/generateParams.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$id$5d2f$Client$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/[id]/Client.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
async function generateStaticParams() {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$generateParams$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateParamsFromFeedbacks"])();
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const page = async ({ params })=>{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const feedback = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$getFeedbackById$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFeedbackById"])(params.id);
    if (!feedback) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function serializeMongoDoc(doc) {
        if (Array.isArray(doc)) return doc.map(serializeMongoDoc);
        if (doc && typeof doc === "object") {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result = {};
            for(const key in doc){
                const value = doc[key];
                if (value instanceof Date) {
                    result[key] = value.toISOString();
                } else if (value && typeof value === "object" && typeof value.toHexString === "function") {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$id$5d2f$Client$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        feedback: serializedFeedback
    }, void 0, false, {
        fileName: "[project]/src/app/[id]/page.tsx",
        lineNumber: 46,
        columnNumber: 10
    }, this);
};
const __TURBOPACK__default__export__ = page;
}}),
"[project]/src/app/[id]/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/[id]/page.tsx [app-rsc] (ecmascript)"));
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__c23e67a0._.js.map