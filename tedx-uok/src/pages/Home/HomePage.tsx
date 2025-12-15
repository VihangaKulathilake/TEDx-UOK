import Wordmark from '../../components/ui/Wordmark';

export default function HomePage() {
  return (
    <div className="px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          <Wordmark event="UOK" />
        </h1>
      </div>
    </div>
  );
}
