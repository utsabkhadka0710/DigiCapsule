import { Spinner } from "@/components/ui/spinner";

const LoadingPage = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center gap-2">
      <Spinner />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingPage;
