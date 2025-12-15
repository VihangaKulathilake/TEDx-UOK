import React from 'react';
import { sharedStyles } from '../../utils/constants';

interface TeamMember {
  id: string;
  full_name: string;
  role: string;
  type: 'Licensee' | 'EXCO' | 'Director';
  photo_url: string;
  function_area?: string;
  quote?: string;
}

interface TeamPageProps {
  teamMembers?: TeamMember[];
}

const TeamPage: React.FC<TeamPageProps> = ({ teamMembers = [] }) => {
  const licensees = teamMembers.filter(member => member.type === 'Licensee');
  const executiveCommittee = teamMembers.filter(member => member.type === 'EXCO');
  const directors = teamMembers.filter(member => member.type === 'Director');

  const renderTeamSection = (title: string, members: TeamMember[], trackNumber: string) => (
    <section className="mb-20" aria-labelledby={`${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className={`${sharedStyles.typography.trackLabel} mb-2`}>{trackNumber}</p>
          <h2
            id={`${title.toLowerCase().replace(/\s+/g, '-')}`}
            className={sharedStyles.typography.sectionTitle}
          >
            {title}
          </h2>
        </div>
      </div>

      <div className={sharedStyles.layout.gridThreeCol}>
        {members.map((member) => (
          <article
            key={member.id}
            className={sharedStyles.card.base}
          >
            <div className={sharedStyles.card.imageContainer}>
              <img
                src={member.photo_url}
                alt={member.full_name}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x500/e8e2dc/666666?text=No+Image';
                }}
              />
            </div>
            <div className={`${sharedStyles.card.content} space-y-1`}>
              <h3 className={sharedStyles.typography.cardTitle}>
                {member.full_name}
              </h3>
              <p className={sharedStyles.typography.cardSubtitle}>{member.role}</p>
              {member.function_area && (
                <p className={sharedStyles.typography.cardAccent}>
                  {member.function_area}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );

  return (
    <main className={sharedStyles.layout.main}>
      {/* Hero */}
      <section className={sharedStyles.layout.heroSection}>
        <div className={sharedStyles.layout.heroContainer}>
          <div className={sharedStyles.layout.heroGrid}>
            <div>
              <h1 className={`${sharedStyles.typography.heroTitle} mb-4`}>
                <span className={sharedStyles.colors.tedxRed}>TEDx</span>
                <span className={sharedStyles.colors.white}>UOK</span>
              </h1>
              <h2 className={`${sharedStyles.typography.heroTitle} ${sharedStyles.colors.white}`}>Team</h2>
            </div>
            <div className="flex items-center justify-start lg:justify-end">
              <p className={`${sharedStyles.typography.description} max-w-md lg:text-right`}>
                Meet the licensee, executive committee, and directors who shape TEDxUOK.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <div className={sharedStyles.layout.divider} />
      
      {/* Team Sections */}
      <section className={sharedStyles.layout.contentSection}>
        <div className="max-w-7xl mx-auto space-y-24">
          {licensees.length > 0 && renderTeamSection('Licensee', licensees, 'TEAM 01')}
          {executiveCommittee.length > 0 && renderTeamSection('Executive Committee', executiveCommittee, 'TEAM 02')}
          {directors.length > 0 && renderTeamSection('Directors', directors, 'TEAM 03')}
        </div>
      </section>
    </main>
  );
};

export default TeamPage;