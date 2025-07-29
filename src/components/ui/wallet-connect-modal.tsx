import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet, Shield, CheckCircle2, ExternalLink } from "lucide-react";

interface WalletConnectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WalletConnectModal({ open, onOpenChange }: WalletConnectModalProps) {
  const wallets = [
    {
      name: "MetaMask",
      icon: "🦊",
      description: "Connect using browser extension",
      status: "Recommended"
    },
    {
      name: "WalletConnect",
      icon: "🔗",
      description: "Scan with mobile wallet",
      status: "Mobile"
    },
    {
      name: "Coinbase Wallet",
      icon: "🔵",
      description: "Connect with Coinbase",
      status: "Available"
    },
    {
      name: "Rainbow",
      icon: "🌈",
      description: "Connect with Rainbow wallet",
      status: "Available"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            Connect Wallet
          </DialogTitle>
          <DialogDescription>
            Choose your preferred wallet to continue
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3">
          {wallets.map((wallet, index) => (
            <Button
              key={wallet.name}
              variant="outline"
              className="w-full justify-start h-auto p-4"
              onClick={() => {
                // Simulate wallet connection
                setTimeout(() => {
                  onOpenChange(false);
                }, 1000);
              }}
            >
              <div className="flex items-center gap-3 w-full">
                <span className="text-2xl">{wallet.icon}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium">{wallet.name}</div>
                  <div className="text-sm text-muted-foreground">{wallet.description}</div>
                </div>
                <div className="text-xs text-primary">{wallet.status}</div>
              </div>
            </Button>
          ))}
        </div>
        
        <div className="pt-4 border-t">
          <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <Shield className="w-4 h-4 text-primary mt-0.5" />
            <div className="text-sm">
              <div className="font-medium text-primary mb-1">Secure Connection</div>
              <div className="text-muted-foreground">
                We never store your private keys. Your wallet connection is encrypted and secure.
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CheckCircle2 className="w-3 h-3" />
          <span>By connecting, you agree to our Terms of Service</span>
          <ExternalLink className="w-3 h-3" />
        </div>
      </DialogContent>
    </Dialog>
  );
}