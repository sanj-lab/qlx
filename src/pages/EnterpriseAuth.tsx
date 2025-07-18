import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Shield, Wallet, Mail, Building2, Users, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function EnterpriseAuth() {
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleWalletConnect = () => {
    // Mock wallet connection
    login({
      id: 'wallet-user',
      name: 'DAO Treasury',
      email: '0x742d35...Cc592',
      avatar: 'DT'
    });
    navigate('/');
  };

  const handleEmailSignup = () => {
    if (!email || !organization) return;
    
    login({
      id: 'enterprise-user',
      name: organization,
      email: email,
      avatar: organization.charAt(0).toUpperCase()
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-7 h-7 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Welcome to Quentlex</h1>
            <p className="text-muted-foreground">
              Enterprise-grade legal AI for Web3 organizations
            </p>
          </div>
          
          {/* Trust signals */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-xs">
              <Lock className="w-3 h-3 mr-1" />
              SOC 2 Type II
            </Badge>
            <Badge variant="outline" className="text-xs">
              GDPR Compliant
            </Badge>
            <Badge variant="outline" className="text-xs">
              Zero-Knowledge
            </Badge>
          </div>
        </div>

        {/* Auth Forms */}
        <Card className="p-6">
          <Tabs defaultValue="enterprise" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="enterprise" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Enterprise
              </TabsTrigger>
              <TabsTrigger value="wallet" className="flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Web3
              </TabsTrigger>
            </TabsList>

            <TabsContent value="enterprise" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Work Email</label>
                  <Input
                    type="email"
                    placeholder="legal@yourcompany.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Organization</label>
                  <Input
                    placeholder="Your Company Name"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleEmailSignup}
                  className="w-full"
                  disabled={!email || !organization}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Create Enterprise Account
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="text-xs text-muted-foreground">
                  Enterprise features include:
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Team collaboration
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Advanced security
                  </div>
                  <div className="flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    TEE processing
                  </div>
                  <div className="flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    API access
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="wallet" className="space-y-4">
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <Wallet className="w-12 h-12 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Connect your wallet for decentralized access
                  </p>
                </div>
                
                <Button onClick={handleWalletConnect} className="w-full" variant="outline">
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect MetaMask
                </Button>
                
                <Button onClick={handleWalletConnect} className="w-full" variant="outline">
                  <Wallet className="w-4 h-4 mr-2" />
                  WalletConnect
                </Button>
                
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">
                    Wallet features:
                  </div>
                  <div className="text-xs space-y-1">
                    <div>• On-chain proof verification</div>
                    <div>• Decentralized document storage</div>
                    <div>• DAO governance integration</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Footer */}
        <div className="text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
          <div className="flex justify-center gap-4 text-xs">
            <a href="#" className="text-primary hover:underline">Terms</a>
            <a href="#" className="text-primary hover:underline">Privacy</a>
            <a href="#" className="text-primary hover:underline">Security</a>
          </div>
        </div>
      </div>
    </div>
  );
}