import React from 'react';

const images = [
    // Add your image URLs here
    'https://via.placeholder.com/300x200?text=Image+1',
    'https://via.placeholder.com/300x200?text=Image+2',
    'https://via.placeholder.com/300x200?text=Image+3',
    'https://via.placeholder.com/300x200?text=Image+4',
    'https://via.placeholder.com/300x200?text=Image+5',
    'https://via.placeholder.com/300x200?text=Image+6',
];

const GalleryPage = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Gallery</h1>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1.5rem',
                    marginTop: '2rem',
                }}
            >
                {images.map((src, idx) => (
                    <div
                        key={idx}
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            background: '#fafafa',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        }}
                    >
                        <img
                            src={src}
                            alt={`Gallery ${idx + 1}`}
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalleryPage;