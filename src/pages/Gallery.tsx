import React, { useState, useEffect, useCallback } from 'react';
import { HeartIcon, MessageCircleIcon, ShareIcon, BookmarkIcon, ChevronLeftIcon, ChevronRightIcon, SearchIcon } from 'lucide-react';
import { useToast } from '../hooks/useToast'; // Updated import path for useToast hook

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  tags: string[];
  category: string;
  likes: number;
  bookmarked: boolean;
  createdAt: string;
}

const galleryImages: GalleryImage[] = [
  { id: '1', src: '/kivu.jpg', alt: 'Lake Kivu', caption: 'Serenity at Lake Kivu', tags: ['Nature', 'Water'], category: 'Nature', likes: 12, bookmarked: false, createdAt: '2025-04-01' },
  { id: '2', src: '/trav.jpg', alt: 'Travel', caption: 'Exploring the Kivu region', tags: ['Travel', 'Adventure'], category: 'Adventure', likes: 8, bookmarked: false, createdAt: '2025-03-15' },
  { id: '3', src: '/journey.jpg', alt: 'Journey', caption: 'A journey through the wild', tags: ['Adventure', 'Wildlife'], category: 'Adventure', likes: 15, bookmarked: false, createdAt: '2025-02-20' },
  { id: '4', src: '/celeb.jpg', alt: 'Celebrities', caption: 'Celebrity safari moments', tags: ['Culture', 'People'], category: 'Culture', likes: 20, bookmarked: false, createdAt: '2025-01-10' },
  { id: '5', src: '/peope.jpg', alt: 'People', caption: 'Local communities of Kivu', tags: ['Culture', 'Community'], category: 'Culture', likes: 10, bookmarked: false, createdAt: '2024-12-05' },
  { id: '6', src: '/tours.jpg', alt: 'Tours', caption: 'Guided tours in the wild', tags: ['Adventure', 'Tours'], category: 'Adventure', likes: 18, bookmarked: false, createdAt: '2024-11-25' },
  { id: '7', src: '/welcome.jpg', alt: 'Welcome', caption: 'Welcome to Kivu Safaris', tags: ['Nature', 'Welcome'], category: 'Nature', likes: 14, bookmarked: false, createdAt: '2024-10-30' },
];

