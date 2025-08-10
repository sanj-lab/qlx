import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/Header";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

// Lazy load components for better performance
const Homepage = lazy(() => import("./pages/Homepage"));
const CLMPage = lazy(() => import("./pages/CLMPage"));
const CLMUploadPage = lazy(() => import("./pages/CLMUploadPage"));
const CLMJurisdictionPage = lazy(() => import("./pages/CLMJurisdictionPage"));
const CLMAnalysisPage = lazy(() => import("./pages/CLMAnalysisPage"));
const CLMDashboardPage = lazy(() => import("./pages/CLMDashboardPage"));
const CompliancePage = lazy(() => import("./pages/CompliancePage"));
const ComplianceUploadPage = lazy(() => import("./pages/ComplianceUploadPage"));
const ComplianceJurisdictionPage = lazy(() => import("./pages/ComplianceJurisdictionPage"));
const ComplianceAnalysisPage = lazy(() => import("./pages/ComplianceAnalysisPage"));
const ComplianceDashboardPage = lazy(() => import("./pages/ComplianceDashboardPage"));
const ZKProofPage = lazy(() => import("./pages/ZKProofPage"));
const OrganizationSettings = lazy(() => import("./pages/OrganizationSettings"));
const EnterpriseDashboard = lazy(() => import("./pages/EnterpriseDashboard"));
const EnterpriseAuth = lazy(() => import("./pages/EnterpriseAuth"));
const NotFound = lazy(() => import("./pages/NotFound"));
const DocumentGeneratorPage = lazy(() => import("./pages/DocumentGeneratorPage"));
const ProofGeneratorPage = lazy(() => import("./pages/ProofGeneratorPage"));
const NegotiationAgentPage = lazy(() => import("./pages/NegotiationAgentPage"));
const ReviewRoutingPage = lazy(() => import("./pages/ReviewRoutingPage"));
const LegalVaultPage = lazy(() => import("./pages/LegalVaultPage"));
const AlertingPage = lazy(() => import("./pages/AlertingPage"));
const ShareRoomPage = lazy(() => import("./pages/ShareRoomPage"));
const FilingCalendarPage = lazy(() => import("./pages/FilingCalendarPage"));
const TokenClassificationPage = lazy(() => import("./pages/TokenClassificationPage"));
const LaunchPathPage = lazy(() => import("./pages/LaunchPathPage"));
const CoReviewPage = lazy(() => import("./pages/CoReviewPage"));
const ProofsSpacePage = lazy(() => import("./pages/ProofsPage"));
const DealDeskPage = lazy(() => import("./pages/DealDeskPage"));
const FounderDashboardPage = lazy(() => import("./pages/FounderDashboardPage"));
const JurisdictionSelectorPage = lazy(() => import("./pages/JurisdictionSelectorPage"));
const ComplianceChecklistPage = lazy(() => import("./pages/ComplianceChecklistPage"));
const BusinessIdeaRiskPage = lazy(() => import("./pages/BusinessIdeaRiskPage"));
const ContractRedliningPage = lazy(() => import("./pages/ContractRedliningPage"));
const DocumentRiskPage = lazy(() => import("./pages/DocumentRiskPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Loading fallback component
const PageLoadingFallback = () => (
  <div className="min-h-screen bg-background p-6">
    <div className="container mx-auto max-w-4xl">
      <LoadingSkeleton lines={8} />
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ErrorBoundary>
            <div className="min-h-screen bg-background">
              <Header />
              <Suspense fallback={<PageLoadingFallback />}>
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
                  <Route path="/launch-path" element={<LaunchPathPage />} />
                  <Route path="/co-review" element={<CoReviewPage />} />
                  <Route path="/proofs" element={<ProofsSpacePage />} />
                  <Route path="/deal-desk" element={<DealDeskPage />} />
                  <Route path="/launch-path/jurisdiction" element={<JurisdictionSelectorPage />} />
                  <Route path="/launch-path/compliance-map" element={<ComplianceChecklistPage />} />
                  <Route path="/launch-path/idea-risk" element={<BusinessIdeaRiskPage />} />
                  <Route path="/launch-path/contract-canvas" element={<ContractRedliningPage />} />
                  <Route path="/proofs/document-risk" element={<DocumentRiskPage />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
