import React from "react";

const images = [
    // Replace with your image URLs or import statements
    "https://source.unsplash.com/random/400x300?sig=1",
    "https://source.unsplash.com/random/400x300?sig=2",
    "https://source.unsplash.com/random/400x300?sig=3",
    "https://source.unsplash.com/random/400x300?sig=4",
    "https://source.unsplash.com/random/400x300?sig=5",
    "https://source.unsplash.com/random/400x300?sig=6",
];

export default function GalleryPage() {
    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-5xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
                    Gallery
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {images.map((src, idx) => (
                        <div
                            key={idx}
                            className="overflow-hidden rounded-lg shadow-lg bg-white hover:scale-105 transition-transform"
                        >
                            <img
                                src={src}
                                alt={`Gallery ${idx + 1}`}
                                className="w-full h-60 object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}