export const Gallery: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<GalleryImage[]>(galleryImages);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<string>('Newest');
  const [visibleCount, setVisibleCount] = useState(4); // For infinite scroll simulation
  const { toast } = useToast(); // Assume toast hook for notifications

  const categories = ['All', ...new Set(galleryImages.map((img) => img.category))];

  // Filter and sort images
  const filteredImages = useCallback(() => {
    let result = images.filter((img) =>
      (img.alt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))) &&
      (filterCategory === 'All' || img.category === filterCategory)
    );

    if (sortOption === 'Newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortOption === 'Oldest') {
      result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortOption === 'Popular') {
      result.sort((a, b) => b.likes - a.likes);
    } else if (sortOption === 'Alphabetical') {
      result.sort((a, b) => a.alt.localeCompare(b.alt));
    }

    return result.slice(0, visibleCount);
  }, [images, searchQuery, filterCategory, sortOption, visibleCount]);

  // Modal controls
  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (event.key === 'Escape') {
        closeModal();
      } else if (event.key === 'ArrowRight') {
        nextImage();
      } else if (event.key === 'ArrowLeft') {
        prevImage();
      }
    },
    [isModalOpen]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Interaction handlers
  const handleLike = (id: string) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, likes: img.likes + (img.likes % 2 === 0 ? 1 : -1) } : img
      )
    );
  };

  const handleBookmark = (id: string) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, bookmarked: !img.bookmarked } : img))
    );
  };

  const handleShare = (id: string) => {
    const url = `${window.location.origin}/gallery/${id}`;
    navigator.clipboard.writeText(url);
    toast({ message: 'Link copied to clipboard!', type: 'success' });
  };

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, images.length));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-coral-500 to-pink-500 text-white p-6 shadow-lg">
        <h1 className="text-4xl font-extrabold text-center mb-2">Kivu Safaris Feed</h1>
        <p className="text-center mb-4 text-white/80">Discover breathtaking moments from our adventures</p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search images, tags, or captions..."
              className="w-full pl-10 p-2 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-coral-300"
              aria-label="Search feed"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="p-2 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-coral-300"
            aria-label="Filter by category"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-coral-300"
            aria-label="Sort feed"
          >
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
            <option value="Popular">Popular</option>
            <option value="Alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Feed */}
      <div className="p-6 max-w-4xl mx-auto" role="feed" aria-label="Image feed">
        {filteredImages().map((image, index) => (
          <div
            key={image.id}
            className="mb-6 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div
              className="cursor-pointer"
              onClick={() => openModal(index)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') openModal(index);
              }}
              aria-label={`View ${image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-80 object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900">{image.alt}</h2>
              <p className="text-gray-600 mt-1">{image.caption}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {image.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm text-coral-600 hover:underline cursor-pointer"
                    onClick={() => setSearchQuery(tag)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setSearchQuery(tag);
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleLike(image.id)}
                  className="flex items-center gap-1 text-gray-600 hover:text-coral-600"
                  aria-label={`Like ${image.alt}`}
                >
                  <HeartIcon
                    className={`h-5 w-5 ${image.likes % 2 === 1 ? 'fill-coral-600 text-coral-600' : ''}`}
                  />
                  <span>{image.likes}</span>
                </button>
                <button
                  onClick={() => openModal(index)}
                  className="flex items-center gap-1 text-gray-600 hover:text-coral-600"
                  aria-label={`Comment on ${image.alt}`}
                >
                  <MessageCircleIcon className="h-5 w-5" />
                  <span>Comment</span>
                </button>
                <button
                  onClick={() => handleShare(image.id)}
                  className="flex items-center gap-1 text-gray-600 hover:text-coral-600"
                  aria-label={`Share ${image.alt}`}
                >
                  <ShareIcon className="h-5 w-5" />
                  <span>Share</span>
                </button>
                <button
                  onClick={() => handleBookmark(image.id)}
                  className="flex items-center gap-1 text-gray-600 hover:text-coral-600"
                  aria-label={`Bookmark ${image.alt}`}
                >
                  <BookmarkIcon
                    className={`h-5 w-5 ${image.bookmarked ? 'fill-coral-600 text-coral-600' : ''}`}
                  />
                  <span>{image.bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
        {visibleCount < images.length && (
          <button
            onClick={loadMore}
            className="mx-auto block bg-coral-500 hover:bg-coral-600 text-white px-6 py-2 rounded-md mt-6"
            aria-label="Load more images"
          >
            Load More
          </button>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="relative max-w-4xl w-full p-4 sm:p-6 bg-white rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-coral-300"
              aria-label="Close modal"
            >
              ×
            </button>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevImage}
                className="text-gray-600 hover:text-coral-600 focus:outline-none focus:ring-2 focus:ring-coral-300"
                aria-label="Previous image"
              >
                <ChevronLeftIcon className="h-8 w-8" />
              </button>
              <img
                src={images[currentImageIndex].src}
                alt={images[currentImageIndex].alt}
                className="max-w-full max-h-[60vh] rounded-lg"
                loading="lazy"
              />
              <button
                onClick={nextImage}
                className="text-gray-600 hover:text-coral-600 focus:outline-none focus:ring-2 focus:ring-coral-300"
                aria-label="Next image"
              >
                <ChevronRightIcon className="h-8 w-8" />
              </button>
            </div>
            <div className="p-4">
              <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
                {images[currentImageIndex].alt}
              </h2>
              <p className="text-gray-600 mt-1">{images[currentImageIndex].caption}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {images[currentImageIndex].tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm text-coral-600 hover:underline cursor-pointer"
                    onClick={() => {
                      setSearchQuery(tag);
                      closeModal();
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSearchQuery(tag);
                        closeModal();
                      }
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleLike(images[currentImageIndex].id)}
                  className="flex items-center gap-1 text-gray-600 hover:text-coral-600"
                  aria-label={`Like ${images[currentImageIndex].alt}`}
                >
                  <HeartIcon
                    className={`h-5 w-5 ${images[currentImageIndex].likes % 2 === 1 ? 'fill-coral-600 text-coral-600' : ''}`}
                  />
                  <span>{images[currentImageIndex].likes}</span>
                </button>
                <button
                  className="flex items-center gap-1 text-gray-600 hover:text-coral-600"
                  aria-label={`Comment on ${images[currentImageIndex].alt}`}
                >
                  <MessageCircleIcon className="h-5 w-5" />
                  <span>Comment</span>
                </button>
                <button
                  onClick={() => handleShare(images[currentImageIndex].id)}
                  className="flex items-center gap-1 text-gray-600 hover:text-coral-600"
                  aria-label={`Share ${images[currentImageIndex].alt}`}
                >
                  <ShareIcon className="h-5 w-5" />
                  <span>Share</span>
                </button>
                <button
                  onClick={() => handleBookmark(images[currentImageIndex].id)}
                  className="flex items-center gap-1 text-gray-600 hover:text-coral-600"
                  aria-label={`Bookmark ${images[currentImageIndex].alt}`}
                >
                  <BookmarkIcon
                    className={`h-5 w-5 ${images[currentImageIndex].bookmarked ? 'fill-coral-600 text-coral-600' : ''}`}
                  />
                  <span>{images[currentImageIndex].bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                </button>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">Comments</h3>
                <div className="mt-2 space-y-2">
                  <p className="text-gray-600">
                    <strong>User1:</strong> Amazing view!
                  </p>
                  <p className="text-gray-600">
                    <strong>User2:</strong> Love this place!
                  </p>
                </div>
                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-coral-300"
                    aria-label="Add a comment"
                  />
                  <button
                    className="bg-coral-500 hover:bg-coral-600 text-white px-4 py-2 rounded-md"
                    aria-label="Post comment"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};