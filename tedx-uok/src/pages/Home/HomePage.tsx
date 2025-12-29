import { useSEO } from "../../hooks/useSEO";
import { seoConfig } from "../../config/seo";

// Supabase client
import { supabase } from "../../lib/supabase";

// Data hooks
import { useEvents } from "../../hooks/useEvents";
import { useSpeakers } from "../../hooks/useSpeakers";
import { usePartners } from "../../hooks/usePartners";

// Home components
import About from "../../components/home/About";
import Countdown from "../../components/home/Countdown";
import CTASection from "../../components/home/CTASection";
import Hero from "../../components/home/Hero";
import Highlights from "../../components/home/Highlights";
import Speakers, {
  type Speaker as HomeSpeaker,
} from "../../components/home/Speakers";
import { ThemePreview } from "../../components/home/ThemePreview";
import {
  Partners,
  type Partner as HomePartner,
} from "../../components/home/Partners";

const SPEAKER_BUCKET = import.meta.env
  .VITE_SUPABASE_BUCKET_SPEAKER_PHOTOS as string;
const PARTNER_BUCKET = import.meta.env
  .VITE_SUPABASE_BUCKET_PARTNER_LOGOS as string;

const getImageUrl = (path: string | null, bucketName: string) => {
  if (!path)
    return "https://ui-avatars.com/api/?name=TEDx&background=EB0028&color=fff&size=400";

  if (path.startsWith("http")) return path;

  const { data } = supabase.storage.from(bucketName).getPublicUrl(path);
  return data.publicUrl;
};

const HomePage = () => {
  // Fetch data
  const { event } = useEvents();
  const { speakers } = useSpeakers(6);
  const { partners } = usePartners();

  const eventDate = event?.date ?? null;
  const eventVenue = event?.venues?.name ?? null;
  const theme = event?.theme ?? null;
  const description = event?.description ?? null;

  const realSpeakers: HomeSpeaker[] = speakers.map((speaker) => ({
    id: speaker.id,
    name: speaker.full_name,
    title: speaker.title,
    talkTitle: speaker.talk_title,
    image: getImageUrl(speaker.photo_url, SPEAKER_BUCKET),
  }));

  const realPartners: HomePartner[] = partners.map((partner) => ({
    id: partner.id,
    name: partner.name,
    tier: partner.tier,
    logo: getImageUrl(partner.logo_url, PARTNER_BUCKET),
  }));

  // SEO: Set page title and meta description
  useSEO(seoConfig.home);

  return (
    <div className="min-h-screen bg-background relative -top-16">
      <Hero date={eventDate} venue={eventVenue} theme={theme} />
      <Countdown date={eventDate} />
      <About description={description} />
      <Highlights />
      <ThemePreview theme={theme} description={description} />
      <Speakers speakers={realSpeakers} />
      <Partners partners={realPartners} />
      <CTASection />
    </div>
  );
};

export default HomePage;
