import React from 'react';
import { theme } from '../../utils/constants';

interface Partner {
  id: string;
  name: string;
  tier: 'Title' | 'Gold' | 'Silver' | 'Bronze' | 'In-kind'; 
  logo_url: string;
  isActive?: boolean;
}

interface PartnersPageProps {
  partners: Partner[];
}

const cardStyle = {
  backgroundColor: theme.colors.cardBg,
  border: `1px solid ${theme.colors.cardBorder}`,
  borderRadius: theme.radii.card,
  minHeight: '180px',
  boxShadow: theme.shadow,
};

const PartnersPage: React.FC<PartnersPageProps> = ({ partners }) => {
  const activePartners = partners.filter((p) => p.isActive ?? true);

  const partnersByTier = {
    Title: activePartners.filter((p) => p.tier === 'Title'),
    Gold: activePartners.filter((p) => p.tier === 'Gold'),
    Silver: activePartners.filter((p) => p.tier === 'Silver'),
    Bronze: activePartners.filter((p) => p.tier === 'Bronze'),
    'In-kind': activePartners.filter((p) => p.tier === 'In-kind'),
  };

  const renderPartnerTier = (
    tier: string,
    tierPartners: Partner[],
    gridCols: string,
    maxHeight: string
  ) => {
    if (!tierPartners.length) return null;

    return (
      <section className="mb-20" aria-labelledby={`${tier.toLowerCase()}-partners`}>
        <h2
          id={`${tier.toLowerCase()}-partners`}
          className="text-3xl font-bold mb-10 text-white text-center"
          style={{ fontFamily: theme.fontStack }}
        >
          {tier} Partners
        </h2>
        <div className={`grid ${gridCols} gap-8 justify-items-center`}>
          {tierPartners.map((partner) => (
            <div
              key={partner.id}
              className="group cursor-pointer flex items-center justify-center p-8 transition-all duration-300 w-full"
              style={cardStyle}
            >
              <img
                src={partner.logo_url}
                alt={partner.name}
                className={`${maxHeight} w-auto object-contain transition-transform duration-300 group-hover:scale-110`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <main
      style={{ backgroundColor: theme.colors.background, minHeight: '100vh', fontFamily: theme.fontStack }}
      className="flex items-center justify-center"
    >
      <div className="max-w-7xl mx-auto px-6 py-20">
        <header className="text-center mb-24">
          <p
            className="text-5xl uppercase tracking-normal mb-4 font-medium"
            style={{ color: theme.colors.accent }}
          >
            PARTNERS
          </p>
          <h1 className="text-7xl font-bold mb-6 text-white">Partners &amp; Sponsors</h1>
          <p className="text-lg max-w-3xl mx-auto mb-10" style={{ color: theme.colors.muted }}>
            Tiered showcases. Equal spotlight. Simple ways to partner.
          </p>
          <button
            type="button"
            className="px-8 py-4 font-bold text-white rounded-full transition-colors duration-200 hover:brightness-90 focus-visible:brightness-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
            style={{ backgroundColor: theme.colors.accent, fontFamily: theme.fontStack, borderRadius: theme.radii.pill }}
            aria-label="Become a Partner"
          >
            Become a Partner
          </button>
        </header>

        {renderPartnerTier('Title', partnersByTier.Title, 'grid-cols-1 md:grid-cols-2', 'max-h-24')}
        {renderPartnerTier('Gold', partnersByTier.Gold, 'grid-cols-2 md:grid-cols-3', 'max-h-20')}
        {renderPartnerTier('Silver', partnersByTier.Silver, 'grid-cols-2 md:grid-cols-4', 'max-h-16')}
        {renderPartnerTier('Bronze', partnersByTier.Bronze, 'grid-cols-3 md:grid-cols-4 lg:grid-cols-5', 'max-h-14')}
        {renderPartnerTier('In-kind', partnersByTier['In-kind'], 'grid-cols-3 md:grid-cols-4 lg:grid-cols-6', 'max-h-12')}
      </div>
    </main>
  );
};

export default PartnersPage;