import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingDashboard = () => {
  return (
    <div className="mt-4 min-h-[80vh]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="lg:max-w-xl">
          <Skeleton className="h-8 w-48 mb-3" />
          <Skeleton className="h-4 w-64" />
        </div>

        <div className="grid w-full grid-cols-3 gap-2 sm:gap-3 lg:w-auto lg:shrink-0">
          <Card className="p-3 bg-gray-800 border-gray-700">
            <CardContent>
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-8 w-16 mt-2" />
            </CardContent>
          </Card>

          <Card className="p-3 bg-gray-800 border-gray-700">
            <CardContent>
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-8 w-16 mt-2" />
            </CardContent>
          </Card>

          <Card className="p-3 bg-gray-800 border-gray-700">
            <CardContent>
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-8 w-16 mt-2" />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 mb-4">
        <div className="max-w-fit px-4 py-2 bg-gray-900 rounded mb-3">
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="rounded-xl bg-gray-800 p-2 w-fit">
            <Skeleton className="h-10 w-80" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card
            key={i}
            className="w-full overflow-hidden rounded-xl bg-gray-900 border border-gray-700"
          >
            <CardHeader>
              <Skeleton className="aspect-video w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-6 w-3/4 mb-3" />
              <Skeleton className="h-4 w-1/3 mb-2" />
              <div className="flex items-center justify-between mt-4">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LoadingDashboard;
