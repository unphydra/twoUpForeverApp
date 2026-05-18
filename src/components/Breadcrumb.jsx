import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { siteConfig } from '../data/config';

export default function Breadcrumb() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(p => p);

  if (paths.length === 0) return null;

  return (
    <nav className="breadcrumb-nav" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', flexWrap: 'wrap' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-main)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
        <Home size={16} />
      </Link>
      
      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        
        let label = path;
        
        if (path === 'accessories') label = siteConfig.accessories.title;
        else {
          // Resolve recursively
          let currentItem = { subgroups: siteConfig.accessories.groups };
          // We look up the path segments from index 1 (the first segment after 'accessories') to the current index
          for (let i = 1; i <= index; i++) {
             const segmentId = paths[i];
             if (currentItem.subgroups) {
               const found = currentItem.subgroups.find(g => g.id === segmentId);
               if (found) {
                 currentItem = found;
               } else {
                 break; // Fallback to raw path string if not found
               }
             }
          }
          if (currentItem.title && currentItem.id === path) {
             label = currentItem.title;
          }
        }

        return (
          <div key={path} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ChevronRight size={16} opacity={0.5} />
            {isLast ? (
              <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{label}</span>
            ) : (
              <Link to={`/${paths.slice(0, index + 1).join('/')}`} style={{ transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-main)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
