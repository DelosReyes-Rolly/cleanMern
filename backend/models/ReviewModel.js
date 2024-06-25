import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
    {
        user_id:{
            type: String,
            required: true,
        },
        album_id:{
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        stars:{
            type: Int32,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)
export const Review = mongoose.Model('Review', reviewSchema);