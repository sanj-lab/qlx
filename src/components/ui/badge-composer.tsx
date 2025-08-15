// @new
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VaultPicker } from "@/components/ui/vault-picker";
import { RiskDial } from "@/components/ui/risk-dial";
import { 
  FileText, 
  Shield, 
  Plus, 
  X, 
  AlertCircle,
  CheckCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectedItem {
  id: string;
  name: string;
  type: 'document' | 'badge';
  hash: string;
  riskImpact: number;
  status: 'valid' | 'expired' | 'pending';
}

interface BadgeComposerProps {
  onCompose: (items: SelectedItem[]) => void;
  disabled?: boolean;
  className?: string;
}

export function BadgeComposer({ onCompose, disabled = false, className }: BadgeComposerProps) {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [showVaultPicker, setShowVaultPicker] = useState(false);
  const [composedRiskScore, setComposedRiskScore] = useState(0);

  // Mock calculation of risk score based on selected items
  const calculateComposedRisk = (items: SelectedItem[]) => {
    if (items.length === 0) return 0;
    const totalImpact = items.reduce((sum, item) => sum + item.riskImpact, 0);
    return Math.min(100, Math.max(0, Math.round(totalImpact / items.length)));
  };

  const handleItemSelect = (item: SelectedItem) => {
    const newItems = [...selectedItems, item];
    setSelectedItems(newItems);
    setComposedRiskScore(calculateComposedRisk(newItems));
  };

  const handleItemRemove = (itemId: string) => {
    const newItems = selectedItems.filter(item => item.id !== itemId);
    setSelectedItems(newItems);
    setComposedRiskScore(calculateComposedRisk(newItems));
  };

  const getItemIcon = (type: string) => {
    return type === 'badge' ? Shield : FileText;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      valid: "status-success",
      expired: "status-error", 
      pending: "status-warning"
    };
    return colors[status as keyof typeof colors] || "status-warning";
  };

  const canCompose = selectedItems.length > 0 && !disabled && 
    selectedItems.every(item => item.status === 'valid');

  return (
    <Card className={cn("premium-card", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Company Badge Composer
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Add Items Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Selected Items ({selectedItems.length})</h4>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowVaultPicker(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Items
            </Button>
          </div>

          {selectedItems.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No items selected</p>
              <p className="text-sm">Add documents or badges to compose your company badge</p>
            </div>
          ) : (
            <div className="space-y-2">
              {selectedItems.map((item) => {
                const ItemIcon = getItemIcon(item.type);
                return (
                  <div 
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <ItemIcon className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">{item.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Impact: {item.riskImpact}pts • {item.hash.slice(0, 8)}...
                        </div>
                      </div>
                      <Badge variant="outline" className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleItemRemove(item.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Risk Score Preview */}
        {selectedItems.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Composed Risk Score</h4>
            <div className="flex items-center justify-center p-6 bg-muted/30 rounded-lg">
              <RiskDial score={composedRiskScore} size="lg" />
            </div>
          </div>
        )}

        {/* Eligibility Check */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Eligibility Check</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              {selectedItems.length > 0 ? (
                <CheckCircle className="w-4 h-4 text-success" />
              ) : (
                <AlertCircle className="w-4 h-4 text-warning" />
              )}
              <span>Minimum 1 item selected</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              {selectedItems.every(item => item.status === 'valid') ? (
                <CheckCircle className="w-4 h-4 text-success" />
              ) : (
                <AlertCircle className="w-4 h-4 text-warning" />
              )}
              <span>All items must be valid</span>
            </div>
          </div>
        </div>

        {/* Compose Button */}
        <Button 
          onClick={() => onCompose(selectedItems)}
          disabled={!canCompose}
          className="w-full"
        >
          <Shield className="w-4 h-4 mr-2" />
          Compose Company Badge
        </Button>

        {/* Vault Picker Modal */}
        {showVaultPicker && (
          <VaultPicker
            trigger={<div />}
            selected={selectedItems.map(item => item.id)}
            onSelectionChange={(selected) => {
              // Mock implementation - in real app would fetch actual items
              const mockItems: SelectedItem[] = selected.map((id, index) => ({
                id,
                name: `Document ${index + 1}`,
                type: Math.random() > 0.5 ? 'document' : 'badge',
                hash: `0x${Math.random().toString(16).slice(2, 10)}`,
                riskImpact: Math.floor(Math.random() * 30) + 70,
                status: 'valid'
              }));
              setSelectedItems(mockItems);
              setComposedRiskScore(calculateComposedRisk(mockItems));
              setShowVaultPicker(false);
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}