import { ExternalLink } from 'lucide-react';

export default function ProductCard({ product }) {
  return (
    <div className="glass glass-hover" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ height: '200px', width: '100%', backgroundColor: '#fff', overflow: 'hidden', padding: '0.5rem' }}>
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.title} 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            No Image
          </div>
        )}
      </div>
      
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{product.title}</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem', flexGrow: 1 }}>
          {product.description}
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {product.urls && product.urls.map((u, idx) => (
            <a 
              key={idx} 
              href={u.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={idx === 0 ? "btn-accent" : "btn-outline"}
              style={{ flex: '1 1 auto', textAlign: 'center' }}
            >
              {u.label}
              <ExternalLink size={16} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
