import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const WelcomeMessage = ({ name, isLoading = false }) => {
  if (isLoading) {
    return <WelcomeMessageSkeleton />;
  }

  const greeting = getGreeting();

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {greeting}, {name}!
            </h1>
            <p className="text-blue-100">Welcome to your financial dashboard</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8"
              >
                <path d="M18 6H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z"></path>
                <path d="M10 10h4"></path>
                <path d="M10 14h4"></path>
                <path d="M6 18v2"></path>
                <path d="M18 18v2"></path>
              </svg>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to get appropriate greeting based on time of day
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

// Skeleton component for loading state
const WelcomeMessageSkeleton = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-10 w-64 bg-white/30 mb-2" />
            <Skeleton className="h-5 w-48 bg-white/30" />
          </div>
          <div className="hidden md:block">
            <Skeleton className="h-14 w-14 rounded-full bg-white/30" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeMessage;
