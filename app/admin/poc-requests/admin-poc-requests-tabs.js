"use client";

import { useState } from "react";
import { Trash2, CheckCircle, Loader2, Eye, RefreshCw, X } from "lucide-react"; 

export default function AdminPocRequestsTabs({ requests: initialRequests }) {
  const [activeTab, setActiveTab] = useState("new");
  const [requests, setRequests] = useState(initialRequests || []);
  const [isDeleting, setIsDeleting] = useState(null);
  const [isUpdating, setIsUpdating] = useState(null);

  // Modal control states
  const [statusModalReq, setStatusModalReq] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [viewModalReq, setViewModalReq] = useState(null);

  // Separation engine
  const newRequests = requests.filter(req => req.status === "new");
  const reviewedRequests = requests.filter(req => req.status !== "new");

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "approved":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "rejected":
        return "bg-rose-50 text-rose-700 border border-rose-200";
      case "under review":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      case "reviewed":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      default:
        return "bg-slate-50 text-slate-700 border border-slate-200";
    }
  };

  const updateLocalReqInState = (id, updatedFields) => {
    setRequests(prev =>
      prev.map(req => (req._id === id ? { ...req, ...updatedFields } : req))
    );
    if (viewModalReq && viewModalReq._id === id) {
      setViewModalReq(prev => ({ ...prev, ...updatedFields }));
    }
  };

  // Quick mark as reviewed from "new" tab
  const handleMoveToReviewed = async (id) => {
    setIsUpdating(id);
    try {
      const res = await fetch(`/api/poc-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "reviewed" }),
      });

      const data = await res.json();

      if (res.ok && data.pocRequest) {
        updateLocalReqInState(id, data.pocRequest);
      } else {
        alert(data.error || "Failed to update status in the database.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Something went wrong.");
    } finally {
      setIsUpdating(null);
    }
  };

  // Detailed status update save from modal
  const handleSaveStatusUpdate = async () => {
    if (!statusModalReq || !selectedStatus) return;
    
    const id = statusModalReq._id.toString();
    setIsUpdating(id);

    try {
      const res = await fetch(`/api/poc-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: selectedStatus }),
      });

      const data = await res.json();

      if (res.ok && data.pocRequest) {
        updateLocalReqInState(id, data.pocRequest);
        setStatusModalReq(null); 
      } else {
        alert(data.error || "Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Something went wrong.");
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this POC request?")) return;

    setIsDeleting(id);
    try {
      const res = await fetch(`/api/poc-requests/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setRequests(requests.filter((req) => req._id !== id));
      } else {
        alert("Failed to delete request from database.");
      }
    } catch (error) {
      console.error("Error deleting request:", error);
      alert("Something went wrong.");
    } finally {
      setIsDeleting(null);
    }
  };

  const renderTable = (targetDataset, tabType) => (
    <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Email</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Company</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Industry</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Submitted</th>
              {tabType === "reviewed" && (
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Current Status</th>
              )}
              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {targetDataset.map((req) => {
              const reqIdString = req._id.toString();
              return (
                <tr key={reqIdString} className="hover:bg-slate-50">
                  <td className="px-6 py-5 text-sm font-semibold text-slate-900">
                    {req.fullName || [req.firstName, req.lastName].filter(Boolean).join(" ")}
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-600">{req.email}</td>
                  <td className="px-6 py-5 text-sm text-slate-600">{req.company || "—"}</td>
                  <td className="px-6 py-5 text-sm text-slate-600">
                    <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                      {req.industry || req.industries?.[0] || "—"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-600">{formatDate(req.createdAt)}</td>
                  {tabType === "reviewed" && (
                    <td className="px-6 py-5 text-sm font-medium">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusBadgeClass(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                  )}
                  <td className="px-6 py-5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          const freshReq = requests.find(r => r._id.toString() === reqIdString);
                          setViewModalReq(freshReq || req);
                        }}
                        className="text-blue-500 hover:text-blue-700 transition-colors p-2 rounded-full hover:bg-blue-50"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>

                      {tabType === "new" && (
                        <>
                          <button
                            onClick={() => handleMoveToReviewed(reqIdString)}
                            disabled={isUpdating === reqIdString}
                            className="text-emerald-500 hover:text-emerald-700 transition-colors p-2 rounded-full hover:bg-emerald-50 disabled:opacity-50"
                            title="Mark as Reviewed"
                          >
                            {isUpdating === reqIdString ? (
                              <Loader2 size={18} className="animate-spin" />
                            ) : (
                              <CheckCircle size={18} />
                            )}
                          </button>

                          <button
                            onClick={() => handleDelete(reqIdString)}
                            disabled={isDeleting === reqIdString}
                            className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50 disabled:opacity-50"
                            title="Delete Request"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}

                      {tabType === "reviewed" && (
                        <>
                          <button
                            onClick={() => {
                              const freshReq = requests.find(r => r._id.toString() === reqIdString);
                              const currentReq = freshReq || req;
                              setStatusModalReq(currentReq);
                              setSelectedStatus(currentReq.status || "");
                            }}
                            disabled={isUpdating === reqIdString}
                            className="text-amber-500 hover:text-amber-700 transition-colors p-2 rounded-full hover:bg-amber-50 disabled:opacity-50"
                            title="Update Status"
                          >
                            {isUpdating === reqIdString ? (
                              <Loader2 size={18} className="animate-spin" />
                            ) : (
                              <RefreshCw size={18} />
                            )}
                          </button>
                          
                          <button
                            onClick={() => handleDelete(reqIdString)}
                            disabled={isDeleting === reqIdString}
                            className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50 disabled:opacity-50"
                            title="Delete Request"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {targetDataset.length === 0 ? (
        <div className="px-6 py-14 text-center text-slate-500">
          No POC requests found in this tab.
        </div>
      ) : null}
    </div>
  );

  return (
    <>
      <div className="mt-8 flex justify-start">
        <div className="inline-flex items-center gap-1 rounded-full bg-[#00aeef] p-1.5 shadow-inner">
          <button
            onClick={() => setActiveTab("new")}
            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
              activeTab === "new"
                ? "bg-white text-[#00aeef] shadow-md"
                : "text-white hover:text-sky-100"
            }`}
          >
            New Requests ({newRequests.length})
          </button>
          <button
            onClick={() => setActiveTab("reviewed")}
            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
              activeTab === "reviewed"
                ? "bg-white text-[#00aeef] shadow-md"
                : "text-white hover:text-sky-100"
            }`}
          >
            Reviewed Requests ({reviewedRequests.length})
          </button>
        </div>
      </div>

      <div className="mt-6">
        {activeTab === "new" && renderTable(newRequests, "new")}
        {activeTab === "reviewed" && renderTable(reviewedRequests, "reviewed")}
      </div>

      {/* STATUS UPDATE MODAL */}
      {statusModalReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">Update Request Status</h3>
              <button 
                onClick={() => setStatusModalReq(null)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="mt-3 text-sm text-slate-500">
              Set status for POC Request from <strong>{statusModalReq.fullName || [statusModalReq.firstName, statusModalReq.lastName].filter(Boolean).join(" ")}</strong>.
            </p>

            <div className="mt-5 space-y-3">
              {["under review", "approved", "rejected"].map((statusOption) => (
                <label 
                  key={statusOption} 
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4 cursor-pointer hover:bg-slate-50 transition"
                >
                  <input
                    type="radio"
                    name="requestStatus"
                    value={statusOption}
                    checked={selectedStatus === statusOption}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="h-4 w-4 text-[#00aeef] focus:ring-[#00aeef] border-slate-300"
                  />
                  <span className="text-sm font-semibold capitalize text-slate-800">
                    {statusOption}
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                onClick={() => setStatusModalReq(null)}
                className="rounded-full px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStatusUpdate}
                disabled={isUpdating === statusModalReq._id.toString()}
                className="inline-flex items-center gap-2 rounded-full bg-[#00aeef] px-6 py-2 text-sm font-semibold text-white transition hover:bg-slate-900 disabled:opacity-50"
              >
                {isUpdating === statusModalReq._id.toString() && <Loader2 size={16} className="animate-spin" />}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {viewModalReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">POC Request Details</h3>
              <button 
                onClick={() => setViewModalReq(null)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl text-sm border border-slate-100">
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Full Name</span>
                <span className="font-semibold text-slate-900">{viewModalReq.fullName || [viewModalReq.firstName, viewModalReq.lastName].filter(Boolean).join(" ")}</span>
              </div>
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address</span>
                <span className="text-slate-700">{viewModalReq.email}</span>
              </div>
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Company</span>
                <span className="font-semibold text-slate-900">{viewModalReq.company || "—"}</span>
              </div>
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Industry</span>
                <span className="font-semibold text-slate-900">{viewModalReq.industry || viewModalReq.industries?.[0] || "—"}</span>
              </div>
            </div>

            <div className="mt-4 bg-slate-50 p-4 rounded-2xl text-sm border border-slate-100">
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Message</span>
              <p className="mt-2 whitespace-pre-wrap text-slate-700 leading-6">{viewModalReq.message || "—"}</p>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-200 p-4">
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Current Status</span>
                <span className={`text-sm font-bold uppercase tracking-wide capitalize px-3 py-1 rounded-full inline-block mt-1 ${getStatusBadgeClass(viewModalReq.status || "reviewed")}`}>
                  {viewModalReq.status || "reviewed"}
                </span>
              </div>
              <div className="text-right">
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Last Updated Date</span>
                <span className="text-sm font-medium text-slate-700 mt-1 block">
                  {formatDate(viewModalReq.statusUpdatedAt)}
                </span>
              </div>
            </div>

            {/* Status History Timeline */}
            <div className="mt-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Status History </h4>
              
              {(!viewModalReq.statusHistory || viewModalReq.statusHistory.length === 0) ? (
                <div className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-dashed">
                  No historical logs found. (This record was marked as reviewed using legacy records).
                </div>
              ) : (
                <div className="relative border-l border-slate-200 pl-4 ml-2 space-y-4">
                  {viewModalReq.statusHistory.map((historyItem, idx) => (
                    <div key={idx} className="relative">
                      <span className="absolute -left-[21px] top-1 bg-white border-2 border-[#00aeef] h-3 w-3 rounded-full" />
                      <div className="flex justify-between items-start text-sm">
                        <div>
                          <span className="font-semibold text-slate-800 capitalize">
                            {historyItem.status}
                          </span>
                          {historyItem.updatedBy && (
                            <span className="text-xs text-slate-500 block mt-0.5">
                              by {historyItem.updatedBy}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400">
                          {formatDate(historyItem.updatedAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 border-t border-slate-100 pt-4 text-right">
              <button
                onClick={() => setViewModalReq(null)}
                className="rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Close View Window
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
