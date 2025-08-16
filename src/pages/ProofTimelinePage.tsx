import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProofTimeline } from "@/components/ui/proofs-timeline";

export default function ProofTimelinePage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Proof Timeline – Quentlex";
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <section className="py-8 px-6 border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Proof Evolution Timeline</h1>
              <p className="text-muted-foreground mt-2">
                Comprehensive audit trail of all compliance proof activities and verifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-6">
        <div className="container mx-auto max-w-6xl">
          <ProofTimeline />
        </div>
      </section>
    </main>
  );
}