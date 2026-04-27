"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import InputReusable from "@/components/ui/input-reusable";
import { toast } from "@/lib/toast-store";
import api from "@/lib/api-client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  payment: any;
  onSuccess: () => void;
}

export default function PaymentUpdateModal({ isOpen, onClose, payment, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [reference, setReference] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string>("MVOLA");

  useEffect(() => {
    if (payment) {
      setAmountPaid(payment.amountPaid || 0);
      setReference(payment.reference || "");
      setPaymentMethod(payment.paymentMethod || "MVOLA");
    }
  }, [payment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (amountPaid > payment.amountDue) {
       toast.error("Le montant saisi est supérieur au montant dû.");
       return;
    }

    setLoading(true);
    try {
      const res = await api.patch(`/api/admin/payments/${payment.id}`, {
         amountPaid,
         reference,
         paymentMethod
      });

      if (res.success) {
        toast.success("Paiement mis à jour avec succès.");
        onSuccess();
      } else {
         toast.error(res.error || "Erreur de mise à jour");
      }
    } catch (err) {
      toast.error("Erreur serveur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mise à jour du paiement</DialogTitle>
        </DialogHeader>

        <div className="bg-slate-50 p-4 rounded-lg space-y-2 text-sm text-slate-700 mb-4 border hidden md:block">
           <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Elève :</span>
              <span>{payment?.student?.user?.firstName}</span>
           </div>
           <div className="flex justify-between border-b pb-2 pt-2">
              <span className="font-semibold">Motif :</span>
              <span>{payment?.feeType}</span>
           </div>
           <div className="flex justify-between pt-2">
              <span className="font-semibold">Montant Dû :</span>
              <span className="font-bold text-slate-900">{payment?.amountDue?.toLocaleString()} MGA</span>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nouveau montant total réglé (MGA)</label>
            <InputReusable
              id="amountPaid"
              type="number"
              required
              min={0}
              max={payment?.amountDue || 9999999}
              value={amountPaid}
              onChange={(e: any) => setAmountPaid(Number(e.target.value))}
              placeholder="Ex: 50000"
            />
            <p className="text-xs text-slate-500">Note: Entrez le total cumulé déjà versé.</p>
          </div>

          <div className="space-y-2">
             <label className="text-sm font-medium">Moyen de paiement</label>
             <Select value={paymentMethod} onValueChange={setPaymentMethod}>
               <SelectTrigger>
                 <SelectValue placeholder="Sélectionner..." />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="MVOLA">Mvola</SelectItem>
                 <SelectItem value="ORANGE_MONEY">Orange Money</SelectItem>
                 {/* Explicitly restricted to these two as per spec */}
               </SelectContent>
             </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Référence de transaction (Optionnel)</label>
            <InputReusable
              id="reference"
              value={reference}
              onChange={(e: any) => setReference(e.target.value)}
              placeholder="Ex: REF-XX12345"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
