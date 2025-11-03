import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Settings, Users, Calendar, BarChart3, LogOut, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  getUsers, 
  getEvents, 
  addUser, 
  addEvent, 
  deleteUser, 
  deleteEvent, 
  initializeDefaultData,
  type User,
  type Event
} from "@/utils/dashboardData";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [showUsersPanel, setShowUsersPanel] = useState(false);
  const [showEventsPanel, setShowEventsPanel] = useState(false);

  const [newUser, setNewUser] = useState<{
    name: string;
    email: string;
    role: "student" | "judge" | "admin";
  }>({ name: "", email: "", role: "student" });
  
  const [newEvent, setNewEvent] = useState<{
    title: string;
    description: string;
    date: string;
    location: string;
    status: "upcoming" | "ongoing" | "completed";
    participants: number;
  }>({
    title: "",
    description: "",
    date: "",
    location: "",
    status: "upcoming",
    participants: 0,
  });

  useEffect(() => {
    initializeDefaultData();
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/get-started");
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = () => {
    setUsers(getUsers());
    setEvents(getEvents());
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }
    addUser(newUser);
    loadData();
    setNewUser({ name: "", email: "", role: "student" });
    setShowUserDialog(false);
    toast({
      title: "Success",
      description: "User added successfully",
    });
  };

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId);
    loadData();
    toast({
      title: "Success",
      description: "User deleted successfully",
    });
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.description) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    addEvent(newEvent);
    loadData();
    setNewEvent({
      title: "",
      description: "",
      date: "",
      location: "",
      status: "upcoming",
      participants: 0,
    });
    setShowEventDialog(false);
    toast({
      title: "Success",
      description: "Event added successfully",
    });
  };

  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId);
    loadData();
    toast({
      title: "Success",
      description: "Event deleted successfully",
    });
  };

  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  const adminActions = [
    { 
      icon: Users, 
      label: "Manage Users", 
      color: "bg-primary",
      onClick: () => setShowUsersPanel(!showUsersPanel)
    },
    { 
      icon: Calendar, 
      label: "Manage Events", 
      color: "bg-secondary",
      onClick: () => setShowEventsPanel(!showEventsPanel)
    },
    { icon: Settings, label: "Platform Settings", color: "bg-accent" },
    { icon: BarChart3, label: "Analytics", color: "bg-success" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Header */}
            <div className="glass-card rounded-2xl p-8 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-primary opacity-10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                      Admin Portal - <span className="gradient-text">{userData.name || "Administrator"}</span> 🛡️
                    </h1>
                    <p className="text-muted-foreground">
                      Full platform control and management
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>

            {/* Admin Actions */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {adminActions.map((action, index) => (
                <div
                  key={index}
                  className="glass-card rounded-xl p-6 hover-lift cursor-pointer group"
                  onClick={action.onClick}
                >
                  <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg">{action.label}</h3>
                </div>
              ))}
            </div>

            {/* Users Management Panel */}
            {showUsersPanel && (
              <div className="glass-card rounded-xl p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">User Management</h2>
                  <Button onClick={() => setShowUserDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
                <div className="space-y-3">
                  {users.map((user) => (
                    <div key={user.id} className="p-4 border border-border rounded-lg flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">Role: {user.role}</p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Events Management Panel */}
            {showEventsPanel && (
              <div className="glass-card rounded-xl p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Event Management</h2>
                  <Button onClick={() => setShowEventDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                </div>
                <div className="space-y-3">
                  {events.map((event) => (
                    <div key={event.id} className="p-4 border border-border rounded-lg flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.date} • {event.location}</p>
                        <p className="text-xs text-muted-foreground">Status: {event.status}</p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Platform Overview */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-3xl font-bold mb-2">{users.length}</h3>
                <p className="text-muted-foreground">Total Users</p>
                <p className="text-sm text-success mt-2">↑ Active in system</p>
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-3xl font-bold mb-2">{events.length}</h3>
                <p className="text-muted-foreground">Total Events</p>
                <p className="text-sm text-success mt-2">↑ In database</p>
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-3xl font-bold mb-2">86%</h3>
                <p className="text-muted-foreground">Engagement Rate</p>
                <p className="text-sm text-success mt-2">↑ 4% increase</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  "New user registration: john.doe@example.com",
                  "Event created: Advanced Web Development Workshop",
                  "Course published: React Fundamentals",
                  "Mentorship request approved for student #123",
                ].map((activity, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <p className="text-sm">{activity}</p>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add User Dialog */}
      <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new user account</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="Enter name"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="Enter email"
              />
            </div>
            <div>
              <Label>Role</Label>
              <Select
                value={newUser.role}
                onValueChange={(value: "student" | "judge" | "admin") =>
                  setNewUser({ ...newUser, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="judge">Judge</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddUser} className="w-full bg-gradient-primary">
              Add User
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Event Dialog */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>Create a new event</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Event title"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Event description"
              />
            </div>
            <div>
              <Label>Date</Label>
              <Input
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                placeholder="March 15-17, 2025"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                placeholder="Online/Hybrid/Location"
              />
            </div>
            <div>
              <Label>Status</Label>
              <Select
                value={newEvent.status}
                onValueChange={(value: "upcoming" | "ongoing" | "completed") =>
                  setNewEvent({ ...newEvent, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddEvent} className="w-full bg-gradient-primary">
              Add Event
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
