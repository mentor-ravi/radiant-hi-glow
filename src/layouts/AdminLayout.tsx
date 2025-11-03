import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  Users, 
  MessageSquare, 
  Heart, 
  Trophy, 
  Award, 
  FolderOpen, 
  BarChart3, 
  Bell,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ClipboardList
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const isSuperAdmin = userData.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const navigationItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard/admin" },
    { icon: Calendar, label: "Events", path: "/dashboard/admin/events" },
    { icon: BookOpen, label: "Courses", path: "/dashboard/admin/courses" },
    { icon: ClipboardList, label: "Tasks", path: "/dashboard/admin/tasks" },
    { icon: Users, label: "Users", path: "/dashboard/admin/users" },
    { icon: MessageSquare, label: "Chat Center", path: "/dashboard/admin/chat" },
    { icon: Heart, label: "Mentorship", path: "/dashboard/admin/mentorship" },
    { icon: Trophy, label: "Leaderboard", path: "/dashboard/admin/leaderboard" },
    { icon: Award, label: "Certificates", path: "/dashboard/admin/certificates" },
    { icon: FolderOpen, label: "Media Library", path: "/dashboard/admin/media" },
    { icon: BarChart3, label: "Analytics", path: "/dashboard/admin/analytics" },
    { icon: Bell, label: "Notifications", path: "/dashboard/admin/notifications" },
  ];

  const isActivePath = (path: string) => {
    if (path === "/dashboard/admin") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-border bg-card transition-all duration-300",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {isSidebarOpen && (
            <h2 className="text-lg font-bold gradient-text">Admin Portal</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={cn(!isSidebarOpen && "mx-auto")}
          >
            {isSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            {navigationItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActivePath(item.path) ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    !isSidebarOpen && "justify-center px-2"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isSidebarOpen && "mr-3")} />
                  {isSidebarOpen && <span>{item.label}</span>}
                </Button>
              </Link>
            ))}
          </nav>
        </ScrollArea>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border space-y-2">
          {isSuperAdmin && (
            <Link to="/dashboard/admin/settings">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  !isSidebarOpen && "justify-center px-2"
                )}
              >
                <Settings className={cn("h-5 w-5", isSidebarOpen && "mr-3")} />
                {isSidebarOpen && <span>Settings</span>}
              </Button>
            </Link>
          )}
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={cn(
              "w-full justify-start text-destructive hover:text-destructive",
              !isSidebarOpen && "justify-center px-2"
            )}
          >
            <LogOut className={cn("h-5 w-5", isSidebarOpen && "mr-3")} />
            {isSidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Mobile Menu */}
      <div className="md:hidden">
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
            <div className="fixed inset-y-0 left-0 w-72 bg-card border-r border-border">
              <div className="h-16 flex items-center justify-between px-4 border-b border-border">
                <h2 className="text-lg font-bold gradient-text">Admin Portal</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <ScrollArea className="h-[calc(100vh-8rem)] py-4">
                <nav className="space-y-1 px-2">
                  {navigationItems.map((item) => (
                    <Link 
                      key={item.path} 
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button
                        variant={isActivePath(item.path) ? "secondary" : "ghost"}
                        className="w-full justify-start"
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        <span>{item.label}</span>
                      </Button>
                    </Link>
                  ))}
                </nav>
              </ScrollArea>

              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border space-y-2 bg-card">
                {isSuperAdmin && (
                  <Link to="/dashboard/admin/settings">
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="h-5 w-5 mr-3" />
                      <span>Settings</span>
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start text-destructive hover:text-destructive"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 border-b border-border bg-card px-4 md:px-6 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{userData.name || "Admin"}</p>
              <p className="text-xs text-muted-foreground">
                {isSuperAdmin ? "SuperAdmin" : "Admin"}
              </p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
