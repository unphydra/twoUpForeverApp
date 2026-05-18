import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/config';
import Breadcrumb from '../components/Breadcrumb';

export default function Accessories() {
  const { accessories } = siteConfig;

  return (
    <div className="container">
      <Breadcrumb />
      
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--accent)' }}>
        {accessories.title}
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {accessories.groups.map(group => (
          <Link to={`/accessories/${group.id}`} key={group.id}>
            <div className="glass glass-hover" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{group.title}</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', flexGrow: 1 }}>
                Explore our recommended {group.title.toLowerCase()}.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', color: 'var(--accent)', fontWeight: 600 }}>
                View Items <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
