import { Users, Calendar, BookOpen, Heart, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminOverview = () => {
  // Mock stats data
  const stats = [
    {
      icon: Calendar,
      label: "Total Events",
      value: "24",
      change: "+3 this month",
      color: "bg-primary",
      link: "/dashboard/admin/events",
    },
    {
      icon: Users,
      label: "Total Students",
      value: "1,247",
      change: "+142 this month",
      color: "bg-secondary",
      link: "/dashboard/admin/users",
    },
    {
      icon: BookOpen,
      label: "Total Courses",
      value: "18",
      change: "+2 this month",
      color: "bg-accent",
      link: "/dashboard/admin/courses",
    },
    {
      icon: Heart,
      label: "Mentorship Requests",
      value: "56",
      change: "+12 pending",
      color: "bg-success",
      link: "/dashboard/admin/mentorship",
    },
  ];

  // Mock chart data
  const participationData = [
    { month: "Jan", students: 120 },
    { month: "Feb", students: 180 },
    { month: "Mar", students: 250 },
    { month: "Apr", students: 320 },
    { month: "May", students: 450 },
    { month: "Jun", students: 580 },
  ];

  const courseEnrollmentData = [
    { name: "Web Dev", value: 320 },
    { name: "AI/ML", value: 180 },
    { name: "Mobile Dev", value: 150 },
    { name: "Data Science", value: 120 },
    { name: "Others", value: 80 },
  ];

  const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))", "hsl(var(--success))", "hsl(var(--muted))"];

  const topPerformers = [
    { name: "Sarah Johnson", points: 2450, badge: "🏆" },
    { name: "Mike Chen", points: 2320, badge: "🥈" },
    { name: "Emma Williams", points: 2180, badge: "🥉" },
    { name: "David Kumar", points: 2050, badge: "⭐" },
    { name: "Lisa Anderson", points: 1980, badge: "⭐" },
  ];

  const recentActivity = [
    { action: "New event created", details: "Advanced AI Workshop", time: "2 hours ago" },
    { action: "Course published", details: "React Masterclass", time: "5 hours ago" },
    { action: "Mentorship approved", details: "Student #1234", time: "8 hours ago" },
    { action: "Certificate issued", details: "Team Alpha - Hackathon Winners", time: "12 hours ago" },
    { action: "New user registration", details: "john.doe@example.com", time: "1 day ago" },
  ];

  const upcomingEvents = [
    { name: "Tech Innovation Summit", date: "Dec 15, 2025", participants: 150 },
    { name: "AI Hackathon 2025", date: "Dec 20, 2025", participants: 200 },
    { name: "Web3 Workshop", date: "Jan 10, 2026", participants: 80 },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Welcome back, <span className="gradient-text">{JSON.parse(localStorage.getItem("user") || "{}").name || "Admin"}</span> 👋
        </h1>
        <p className="text-muted-foreground">Here's what's happening with your platform today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link key={index} to={stat.link}>
            <Card className="hover-lift cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                    <p className="text-xs text-success">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Participation Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Event Participation Trend</CardTitle>
            <CardDescription>Monthly student participation growth</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={participationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Course Enrollment Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Course Enrollment Distribution</CardTitle>
            <CardDescription>Popular courses breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={courseEnrollmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {courseEnrollmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Three Column Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Leaderboard champions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{performer.badge}</span>
                    <div>
                      <p className="font-medium text-sm">{performer.name}</p>
                      <p className="text-xs text-muted-foreground">{performer.points} points</p>
                    </div>
                  </div>
                  <TrendingUp className="h-4 w-4 text-success" />
                </div>
              ))}
            </div>
            <Link to="/dashboard/admin/leaderboard">
              <Button variant="outline" className="w-full mt-4">View Full Leaderboard</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Activity className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.action}</p>
                    <p className="text-xs text-muted-foreground truncate">{activity.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Next scheduled events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/50">
                  <p className="font-medium text-sm mb-1">{event.name}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>📅 {event.date}</span>
                    <span>👥 {event.participants} participants</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/dashboard/admin/events">
              <Button variant="outline" className="w-full mt-4">Manage Events</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/dashboard/admin/events">
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </Link>
            <Link to="/dashboard/admin/courses">
              <Button variant="outline" className="w-full">
                <BookOpen className="mr-2 h-4 w-4" />
                Add Course
              </Button>
            </Link>
            <Link to="/dashboard/admin/users">
              <Button variant="outline" className="w-full">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Button>
            </Link>
            <Link to="/dashboard/admin/notifications">
              <Button variant="outline" className="w-full">
                <Activity className="mr-2 h-4 w-4" />
                Send Announcement
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
