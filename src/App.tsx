import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/Header";
import Homepage from "./pages/Homepage";
import CLMPage from "./pages/CLMPage";
import CLMUploadPage from "./pages/CLMUploadPage";
import CLMJurisdictionPage from "./pages/CLMJurisdictionPage";
import CLMAnalysisPage from "./pages/CLMAnalysisPage";
import CLMDashboardPage from "./pages/CLMDashboardPage";
import CompliancePage from "./pages/CompliancePage";
import ComplianceUploadPage from "./pages/ComplianceUploadPage";
import ComplianceJurisdictionPage from "./pages/ComplianceJurisdictionPage";
import ComplianceAnalysisPage from "./pages/ComplianceAnalysisPage";
import ComplianceDashboardPage from "./pages/ComplianceDashboardPage";
import ZKProofPage from "./pages/ZKProofPage";
import EnterpriseDashboard from "./pages/EnterpriseDashboard";
import EnterpriseAuth from "./pages/EnterpriseAuth";
import NotFound from "./pages/NotFound";
import DocumentGeneratorPage from "./pages/DocumentGeneratorPage";
import ProofGeneratorPage from "./pages/ProofGeneratorPage";
import NegotiationAgentPage from "./pages/NegotiationAgentPage";
import ReviewRoutingPage from "./pages/ReviewRoutingPage";
import LegalVaultPage from "./pages/LegalVaultPage";
import AlertingPage from "./pages/AlertingPage";
import ShareRoomPage from "./pages/ShareRoomPage";
import FilingCalendarPage from "./pages/FilingCalendarPage";
import TokenClassificationPage from "./pages/TokenClassificationPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Header />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/auth" element={<EnterpriseAuth />} />
              <Route path="/dashboard" element={<EnterpriseDashboard />} />
              <Route path="/clm" element={<CLMPage />} />
              <Route path="/clm/upload" element={<CLMUploadPage />} />
              <Route path="/clm/jurisdiction" element={<CLMJurisdictionPage />} />
              <Route path="/clm/analysis" element={<CLMAnalysisPage />} />
              <Route path="/clm/dashboard" element={<CLMDashboardPage />} />
              <Route path="/compliance" element={<CompliancePage />} />
              <Route path="/compliance/upload" element={<ComplianceUploadPage />} />
              <Route path="/compliance/jurisdiction" element={<ComplianceJurisdictionPage />} />
              <Route path="/compliance/analysis" element={<ComplianceAnalysisPage />} />
              <Route path="/compliance/dashboard" element={<ComplianceDashboardPage />} />
              <Route path="/zk-proof" element={<ZKProofPage />} />
              <Route path="/document-generator" element={<DocumentGeneratorPage />} />
              <Route path="/proof-generator" element={<ProofGeneratorPage />} />
              <Route path="/negotiation-agent" element={<NegotiationAgentPage />} />
              <Route path="/review-routing" element={<ReviewRoutingPage />} />
              <Route path="/legal-vault" element={<LegalVaultPage />} />
              <Route path="/alerting" element={<AlertingPage />} />
              <Route path="/share-room" element={<ShareRoomPage />} />
              <Route path="/filing-calendar" element={<FilingCalendarPage />} />
              <Route path="/token-classification" element={<TokenClassificationPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
