import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
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
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)
export const Review = mongoose.model('Review', reviewSchema);