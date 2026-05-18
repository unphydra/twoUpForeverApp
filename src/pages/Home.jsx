import { ArrowRight, Camera, Video, ThumbsUp, MessageCircle, Hash, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/config';
import InteractiveMap from '../components/InteractiveMap';

export default function Home() {
  const { profile } = siteConfig;

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '60vh',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Image with Overlay */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url(${profile.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1
        }} />
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to bottom, rgba(15, 17, 21, 0.4), rgba(15, 17, 21, 1))',
          zIndex: -1
        }} />

        <div className="container" style={{ zIndex: 1 }}>
          <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
            Two_Up_Forever
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-main)', maxWidth: '600px', margin: '0 auto 2rem' }}>
            {profile.description}
          </p>
          <Link to="/accessories" className="btn-accent" style={{ fontSize: '1.1rem' }}>
            Explore Our Gear <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Content Section */}
      <section className="container" style={{ marginTop: '2rem' }}>
        <div className="glass" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--accent)' }}>Who We Are</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 2rem' }}>
            {profile.whoWeAre}
          </p>

          {profile.team && profile.team.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', marginBottom: '3rem' }}>
              {profile.team.map((member, idx) => (
                <div key={idx} className="glass" style={{ flex: '1 1 250px', maxWidth: '350px', overflow: 'hidden', textAlign: 'left', padding: 0 }}>
                  <div style={{ height: '250px', width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', overflow: 'hidden' }}>
                    {member.image && (
                      <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                    )}
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '0.25rem' }}>{member.name}</h3>
                    <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{member.role}</p>
                    <p style={{ color: 'var(--text-muted)' }}>{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {profile.socialLinks.instagram && (
              <a href={profile.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <Camera size={20} /> Instagram
              </a>
            )}
            {profile.socialLinks.facebook && (
              <a href={profile.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <ThumbsUp size={20} /> Facebook
              </a>
            )}
            {profile.socialLinks.threads && (
              <a href={profile.socialLinks.threads} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <MessageCircle size={20} /> Threads
              </a>
            )}
            {profile.socialLinks.twitter && (
              <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <Hash size={20} /> Twitter
              </a>
            )}
            {profile.socialLinks.youtube && (
              <a href={profile.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <Video size={20} /> YouTube
              </a>
            )}
            {profile.socialLinks.email && (
              <a href={`mailto:${profile.socialLinks.email}`} className="btn-outline">
                <Mail size={20} /> Email
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Journeys Map Section */}
      {siteConfig.journeys && siteConfig.journeys.visitedPlaces.length > 0 && (
        <section className="container" style={{ marginTop: '2rem' }}>
          <div className="glass" style={{ padding: '2.5rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>
              {siteConfig.journeys.title}
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
              {siteConfig.journeys.description}
            </p>
            <InteractiveMap places={siteConfig.journeys.visitedPlaces} />
          </div>
        </section>
      )}
    </div>
  );
}
