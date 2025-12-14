import React from 'react';
import { theme } from '../../utils/constants';

interface TeamMember {
  id: string;
  full_name: string;
  role: string;
  type: 'Licensee' | 'EXCO' | 'Director';
  photo_url: string;
  function_area?: string;
}

interface TeamPageProps {
  teamMembers: TeamMember[];
}

const TeamPage: React.FC<TeamPageProps> = ({ teamMembers }) => {
  const licensees = teamMembers.filter(member => member.type === 'Licensee');
  const exco = teamMembers.filter(member => member.type === 'EXCO');
  const directors = teamMembers.filter(member => member.type === 'Director');

  const renderTeamSection = (title: string, members: TeamMember[]) => (
    <section className="mb-20" aria-labelledby={`${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <h2
        id={`${title.toLowerCase().replace(/\s+/g, '-')}`}
        className="text-3xl font-bold mb-10 text-white text-center"
        style={{ fontFamily: theme.fontStack }}
      >
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
        {members.map((member) => (
          <article
            key={member.id}
            className="group cursor-pointer transition-all duration-300 w-full max-w-sm"
            style={{
              backgroundColor: theme.colors.cardBg,
              border: `1px solid ${theme.colors.cardBorder}`,
              borderRadius: theme.radii.card,
              boxShadow: theme.shadow,
            }}
          >
            <div
              className="aspect-[3/4] overflow-hidden"
              style={{ borderTopLeftRadius: theme.radii.card, borderTopRightRadius: theme.radii.card }}
            >
              <img
                src={member.photo_url}
                alt={member.full_name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-white" style={{ fontFamily: theme.fontStack }}>
                {member.full_name}
              </h3>
              <p style={{ color: theme.colors.muted, fontFamily: theme.fontStack }}>
                {member.role}
              </p>
              {member.function_area && (
                <span
                  className="inline-flex mt-2 px-3 py-1 text-sm font-medium rounded-full"
                  style={{ backgroundColor: theme.colors.badgeBg, color: theme.colors.accent, fontFamily: theme.fontStack }}
                >
                  {member.function_area}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );

  return (
    <main
      style={{ backgroundColor: theme.colors.background, minHeight: '100vh', fontFamily: theme.fontStack }}
      className="flex items-center justify-center"
    >
      <div className="max-w-7xl mx-auto px-6 py-20">
        <header className="text-center mb-24">
          <p className="text-5xl uppercase tracking-normal mb-4 font-medium" style={{ color: theme.colors.accent }}>
            TEAM
          </p>
          <h1 className="text-7xl font-bold mb-6 text-white">Organizing Team</h1>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: theme.colors.muted }}>
            Licensee, Executive Committee, and Directors
          </p>
        </header>

        {licensees.length > 0 && renderTeamSection('Licensee', licensees)}
        {exco.length > 0 && renderTeamSection('Executive Committee', exco)}
        {directors.length > 0 && renderTeamSection('Directors', directors)}
      </div>
    </main>
  );
};

export default TeamPage;