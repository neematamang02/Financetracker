import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TooltipProvider } from "@/components/ui/tooltip";
import Useuser from "@/hooks/use-user";
import ROUTES from "../routes/routes";
import DASH_ROUTES from "../routes/dashboardroutes";
import {
  ArrowSwapHorizontal,
  DocumentText,
  Element3,
  Logout,
  Setting3,
  User,
  Wallet,
  WalletAdd1,
} from "iconsax-reactjs";
import { useUserProfile } from "@/components/Helper";

// Navigation items
const navigationItems = [
  {
    title: "Overview",
    url: DASH_ROUTES.User_dash,
    icon: () => <Element3 size="32" color="#555555" variant="Bulk" />,
    badge: null,
  },
  {
    title: "Transactions",
    url: DASH_ROUTES.Transaction_pg,
    icon: () => (
      <ArrowSwapHorizontal size="32" color="#555555" variant="Bulk" />
    ),
    badge: null,
  },
  {
    title: "Saving Goals",
    url: DASH_ROUTES.Savinggoal_pg,
    icon: () => <WalletAdd1 size="32" color="#555555" variant="Bulk" />,
    badge: "New",
  },
  {
    title: "Budget Manager",
    url: DASH_ROUTES.Budgetmanage_pg,
    icon: () => <Wallet size="32" color="#555555" variant="Bulk" />,
    badge: null,
  },
  {
    title: "Reports",
    url: DASH_ROUTES.Report_pg,
    icon: () => <DocumentText size="32" color="#555555" variant="Bulk" />,
    badge: null,
  },
];

const accountItems = [
  {
    title: "Profile",
    url: DASH_ROUTES.Userprofile_pg,
    icon: () => <User size="32" color="#555555" variant="Bulk" />,
  },
  {
    title: "Settings",
    url: ROUTES.User_dash,
    icon: () => <Setting3 size="32" color="#555555" variant="Bulk" />,
  },
];

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, error } = Useuser();
  const { profileImage } = useUserProfile();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }

    toast.success("Logout successfully");
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate(ROUTES.Login_Page);
    }, 500);
  };

  const isActiveRoute = (url) => {
    return location.pathname === url;
  };

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return <SidebarSkeleton />;
  }

  if (error) {
    return (
      <Sidebar>
        <SidebarContent className="flex items-center justify-center">
          <div className="text-center p-4">
            <p className="text-red-500">Error loading user data</p>
            <p className="text-sm text-gray-500">{error.message}</p>
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <TooltipProvider>
      <Sidebar collapsible="icon" className="border-r border-gray-200">
        <SidebarHeader className="border-b border-gray-200">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-lg">
                  M
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Moneymate</span>
                  <span className="truncate text-xs">Personal Finance</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          {/* User Profile Section */}
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupContent>
              <div className="flex items-center gap-3 p-3 mx-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                  <AvatarImage
                    //
                    src={profileImage || "https://github.com/shadcn.png"}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback className="bg-blue-600 text-white font-semibold text-xs">
                    {getInitials(user?.name || "User")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-sm font-semibold text-gray-900 truncate">
                    {user?.name || "User"}
                  </span>
                  <span className="text-xs text-gray-500 truncate">
                    Welcome back!
                  </span>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActiveRoute(item.url)}
                      tooltip={item.title}
                      className={`
                        relative transition-all duration-200 hover:bg-blue-50 hover:text-blue-700
                        ${
                          isActiveRoute(item.url)
                            ? "bg-blue-100 text-blue-700 border-r-2 border-blue-600 font-medium"
                            : "text-gray-700"
                        }
                      `}
                    >
                      <Link
                        to={item.url}
                        className="flex items-center gap-3 w-full"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="ml-auto bg-green-100 text-green-700 text-xs px-2 py-0.5"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Account Section */}
          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {accountItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActiveRoute(item.url)}
                      tooltip={item.title}
                      className={`
                        transition-all duration-200 hover:bg-blue-50 hover:text-blue-700
                        ${
                          isActiveRoute(item.url)
                            ? "bg-blue-100 text-blue-700 border-r-2 border-blue-600 font-medium"
                            : "text-gray-700"
                        }
                      `}
                    >
                      <Link
                        to={item.url}
                        className="flex items-center gap-3 w-full"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-gray-200">
          <SidebarMenu>
            <SidebarMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <SidebarMenuButton
                    tooltip="Logout"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
                  >
                    <Logout size="32" color="red" variant="Bulk" />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to logout?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be logged out of your account. This action cannot
                      be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleLogout}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>
    </TooltipProvider>
  );
};

const SidebarSkeleton = () => {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-gray-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 p-2">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex items-center gap-3 p-3 mx-2 rounded-lg">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex flex-col gap-1 flex-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <Skeleton className="h-4 w-16 mx-3 mb-2" />
          <SidebarGroupContent>
            <SidebarMenu>
              {[...Array(5)].map((_, i) => (
                <SidebarMenuItem key={i}>
                  <div className="flex items-center gap-3 p-2 mx-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <Skeleton className="h-4 w-12 mx-3 mb-2" />
          <SidebarGroupContent>
            <SidebarMenu>
              {[...Array(2)].map((_, i) => (
                <SidebarMenuItem key={i}>
                  <div className="flex items-center gap-3 p-2 mx-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 p-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-12" />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

const DashboardLayout = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <SidebarInset className="flex-1">
            {/* Header */}
            <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-gray-900">
                  Dashboard
                </h1>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Badge variant="outline" className="hidden sm:flex">
                  Live
                </Badge>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-gray-50 p-6">
              <div className="mx-auto max-w-7xl">
                <Outlet />
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
