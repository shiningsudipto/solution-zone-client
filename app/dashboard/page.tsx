import { Metadata } from "next";
import { LayoutDashboard, Mail, FolderKanban, Users } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard | Solution Zone",
  description: "Admin dashboard for Solution Zone",
};

const stats = [
  {
    name: "New Contacts",
    value: "12",
    icon: Mail,
    change: "+4 from last week",
    color: "from-primary to-purple-600",
  },
  {
    name: "Active Projects",
    value: "8",
    icon: FolderKanban,
    change: "2 nearing completion",
    color: "from-secondary to-orange-600",
  },
  {
    name: "Team Members",
    value: "15",
    icon: Users,
    change: "All active",
    color: "from-accent to-green-600",
  },
  {
    name: "Tasks Pending",
    value: "24",
    icon: LayoutDashboard,
    change: "+8 this week",
    color: "from-blue-500 to-cyan-600",
  },
];

const quickActions = [
  {
    title: "New Contact",
    description: "Add a new contact submission",
    href: "/dashboard/contacts",
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    title: "Create Project",
    description: "Start a new project",
    href: "/dashboard/projects",
    color: "bg-secondary/10 text-secondary border-secondary/20",
  },
  {
    title: "Add Task",
    description: "Create a new task",
    href: "/dashboard/tasks",
    color: "bg-accent/10 text-accent border-accent/20",
  },
  {
    title: "Write Post",
    description: "Create a blog post",
    href: "/dashboard/blog",
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your business.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-muted-foreground mb-2">
                {stat.name}
              </div>
              <div className="text-xs text-muted-foreground">{stat.change}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Quick Actions
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className={`${action.color} border rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105`}
            >
              <h3 className="font-bold mb-2">{action.title}</h3>
              <p className="text-sm opacity-80">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-card border border-border rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Recent Activity
        </h2>
        <div className="text-center text-muted-foreground py-12">
          <LayoutDashboard className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Activity timeline coming soon...</p>
        </div>
      </div>
    </div>
  );
}
