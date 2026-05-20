import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, Compass, Clock, Activity, Settings, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/config';

// Fix for default Leaflet marker icons in Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function Travelogue() {
  const { travelogue } = siteConfig;
  const [selectedStory, setSelectedStory] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!travelogue) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Album Not Found</h1>
        <Link to="/" className="btn-accent">Back to Home</Link>
      </div>
    );
  }

  const { title, description, stories } = travelogue;

  // Crawls accessories to find the matching category path for a gear item title
  const findGearLink = (gearTitle) => {
    if (!siteConfig.accessories || !siteConfig.accessories.groups) return '/accessories';
    
    for (const group of siteConfig.accessories.groups) {
      if (group.links && group.links.some(l => l.title === gearTitle)) {
        return `/accessories/${group.id}`;
      }
      if (group.subgroups) {
        for (const subgroup of group.subgroups) {
          if (subgroup.links && subgroup.links.some(l => l.title === gearTitle)) {
            return `/accessories/${group.id}/${subgroup.id}`;
          }
          if (subgroup.subgroups) {
            for (const subsubgroup of subgroup.subgroups) {
              if (subsubgroup.links && subsubgroup.links.some(l => l.title === gearTitle)) {
                return `/accessories/${group.id}/${subgroup.id}/${subsubgroup.id}`;
              }
            }
          }
        }
      }
    }
    return '/accessories';
  };

  const openStory = (story) => {
    setSelectedStory(story);
    setActiveImageIndex(0);
  };

  const closeStory = () => {
    setSelectedStory(null);
  };

  const nextImage = () => {
    if (!selectedStory) return;
    setActiveImageIndex((prev) => (prev + 1) % selectedStory.images.length);
  };

  const prevImage = () => {
    if (!selectedStory) return;
    setActiveImageIndex((prev) => (prev - 1 + selectedStory.images.length) % selectedStory.images.length);
  };

  // Center the map dynamically based on stories
  const defaultCenter = stories.length === 1 ? stories[0].coordinates : [20.0, 78.0];
  const defaultZoom = stories.length === 1 ? 8 : 5;

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      
      {/* Title Header */}
      <div style={{ textAlign: 'center', margin: '3rem 0 2rem' }}>
        <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', marginBottom: '1rem' }}>
          {title}
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
          {description}
        </p>
      </div>

      {/* Interactive Leaflet Map */}
      <div className="glass" style={{ padding: '1.5rem', marginBottom: '3rem', borderRadius: '24px', overflow: 'hidden' }}>
        <div style={{ height: '450px', width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)', zIndex: 1 }}>
          <MapContainer 
            center={defaultCenter} 
            zoom={defaultZoom} 
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%', zIndex: 1 }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {stories.map((story) => (
              <Marker key={story.id} position={story.coordinates}>
                <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{story.location}</span>
                </Tooltip>
                <Popup className="custom-dark-popup">
                  <div style={{ width: '220px', padding: '0.25rem' }}>
                    <img 
                      src={story.images[0]} 
                      alt={story.title} 
                      style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.75rem' }} 
                    />
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase' }}>
                      {story.date}
                    </span>
                    <h4 style={{ margin: '0.25rem 0 0.5rem', color: '#fff', fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.3 }}>
                      {story.title}
                    </h4>
                    <button 
                      onClick={() => openStory(story)}
                      className="btn-accent"
                      style={{ width: '100%', padding: '0.5rem', fontSize: '0.9rem', justifyContent: 'center', marginTop: '0.25rem' }}
                    >
                      Read Adventure <ArrowRight size={14} />
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Visual Masonry Grid */}
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--accent)', textAlign: 'center' }}>
        Explore All Stories
      </h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '2rem' 
      }}>
        {stories.map((story) => (
          <div 
            key={story.id} 
            className="glass glass-hover" 
            onClick={() => openStory(story)}
            style={{ 
              borderRadius: '20px', 
              overflow: 'hidden', 
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              padding: 0
            }}
          >
            <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
              <img 
                src={story.images[0]} 
                alt={story.title} 
                className="card-zoom-img"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <div style={{ 
                position: 'absolute', 
                top: '1rem', 
                left: '1rem', 
                backgroundColor: 'rgba(15,17,21,0.85)', 
                backdropFilter: 'blur(4px)',
                padding: '0.4rem 0.8rem', 
                borderRadius: '50px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--accent)',
                border: '1px solid var(--border-color)'
              }}>
                {story.date}
              </div>
            </div>
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>
                📍 {story.location}
              </span>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', fontWeight: 700, lineHeight: 1.3 }}>
                {story.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, flexGrow: 1 }}>
                {story.story.substring(0, 120)}...
              </p>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                color: 'var(--accent)', 
                fontWeight: 600, 
                fontSize: '0.95rem',
                marginTop: '1.5rem'
              }}>
                Read Story <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Glassmorphic Story Modal */}
      {selectedStory && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(10, 11, 14, 0.8)',
          backdropFilter: 'blur(12px)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem'
        }} onClick={closeStory}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(25, 27, 33, 0.9) 0%, rgba(15, 17, 21, 0.95) 100%)',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '900px',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column'
          }} onClick={(e) => e.stopPropagation()}>
            
            {/* Close Button */}
            <button 
              onClick={closeStory}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                backgroundColor: 'rgba(255,255,255,0.08)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; }}
            >
              <X size={20} />
            </button>

            {/* Custom Carousel */}
            <div style={{ height: '350px', position: 'relative', width: '100%', backgroundColor: '#000', overflow: 'hidden' }}>
              <img 
                src={selectedStory.images[activeImageIndex]} 
                alt={selectedStory.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              
              {/* Carousel controls if there are multiple images */}
              {selectedStory.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    style={{
                      position: 'absolute',
                      top: '50%', left: '1rem',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(15,17,21,0.6)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                      borderRadius: '50%',
                      width: '44px', height: '44px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 2
                    }}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextImage}
                    style={{
                      position: 'absolute',
                      top: '50%', right: '1rem',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(15,17,21,0.6)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                      borderRadius: '50%',
                      width: '44px', height: '44px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 2
                    }}
                  >
                    <ChevronRight size={24} />
                  </button>
                  {/* Indicators */}
                  <div style={{ 
                    position: 'absolute', 
                    bottom: '1rem', 
                    left: '50%', 
                    transform: 'translateX(-50%)', 
                    display: 'flex', 
                    gap: '0.5rem',
                    zIndex: 2
                  }}>
                    {selectedStory.images.map((_, idx) => (
                      <div 
                        key={idx}
                        style={{
                          width: activeImageIndex === idx ? '24px' : '8px',
                          height: '8px',
                          borderRadius: '4px',
                          backgroundColor: activeImageIndex === idx ? 'var(--accent)' : 'rgba(255,255,255,0.4)',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Modal Content */}
            <div style={{ padding: '2rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                📍 {selectedStory.location} &bull; {selectedStory.date}
              </span>
              <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>
                {selectedStory.title}
              </h2>

              {/* Ride Statistics Grid */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
                gap: '1rem', 
                marginBottom: '2rem' 
              }}>
                <div className="glass" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderRadius: '12px' }}>
                  <Compass size={22} style={{ color: 'var(--accent)' }} />
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Distance</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{selectedStory.stats.distance}</span>
                  </div>
                </div>
                <div className="glass" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderRadius: '12px' }}>
                  <Clock size={22} style={{ color: 'var(--accent)' }} />
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Duration</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{selectedStory.stats.duration}</span>
                  </div>
                </div>
                <div className="glass" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderRadius: '12px' }}>
                  <Activity size={22} style={{ color: 'var(--accent)' }} />
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Terrain</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{selectedStory.stats.terrain}</span>
                  </div>
                </div>
                <div className="glass" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderRadius: '12px' }}>
                  <Settings size={22} style={{ color: 'var(--accent)' }} />
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Ride</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{selectedStory.stats.bike}</span>
                  </div>
                </div>
              </div>

              {/* Story Narrative */}
              <div style={{ marginBottom: '2.5rem' }}>
                <p style={{ 
                  color: 'var(--text-main)', 
                  fontSize: '1.1rem', 
                  lineHeight: '1.7', 
                  whiteSpace: 'pre-line' 
                }}>
                  {selectedStory.story}
                </p>
              </div>

              {/* Gear Section */}
              {selectedStory.gearUsed && selectedStory.gearUsed.length > 0 && (
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--accent)' }}>Gear Used on this Ride</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {selectedStory.gearUsed.map((gear, idx) => (
                      <Link 
                        to={findGearLink(gear)} 
                        key={idx}
                        onClick={closeStory}
                        className="btn-outline"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', textDecoration: 'none' }}
                      >
                        {gear} <ArrowRight size={12} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
