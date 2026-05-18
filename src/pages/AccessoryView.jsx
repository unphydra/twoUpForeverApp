import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/config';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';

export default function AccessoryView() {
  const params = useParams();
  const path = params["*"]; 
  
  const pathSegments = path ? path.split('/').filter(Boolean) : [];

  let currentItem = {
    title: siteConfig.accessories.title,
    subgroups: siteConfig.accessories.groups
  };

  let found = true;
  for (const segment of pathSegments) {
    if (currentItem.subgroups) {
      const nextItem = currentItem.subgroups.find(g => g.id === segment);
      if (nextItem) {
        currentItem = nextItem;
      } else {
        found = false;
        break;
      }
    } else {
      found = false;
      break;
    }
  }

  if (!found) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Category Not Found</h1>
        <Link to="/accessories" className="btn-accent">
          <ArrowLeft size={18} /> Back to Accessories
        </Link>
      </div>
    );
  }

  const isRoot = pathSegments.length === 0;
  
  // Construct parent URL for the Back button
  const parentPath = pathSegments.slice(0, -1).join('/');
  const backUrl = `/accessories${parentPath ? '/' + parentPath : ''}`;

  return (
    <div className="container">
      <Breadcrumb />
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--accent)' }}>
          {currentItem.title}
        </h1>
        {!isRoot && (
          <Link to={backUrl} className="btn-outline">
            <ArrowLeft size={18} /> Back
          </Link>
        )}
      </div>
      
      {currentItem.subgroups && currentItem.subgroups.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {currentItem.subgroups.map(group => (
            <Link to={`/accessories/${pathSegments.length ? path + '/' : ''}${group.id}`} key={group.id}>
              <div className="glass glass-hover" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{group.title}</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', flexGrow: 1 }}>
                  Explore {group.title.toLowerCase()}.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--accent)', fontWeight: 600 }}>
                  View Items <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {currentItem.links && currentItem.links.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {currentItem.links.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      )}

      {/* Empty state if both subgroups and links are empty/missing */}
      {(!currentItem.subgroups || currentItem.subgroups.length === 0) && (!currentItem.links || currentItem.links.length === 0) && (
        <div className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>No items added to this category yet.</p>
        </div>
      )}
    </div>
  );
}
