// @new - Placeholder for share functionality
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ProofSharePage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Share & Verify – Quentlex Proofs";
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <section className="py-8 px-6 border-b">
        <div className="container mx-auto max-w-6xl">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/proofs')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Proofs
          </Button>
          <h1 className="text-3xl font-bold mt-4">Share & Verify</h1>
          <p className="text-muted-foreground">Coming soon - full sharing functionality</p>
        </div>
      </section>
    </main>
  );
}