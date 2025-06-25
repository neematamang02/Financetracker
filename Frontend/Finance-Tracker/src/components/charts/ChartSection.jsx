import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Labelcharts from "./label-charts";

const ChartSection = ({ data, isLoading = false }) => {
  if (isLoading) {
    return <ChartSectionSkeleton />;
  }

  return (
    <Card className="mt-5 overflow-hidden border-0 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b pb-4">
        <CardTitle className="text-xl font-bold text-blue-800">
          Financial Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Labelcharts data={data} />
      </CardContent>
    </Card>
  );
};

// Skeleton component for loading state
const ChartSectionSkeleton = () => {
  return (
    <Card className="mt-5 overflow-hidden border-0 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b pb-4">
        <Skeleton className="h-7 w-48" />
      </CardHeader>
      <CardContent className="p-4">
        <div className="w-full h-64 flex items-center justify-center bg-slate-50 rounded-lg">
          <div className="space-y-4 w-full px-8">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="h-4 w-3/6" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartSection;
