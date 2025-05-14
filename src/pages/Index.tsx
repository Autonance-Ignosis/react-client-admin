import StatsCard from "../components/dashboard/StatsCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import { useEffect } from "react";
import { useState } from "react";

type DashboardStats = {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
};

import { FileText, Users, CheckCircle, Clock, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Link } from "react-router-dom";

const recentActivities = [
  {
    id: "1",
    user: "John Doe",
    action: "📄 Submitted new KVC application",
    date: "2 hours ago",
    status: "pending" as const,
  },
  {
    id: "2",
    user: "Jane Smith",
    action: "✅ KVC application reviewed",
    date: "5 hours ago",
    status: "approved" as const,
  },
  {
    id: "3",
    user: "Robert Johnson",
    action: "❌ Document verification failed",
    date: "1 day ago",
    status: "rejected" as const,
  },
  {
    id: "4",
    user: "Emily Wilson",
    action: "📝 Updated personal information",
    date: "2 days ago",
    status: "approved" as const,
  },
  {
    id: "5",
    user: "Michael Brown",
    action: "📤 Submitted new documents",
    date: "2 days ago",
    status: "pending" as const,
  },
];

const Index = () => {
  const [noofuser, setNoofuser] = useState<number | null>(null);

  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    axios
      .get<DashboardStats>("http://localhost:8080/api/kyc/stats")
      .then((res) => {
        console.log(res.data);
        setStats(res.data);
      })
      .catch((err) => console.error("Failed to load dashboard stats:", err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user/all")
      .then((res) => {
        console.log("no of user" + res.data.length);
        setNoofuser(Number(res.data.length));
      })
      .catch((err) => console.error("Failed to load dashboard stats:", err));
  }, []);

  return (
    // <AdminLayout>
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">
        📊 Dashboard Overview
      </h1>
      <p className="text-muted-foreground">Welcome to the 🏦 Autonance Admin</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="📄 Total KVC Requests"
          value={stats?.totalRequests?.toLocaleString() || "0"}
          change="12% from last month"
          isPositive={true}
          icon={<FileText size={24} className="text-accent" />}
        />
        <StatsCard
          title="🕒 Pending Requests"
          value={stats?.pendingRequests?.toLocaleString() || "0"}
          change="4% from last week"
          isPositive={false}
          icon={<Clock size={24} className="text-rbi-pending" />}
        />
        <StatsCard
          title="✅ Approved Requests"
          value={stats?.approvedRequests?.toLocaleString() || "0"}
          change="8% from last month"
          isPositive={true}
          icon={<CheckCircle size={24} className="text-rbi-success" />}
        />
        <StatsCard
          title="👥 Registered Users"
          value={noofuser}
          change="15% from last month"
          isPositive={true}
          icon={<Users size={24} className="text-accent" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* <RecentActivity activities={recentActivities} /> */}

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">
              ⚡ Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/kvc-requests"
                className="flex flex-col items-center justify-center p-6 bg-secondary/60 rounded-lg shadow-md border"
              >
                <FileText size={28} className="mb-2 text-primary" />
                <span className="text-sm font-medium">📄 View Requests</span>
              </Link>
              {/* <Link
                // to="/kvc-requests"
                href="/users"
                className="flex flex-col items-center justify-center p-6 bg-secondary/60 rounded-lg shadow-md border"
              >
                <Users size={28} className="mb-2 text-primary" />
                <span className="text-sm font-medium">👥 Manage Users</span>
              </Link> */}

              <Link
                to="/kvc/pending"
                className="flex flex-col items-center justify-center p-6 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <Clock size={24} className="mb-2 text-rbi-pending" />
                <span className="text-sm font-medium">🕒 Pending Reviews</span>
              </Link>
              {/* <a
                // href="/settings"
                className="flex flex-col items-center justify-center p-6 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <Settings size={24} className="mb-2 text-rbi-success" />
                <span className="text-sm font-medium">📊 View Reports</span>
              </a> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    // </AdminLayout>
  );
};

export default Index;
