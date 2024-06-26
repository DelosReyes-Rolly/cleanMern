import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true,
        },
        album_id: {
            type: String,
            required: true,
        },
        user: {
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
        stars: {
            type: Number,
            required: false,
        },
        comments: [{
            user_id: {
                type: String,
                required: true,
            },
            user: {
                type: String,
                required: true,
            },
            comment: {
                type: String,
            },
        }],
    },
    {
        timestamps: true,
    }
)
export const Review = mongoose.model('Review', reviewSchema);