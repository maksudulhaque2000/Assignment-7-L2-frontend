import { Spinner } from './Spinner';

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-background/80 backdrop-blur-sm">
      <Spinner />
    </div>
  );
}
