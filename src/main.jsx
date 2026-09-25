import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share,
  X,
  ZoomIn,
  MapPin,
  Star,
  Wifi,
  Car,
  Utensils,
  Waves,
} from "lucide-react";
import "./styles/app.css";

const photos = [
  { src: "/assets/1.png", crop: "hero", label: "Living room" },
  { src: "/assets/2.png", crop: "room", label: "Living room" },
  { src: "/assets/5.png", crop: "jacuzzi", label: "Jacuzzi" },
  { src: "/assets/13.png", crop: "bedroom", label: "Bedroom" },
  { src: "/assets/25.png", crop: "building", label: "Building exterior" },
  { src: "/assets/3.png", crop: "full", label: "Living room" },
  { src: "/assets/11.png", crop: "full", label: "Kitchen and dining" },
];

function App() {
  const [tourOpen, setTourOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [liked, setLiked] = useState(false);

  const closeAll = () => {
    setTourOpen(false);
    setLightboxIndex(null);
  };
  const openLightbox = (index) => {
    setTourOpen(false);
    setLightboxIndex(index);
  };
  const next = () =>
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % photos.length));
  const prev = () =>
    setLightboxIndex((i) =>
      i === null ? 0 : (i - 1 + photos.length) % photos.length,
    );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeAll();
      if (lightboxIndex !== null && e.key === "ArrowRight") next();
      if (lightboxIndex !== null && e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand" aria-label="Airbnb clone">
          <span className="brand-mark">P</span>
          <span>airbnb</span>
        </div>
        <div className="top-actions">
          <button className="text-button">Share</button>
          <button
            className="text-button"
            onClick={() => setLiked((v) => !v)}
            aria-pressed={liked}
          >
            <Heart size={17} fill={liked ? "currentColor" : "none"} />{" "}
            {liked ? "Saved" : "Save"}
          </button>
        </div>
      </header>

      <main className="page">
        <div className="title-row">
          <div>
            <h1>Romantic Jacuzzi 1BHK Candolim | Mirahspa UCG1</h1>
            <div className="meta">
              <Star size={14} fill="currentColor" /> 4.84 · <u>49 reviews</u> ·{" "}
              <u>Candolim, Goa, India</u>
            </div>
          </div>
        </div>

        <section className="gallery" aria-label="Property photos">
          <button
            className="photo hero-photo"
            onClick={() => openLightbox(0)}
            aria-label="Open hero photo"
          >
            <Photo p={photos[0]} />
          </button>
          <button className="photo" onClick={() => openLightbox(1)}>
            <Photo p={photos[1]} />
          </button>
          <button className="photo top-right" onClick={() => openLightbox(2)}>
            <Photo p={photos[2]} />
          </button>
          <button className="photo" onClick={() => openLightbox(3)}>
            <Photo p={photos[3]} />
          </button>
          <button className="photo last" onClick={() => openLightbox(4)}>
            <Photo p={photos[4]} />
          </button>
          <button className="show-all" onClick={() => setTourOpen(true)}>
            Show all photos
          </button>
        </section>

        <section className="content-grid">
          <article className="details">
            <div className="host-row">
              <div>
                <h2>Entire serviced apartment in Candolim, India</h2>
                <p>2 guests · 1 bedroom · 1 bed · 1 bathroom</p>
              </div>
              <div className="avatar">M</div>
            </div>
            <div className="divider" />
            <Feature
              icon={<Waves />}
              title="Beautiful surroundings"
              text="Relax in a private jacuzzi and enjoy a comfortable stay."
            />
            <Feature
              icon={<Wifi />}
              title="Fast Wi-Fi"
              text="Stay connected with reliable high-speed internet."
            />
            <Feature
              icon={<Car />}
              title="Free parking"
              text="Convenient parking is available during your stay."
            />
            <div className="divider" />
            <h2>Where you'll sleep</h2>
            <div className="sleep-card">
              <div className="mini-room" />
              <strong>Bedroom</strong>
              <span>1 double bed</span>
            </div>
            <div className="divider" />
            <h2>What this place offers</h2>
            <div className="amenities">
              <Amenity icon={<Wifi />} text="Wifi" />
              <Amenity icon={<Waves />} text="Private hot tub" />
              <Amenity icon={<Car />} text="Free parking" />
              <Amenity icon={<Utensils />} text="Kitchen" />
            </div>
          </article>
          <aside className="booking-card">
            <div className="price">
              <strong>₹4,500</strong> night
            </div>
            <div className="date-grid">
              <div>
                <small>CHECK-IN</small>
                <b>25/09/2026</b>
              </div>
              <div>
                <small>CHECKOUT</small>
                <b>28/09/2026</b>
              </div>
            </div>
            <div className="guests">
              <small>GUESTS</small>
              <b>2 guests</b>
            </div>
            <button className="reserve">Reserve</button>
            <p className="note">You won't be charged yet</p>
            <div className="cost">
              <span>₹4,500 × 3 nights</span>
              <span>₹13,500</span>
              <span>Service fee</span>
              <span>₹1,215</span>
              <strong>Total before taxes</strong>
              <strong>₹14,715</strong>
            </div>
          </aside>
        </section>
      </main>

      {tourOpen && (
        <PhotoTour photos={photos} onClose={closeAll} onOpen={openLightbox} />
      )}
      {lightboxIndex !== null && (
        <Lightbox
          photo={photos[lightboxIndex]}
          index={lightboxIndex}
          count={photos.length}
          onClose={closeAll}
          onPrev={prev}
          onNext={next}
        />
      )}
    </div>
  );
}

function Photo({ p }) {
  return (
    <div
      className={`asset ${p.crop}`}
      style={{ backgroundImage: `url(${p.src})` }}
      aria-hidden="true"
    />
  );
}
function Feature({ icon, title, text }) {
  return (
    <div className="feature">
      <span>{icon}</span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}
function Amenity({ icon, text }) {
  return (
    <div className="amenity">
      <span>{icon}</span>
      {text}
    </div>
  );
}

function PhotoTour({ photos, onClose, onOpen }) {
  return (
    <div className="overlay tour">
      <div className="tour-inner">
        <button className="close" onClick={onClose}>
          <X />
        </button>
        <div className="tour-header">
          <h2>Photo tour</h2>
          <span>{photos.length} photos</span>
        </div>
        <div className="tour-grid">
          {photos.map((p, i) => (
            <button key={i} className="tour-item" onClick={() => onOpen(i)}>
              <Photo p={p} />
              <span>{p.label}</span>
            </button>
          ))}
        </div>
        <div className="tour-preview">
          <div>
            <small>Living room 1</small>
            <p>Comfortable living space with natural light.</p>
          </div>
          <button onClick={() => onOpen(0)} className="preview-photo">
            <Photo p={photos[0]} />
          </button>
        </div>
      </div>
    </div>
  );
}
function Lightbox({ photo, index, count, onClose, onPrev, onNext }) {
  return (
    <div className="overlay lightbox">
      <button className="close" onClick={onClose}>
        <X />
      </button>
      <div className="counter">
        {index + 1} / {count}
      </div>
      <button className="nav prev" onClick={onPrev} aria-label="Previous">
        <ChevronLeft />
      </button>
      <div className="light-image">
        <Photo p={photo} />
      </div>
      <button className="nav next" onClick={onNext} aria-label="Next">
        <ChevronRight />
      </button>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
