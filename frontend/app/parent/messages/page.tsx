import MessagingLayout from "@/components/messaging/MessagingLayout";

export default function ParentMessagesPage() {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Messagerie</h1>
        <p className="text-slate-500 mt-1">Consultez et envoyez vos messages.</p>
      </div>
      <MessagingLayout userRole="PARENT" />
    </div>
  );
}
