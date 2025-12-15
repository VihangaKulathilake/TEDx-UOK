import React from 'react';
import { sharedStyles } from '../../utils/constants';
import { Button } from '../../components/ui/Button';
import Wordmark from '../../components/ui/Wordmark';

interface Partner {
  id: string;
  name: string;
  tier: 'Title' | 'Gold' | 'Silver' | 'Bronze' | 'In-kind';
  logo_url: string;
  isActive?: boolean;
}

interface PartnersPageProps {
  partners?: Partner[];
}

const PartnersPage: React.FC<PartnersPageProps> = ({ partners = [] }) => {
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
    tierPartners: Partner[]
  ) => {
    if (!tierPartners.length) return null;

    return (
      <section className="mb-20" aria-labelledby={`${tier.toLowerCase()}-partners`}>
        <div className="mb-10">
          <h2
            id={`${tier.toLowerCase()}-partners`}
            className={sharedStyles.typography.sectionTitle}
          >
            {tier} Partners
          </h2>
        </div>
        <div className={sharedStyles.layout.partnerGrid}>
          {tierPartners.map((partner) => (
            <div
              key={partner.id}
              className={sharedStyles.card.base}
            >
              <div className={`${sharedStyles.card.imageContainer} flex items-center justify-center p-8`}>
                <img
                  src={partner.logo_url}
                  alt={partner.name}
                  className={`${sharedStyles.partner.logoMaxHeight} w-auto object-contain`}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/200x100/e8e2dc/666666?text=No+Logo';
                  }}
                />
              </div>
              <div className={sharedStyles.card.content}>
                <h3 className={sharedStyles.typography.cardTitle}>
                  {partner.name}
                </h3>
                <p className={`${sharedStyles.typography.cardAccent} mt-1`}>{tier} Partner</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className={sharedStyles.layout.main}>
      {/* Hero */}
      <section className={sharedStyles.layout.heroSection}>
        <div className={sharedStyles.layout.heroContainer}>
          <div className={sharedStyles.layout.heroGrid}>
            <div>
              <h1 className={`${sharedStyles.typography.heroTitle} mb-4`}>
                <Wordmark event="UOK" />
              </h1>
              <h2 className={`${sharedStyles.typography.heroTitle} ${sharedStyles.colors.white}`}>Partners</h2>
            </div>
            <div className="flex items-center justify-start lg:justify-end">
              <p className={`${sharedStyles.typography.description} max-w-md lg:text-right`}>
                Tiered showcases and equal spotlight for every collaborator.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className={sharedStyles.layout.divider} />

      {/* Partners Grid */}
      <section className={sharedStyles.layout.contentSection}>
        <div className="max-w-7xl mx-auto">
          <div className="space-y-24">
            {renderPartnerTier('Title', partnersByTier.Title)}
            {renderPartnerTier('Gold', partnersByTier.Gold)}
            {renderPartnerTier('Silver', partnersByTier.Silver)}
            {renderPartnerTier('Bronze', partnersByTier.Bronze)}
            {renderPartnerTier('In-kind', partnersByTier['In-kind'])}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <p className={`${sharedStyles.typography.trackLabel} mb-4`}>More partners to be announced</p>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8`}>
            Join us at <span className={`${sharedStyles.colors.tedxRed} inline-flex items-baseline`}><span className="relative inline-block"><span>TED</span><span className="absolute top-[-20%]">x</span><span className="opacity-0">x</span></span></span>UOK 2026
          </h2>
          <Button className="px-10 py-4" variant="tedxPrimary">Register Now</Button>
        </div>
      </section>
    </div>
  );
};

export default PartnersPage;