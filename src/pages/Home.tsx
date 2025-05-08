import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
  } from '@/components/ui/card';
  import {
    ClipboardList,
    FileCheck,
    Settings
  } from 'lucide-react';
  import { useNavigate } from 'react-router-dom';
  
  const actions = [
    {
      icon: <FileCheck className="h-6 w-6 text-blue-600" />,
      iconBg: "bg-blue-100",
      title: "Process Verifications",
      description: "Review and verify customer identity documents",
      detail: "24 applications awaiting review in your queue",
    },
    {
      icon: <ClipboardList className="h-6 w-6 text-emerald-600" />,
      iconBg: "bg-emerald-100",
      title: "Application History",
      description: "Access complete verification history",
      detail: "Review past verification decisions and audit trail",
    },
    {
      icon: <Settings className="h-6 w-6 text-purple-600" />,
      iconBg: "bg-purple-100",
      title: "System Settings",
      description: "Configure verification parameters",
      detail: "Manage risk thresholds and verification workflows",
    }
  ];
  
  export default function HomePage() {
    const navigate = useNavigate();
  
    return (
      <div className="min-h-screen bg-background flex items-start justify-center py-10 px-4 sm:px-8">
        <main className="w-full max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-3">Welcome to KYC Verification Portal</h1>
            <p className="text-muted-foreground text-lg">
              Your centralized platform for managing and processing customer identity verifications
            </p>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {actions.map((action, idx) => (
              <Card
                key={idx}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${action.iconBg}`}>
                    {action.icon}
                  </div>
                  <CardTitle>{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 text-sm text-muted-foreground">
                  {action.detail}
                </CardContent>
              </Card>
            ))}
          </div>
  
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>How to use the KYC verification portal effectively</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "1. Review Applications",
                  desc: "Start by reviewing pending applications. Verify documents and customer info according to compliance guidelines."
                },
                {
                  title: "2. Handle Exceptions",
                  desc: "Pay attention to flagged cases requiring more scrutiny or documents from customers."
                },
                {
                  title: "3. Generate Reports",
                  desc: "Create compliance reports and maintain documentation for all verification decisions."
                }
              ].map((step, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="text-lg font-semibold">{step.title}</div>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }
  