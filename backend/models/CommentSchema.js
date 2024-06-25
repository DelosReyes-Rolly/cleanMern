import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
    {
        user_id:{
            type: String,
            required: true,
        },
        review_id:{
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)
export const Comment = mongoose.Model('Comment', commentSchema);