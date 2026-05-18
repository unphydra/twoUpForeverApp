import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { siteConfig } from '../data/config';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';

export default function AccessoryGroup() {
  const { groupId } = useParams();
  
  const group = siteConfig.accessories.groups.find(g => g.id === groupId);

  if (!group) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Group Not Found</h1>
        <Link to="/accessories" className="btn-accent">
          <ArrowLeft size={18} /> Back to Accessories
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <Breadcrumb />
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--accent)' }}>
          {group.title}
        </h1>
        <Link to="/accessories" className="btn-outline">
          <ArrowLeft size={18} /> Back
        </Link>
      </div>
      
      {group.links && group.links.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {group.links.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      ) : (
        <div className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>No products added to this category yet.</p>
        </div>
      )}
    </div>
  );
}
