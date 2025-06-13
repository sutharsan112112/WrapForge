import React from 'react';

const Gallerypage = () => {
    // Example images array (replace with your own data or fetch from API)
    const images = [
        { id: 1, src: 'https://source.unsplash.com/random/300x200?sig=1', alt: 'Gallery Image 1' },
        { id: 2, src: 'https://source.unsplash.com/random/300x200?sig=2', alt: 'Gallery Image 2' },
        { id: 3, src: 'https://source.unsplash.com/random/300x200?sig=3', alt: 'Gallery Image 3' },
        { id: 4, src: 'https://source.unsplash.com/random/300x200?sig=4', alt: 'Gallery Image 4' },
        { id: 5, src: 'https://source.unsplash.com/random/300x200?sig=5', alt: 'Gallery Image 5' },
        { id: 6, src: 'https://source.unsplash.com/random/300x200?sig=6', alt: 'Gallery Image 6' },
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Gallery</h1>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
            }}>
                {images.map(image => (
                    <div key={image.id} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                        <img
                            src={image.src}
                            alt={image.alt}
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallerypage;