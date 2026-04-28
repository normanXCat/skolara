"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api-client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import InputReusable from "@/components/ui/input-reusable";
import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Search, CheckCircle, CreditCard, Clock, Activity } from "lucide-react";
import PaymentUpdateModal from "@/components/admin/payments/PaymentUpdateModal";

function getStatusBadge(status: string) {
  switch (status) {
    case "PAID":
      return <Badge variant="success" className="bg-green-100 text-green-800 border-green-200">Payé</Badge>;
    case "PARTIAL":
      return <Badge variant="warning" className="bg-orange-100 text-orange-800 border-orange-200">Partiel</Badge>;
    case "PENDING":
      return <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">En attente</Badge>;
    case "LATE":
      return <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">En retard</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const qs = `?page=${page}&limit=10${search ? `&search=${search}` : ""}${statusFilter && statusFilter !== "ALL" ? `&status=${statusFilter}` : ""}`;
      
      const [paymentsRes, statsRes] = await Promise.all([
        api.get<any>(`/api/admin/payments${qs}`),
        api.get<any>("/api/admin/payments/stats")
      ]);

      if (paymentsRes.success) {
        setPayments(paymentsRes.data.payments);
        setTotalPages(paymentsRes.data.pagination.totalPages);
      }
      
      if (statsRes.success) {
        setStats(statsRes.data);
      }
    } catch (err) {
      toast.error("Erreur lors de la récupération des données.");
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  // Handle Search Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(1);
      fetchData();
    }, 500);
    return () => clearTimeout(handler);
  }, [search, statusFilter, fetchData]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Gestion des Paiements</h1>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-500 font-medium">Recettes Totales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.totalCollected?.toLocaleString()} MGA</div>
            </CardContent>
          </Card>
          <Card>
             <CardHeader className="pb-2">
               <CardTitle className="text-sm text-slate-500 font-medium">Restes à recouvrer</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="text-2xl font-bold text-orange-600">{stats.totalOutstanding?.toLocaleString()} MGA</div>
             </CardContent>
          </Card>
          <Card>
             <CardHeader className="pb-2">
               <CardTitle className="text-sm text-slate-500 font-medium">Paiements Réglés</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="text-2xl font-bold text-slate-800 flex items-center">
                 <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                 {stats.paidCount}
               </div>
             </CardContent>
          </Card>
          <Card>
             <CardHeader className="pb-2">
               <CardTitle className="text-sm text-slate-500 font-medium">Paiements en Retard</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="text-2xl font-bold text-slate-800 flex items-center">
                 <Activity className="w-5 h-5 text-red-500 mr-2" />
                 {stats.lateCount}
               </div>
             </CardContent>
          </Card>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <InputReusable
             id="search"
             type="text"
             placeholder="Rechercher élève, référence..."
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             className="pl-10"
          />
        </div>
        <div className="w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Tous les statuts</SelectItem>
              <SelectItem value="PAID">Payé</SelectItem>
              <SelectItem value="PARTIAL">Partiel</SelectItem>
              <SelectItem value="PENDING">En attente</SelectItem>
              <SelectItem value="LATE">En retard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-slate-50 uppercase border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Élève</th>
                <th className="px-6 py-4 font-medium">Motif</th>
                <th className="px-6 py-4 font-medium">Montant</th>
                <th className="px-6 py-4 font-medium">Reste</th>
                <th className="px-6 py-4 font-medium">Échéance</th>
                <th className="px-6 py-4 font-medium">Statut</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                    Chargement...
                  </td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    Aucun paiement trouvé
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id} className="border-b transition-colors hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {payment.student.user.firstName} {payment.student.user.lastName}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{payment.feeType}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {payment.amountDue.toLocaleString()} MGA
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {(payment.amountDue - payment.amountPaid).toLocaleString()} MGA
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {format(new Date(payment.dueDate), "dd MMM yyyy", { locale: fr })}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(payment.status)}
                    </td>
                    <td className="px-6 py-4">
                      <Button 
                         variant="outline" 
                         size="sm"
                         onClick={() => setSelectedPayment(payment)}
                      >
                         Mettre à jour
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <div className="p-4 border-t flex items-center justify-between">
            <Button
              variant="outline"
              disabled={page === 1 || loading}
              onClick={() => setPage(p => p - 1)}
            >
              Précédent
            </Button>
            <span className="text-sm text-slate-600">Page {page} sur {totalPages}</span>
            <Button
              variant="outline"
              disabled={page === totalPages || loading}
              onClick={() => setPage(p => p + 1)}
            >
              Suivant
            </Button>
          </div>
        )}
      </Card>

      {selectedPayment && (
         <PaymentUpdateModal 
            isOpen={!!selectedPayment} 
            onClose={() => setSelectedPayment(null)} 
            payment={selectedPayment}
            onSuccess={() => {
               setSelectedPayment(null);
               fetchData();
            }}
         />
      )}
    </div>
  );
}
