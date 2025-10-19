
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

const Reports = () => {
  const reports = [
    { id: 1, name: "Monthly Revenue Report", date: "2025-10-01", size: "2.4 MB" },
    { id: 2, name: "User Activity Summary", date: "2025-10-05", size: "1.8 MB" },
    { id: 3, name: "Q3 Performance Analysis", date: "2025-09-30", size: "3.2 MB" },
    { id: 4, name: "Customer Satisfaction Survey", date: "2025-10-10", size: "1.1 MB" },
  ];

  return (
    <div>
      <div className="space-y-6">
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Reports</h2>
            <p className="text-muted-foreground mt-1">Generate and download business reports.</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Generate New Report
          </Button>
        </div>

        <Card className="animate-fade-in border-border" style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
          <CardHeader>
            <CardTitle className="text-foreground">Available Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reports.map((report, index) => (
                <div 
                  key={report.id} 
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent transition-all duration-200 hover:shadow-sm"
                  style={{ 
                    animationDelay: `${(index + 2) * 100}ms`,
                    animationFillMode: 'backwards'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{report.name}</p>
                      <p className="text-sm text-muted-foreground">{report.date} • {report.size}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
