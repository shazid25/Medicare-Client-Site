// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { FaSearch, FaFilter, FaCheck, FaTimes, FaEye, FaTrash, FaUser, FaHospital, FaCalendar, FaPhone, FaMapMarkerAlt, FaIdCard, FaBusinessTime, FaDollarSign, FaFilePdf, FaDownload, FaEnvelope, FaClock, FaCheckCircle, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa';

// const SellerApplicationsAdmin = () => {
//   const { axiosSecure } = useAxiosSecure();
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedApplication, setSelectedApplication] = useState(null);
//   const [viewMode, setViewMode] = useState('table');
//   const [filters, setFilters] = useState({
//     status: 'all',
//     search: ''
//   });

//   // Fetch applications
//   const fetchApplications = async () => {
//     try {
//       setLoading(true);
//       const res = await axiosSecure.get("/admin/seller-applications");
//       if (res.data.success) {
//         setApplications(res.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching applications:", error);
//       Swal.fire("Error", "Failed to fetch applications", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   // Filter applications
//   const filteredApplications = applications.filter(app => {
//     const matchesStatus = filters.status === 'all' || app.status === filters.status;
//     const matchesSearch = 
//       app.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
//       app.email?.toLowerCase().includes(filters.search.toLowerCase()) ||
//       app.businessName?.toLowerCase().includes(filters.search.toLowerCase());
//     return matchesStatus && matchesSearch;
//   });

//   // Approve application
//   const handleApprove = async (id, userEmail) => {
//     try {
//       const result = await Swal.fire({
//         title: 'Approve Application?',
//         text: 'This will grant seller privileges to this user.',
//         icon: 'question',
//         showCancelButton: true,
//         confirmButtonColor: '#10B981',
//         cancelButtonColor: '#6B7280',
//         confirmButtonText: 'Yes, Approve',
//         cancelButtonText: 'Cancel'
//       });

//       if (result.isConfirmed) {
//         const res = await axiosSecure.patch(`/admin/seller-applications/${id}`, {
//           action: "approve",
//           userEmail: userEmail,
//           notes: "Application approved by admin"
//         });

//         if (res.data.success) {
//           Swal.fire("Approved!", res.data.message, "success");
//           fetchApplications();
//           setViewMode('table');
//         }
//       }
//     } catch (error) {
//       console.error("Error approving application:", error);
//       Swal.fire("Error", "Failed to approve application", "error");
//     }
//   };

//   // Reject application
//   const handleReject = async (id, userEmail) => {
//     try {
//       const { value: reason } = await Swal.fire({
//         title: 'Reject Application',
//         input: 'textarea',
//         inputLabel: 'Reason for rejection',
//         inputPlaceholder: 'Please provide a reason for rejection...',
//         showCancelButton: true,
//         confirmButtonColor: '#EF4444',
//         cancelButtonColor: '#6B7280',
//         confirmButtonText: 'Reject Application',
//         cancelButtonText: 'Cancel',
//         inputValidator: (value) => {
//           if (!value) return 'Please provide a reason for rejection';
//         }
//       });

//       if (reason) {
//         const res = await axiosSecure.patch(`/admin/seller-applications/${id}`, {
//           action: "reject",
//           userEmail: userEmail,
//           notes: reason
//         });

//         if (res.data.success) {
//           Swal.fire("Rejected!", res.data.message, "success");
//           fetchApplications();
//           setViewMode('table');
//         }
//       }
//     } catch (error) {
//       console.error("Error rejecting application:", error);
//       Swal.fire("Error", "Failed to reject application", "error");
//     }
//   };

//   // Delete application
//   const handleDelete = async (id) => {
//     try {
//       const result = await Swal.fire({
//         title: 'Delete Application?',
//         text: 'This action cannot be undone. All application data will be permanently removed.',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#EF4444',
//         cancelButtonColor: '#6B7280',
//         confirmButtonText: 'Yes, Delete',
//         cancelButtonText: 'Cancel'
//       });

//       if (result.isConfirmed) {
//         const res = await axiosSecure.delete(`/admin/seller-applications/${id}`);
        
//         if (res.data.success) {
//           Swal.fire("Deleted!", "Application has been deleted.", "success");
//           fetchApplications();
//           setViewMode('table');
//         }
//       }
//     } catch (error) {
//       console.error("Error deleting application:", error);
//       Swal.fire("Error", "Failed to delete application", "error");
//     }
//   };

//   // View application details
//   const viewDetails = (application) => {
//     setSelectedApplication(application);
//     setViewMode('detail');
//   };

//   // Get status badge style
//   const getStatusBadge = (status) => {
//     const styles = {
//       pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
//       approved: 'bg-green-100 text-green-800 border-green-200',
//       rejected: 'bg-red-100 text-red-800 border-red-200'
//     };
//     return styles[status] || 'bg-gray-100 text-gray-800 border-gray-200';
//   };

//   // Statistics
//   const stats = {
//     total: applications.length,
//     pending: applications.filter(app => app.status === 'pending').length,
//     approved: applications.filter(app => app.status === 'approved').length,
//     rejected: applications.filter(app => app.status === 'rejected').length
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading applications...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Seller Applications</h1>
//           <p className="text-gray-600">Manage and review seller applications</p>
//         </div>

//         {/* Statistics */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center">
//               <div className="bg-blue-100 p-3 rounded-full">
//                 <FaUser className="text-blue-600 text-xl" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Total</p>
//                 <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center">
//               <div className="bg-yellow-100 p-3 rounded-full">
//                 <FaClock className="text-yellow-600 text-xl" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Pending</p>
//                 <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center">
//               <div className="bg-green-100 p-3 rounded-full">
//                 <FaCheck className="text-green-600 text-xl" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Approved</p>
//                 <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center">
//               <div className="bg-red-100 p-3 rounded-full">
//                 <FaTimes className="text-red-600 text-xl" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Rejected</p>
//                 <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-lg shadow mb-6 p-6">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <FaSearch className="absolute left-3 top-3 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search by name, email, or business..."
//                   value={filters.search}
//                   onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>
//             <select
//               value={filters.status}
//               onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">All Status</option>
//               <option value="pending">Pending</option>
//               <option value="approved">Approved</option>
//               <option value="rejected">Rejected</option>
//             </select>
//           </div>
//         </div>

//         {/* Applications Table */}
//         {viewMode === 'table' && (
//           <div className="bg-white rounded-lg shadow overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Business</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredApplications.map((app) => (
//                     <tr key={app._id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
//                             <FaUser className="text-blue-600" />
//                           </div>
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-gray-900">{app.name}</div>
//                             <div className="text-sm text-gray-500 flex items-center">
//                               <FaEnvelope className="mr-1 text-xs" />
//                               {app.userEmail}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900 font-medium">{app.businessName}</div>
//                         <div className="text-sm text-gray-500">{app.pharmacyType}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
//                         {app.pharmacyType?.replace('_', ' ') || 'N/A'}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {new Date(app.appliedAt).toLocaleDateString()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(app.status)}`}>
//                           {app.status === 'pending' && <FaHourglassHalf className="mr-1" />}
//                           {app.status === 'approved' && <FaCheckCircle className="mr-1" />}
//                           {app.status === 'rejected' && <FaTimesCircle className="mr-1" />}
//                           {app.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex space-x-2">
//                           <button
//                             onClick={() => viewDetails(app)}
//                             className="text-blue-600 hover:text-blue-900 flex items-center"
//                           >
//                             <FaEye className="mr-1" />
//                             View
//                           </button>
                          
//                           {app.status === 'pending' && (
//                             <>
//                               <button
//                                 onClick={() => handleApprove(app._id, app.userEmail)}
//                                 className="text-green-600 hover:text-green-900 flex items-center"
//                               >
//                                 <FaCheck className="mr-1" />
//                                 Approve
//                               </button>
//                               <button
//                                 onClick={() => handleReject(app._id, app.userEmail)}
//                                 className="text-red-600 hover:text-red-900 flex items-center"
//                               >
//                                 <FaTimes className="mr-1" />
//                                 Reject
//                               </button>
//                             </>
//                           )}
                          
//                           <button
//                             onClick={() => handleDelete(app._id)}
//                             className="text-gray-600 hover:text-gray-900 flex items-center"
//                           >
//                             <FaTrash className="mr-1" />
//                             Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
              
//               {filteredApplications.length === 0 && (
//                 <div className="text-center py-12">
//                   <FaUser className="mx-auto text-4xl text-gray-300 mb-4" />
//                   <p className="text-gray-500 text-lg">No applications found</p>
//                   <p className="text-gray-400 text-sm">Try adjusting your filters</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Application Detail View */}
//         {viewMode === 'detail' && selectedApplication && (
//           <div className="bg-white rounded-lg shadow">
//             <div className="p-6 border-b">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
//                 <button
//                   onClick={() => setViewMode('table')}
//                   className="text-gray-600 hover:text-gray-900"
//                 >
//                   ← Back to List
//                 </button>
//               </div>
//             </div>

//             <div className="p-6">
//               {/* Application Header */}
//               <div className="bg-gray-50 rounded-lg p-6 mb-6">
//                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900">{selectedApplication.businessName}</h3>
//                     <p className="text-gray-600 capitalize">{selectedApplication.pharmacyType?.replace('_', ' ')}</p>
//                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusBadge(selectedApplication.status)}`}>
//                       Status: {selectedApplication.status}
//                     </span>
//                   </div>
//                   <div className="mt-4 md:mt-0 text-right">
//                     <p className="text-sm text-gray-600">Applied on</p>
//                     <p className="text-gray-900 font-medium">
//                       {new Date(selectedApplication.appliedAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Personal Information */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div>
//                   <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
//                   <div className="space-y-3">
//                     <div><label className="text-sm font-medium text-gray-600">Full Name</label><p className="text-gray-900">{selectedApplication.name}</p></div>
//                     <div><label className="text-sm font-medium text-gray-600">Email</label><p className="text-gray-900">{selectedApplication.userEmail}</p></div>
//                     <div><label className="text-sm font-medium text-gray-600">Phone</label><p className="text-gray-900">{selectedApplication.phone}</p></div>
//                     <div><label className="text-sm font-medium text-gray-600">Date of Birth</label><p className="text-gray-900">{selectedApplication.dateOfBirth}</p></div>
//                   </div>
//                 </div>

//                 <div>
//                   <h4 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h4>
//                   <div className="space-y-3">
//                     <div><label className="text-sm font-medium text-gray-600">Residential Address</label><p className="text-gray-900">{selectedApplication.address}</p></div>
//                     <div><label className="text-sm font-medium text-gray-600">Business Address</label><p className="text-gray-900">{selectedApplication.businessAddress}</p></div>
//                   </div>
//                 </div>
//               </div>

//               {/* Business Information */}
//               <div className="mb-6">
//                 <h4 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <div><label className="text-sm font-medium text-gray-600">Years in Business</label><p className="text-gray-900">{selectedApplication.yearsInBusiness}</p></div>
//                   <div><label className="text-sm font-medium text-gray-600">Sales Volume</label><p className="text-gray-900">{selectedApplication.salesVolume}</p></div>
//                   <div><label className="text-sm font-medium text-gray-600">Tax ID</label><p className="text-gray-900">{selectedApplication.taxId}</p></div>
//                 </div>
//                 <div className="mt-4">
//                   <label className="text-sm font-medium text-gray-600">Business Description</label>
//                   <p className="text-gray-900 mt-1 bg-gray-50 p-3 rounded-lg">{selectedApplication.businessDescription}</p>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               {selectedApplication.status === 'pending' && (
//                 <div className="flex space-x-4 pt-6 border-t">
//                   <button
//                     onClick={() => handleApprove(selectedApplication._id, selectedApplication.userEmail)}
//                     className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700"
//                   >
//                     Approve Application
//                   </button>
//                   <button
//                     onClick={() => handleReject(selectedApplication._id, selectedApplication.userEmail)}
//                     className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700"
//                   >
//                     Reject Application
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SellerApplicationsAdmin;






import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SellerApplicationsAdmin = () => {
  const { axiosSecure } = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🔄 Fetching seller applications...");
      
      const res = await axiosSecure.get("/admin/seller-applications");
      console.log("📥 Response:", res.data);
      
      if (res.data.success) {
        setApplications(res.data.data || []);
        console.log(`✅ Loaded ${res.data.data?.length || 0} applications`);
      } else {
        setError(res.data.message || "Failed to fetch applications");
      }
    } catch (error) {
      console.error("❌ Error fetching applications:", error);
      setError(error.response?.data?.message || error.message || "Failed to fetch applications");
      Swal.fire("Error", "Failed to fetch applications", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleAction = async (id, userEmail, action) => {
    try {
      let confirmText = action === "approve" 
        ? "Are you sure you want to approve this application?" 
        : "Are you sure you want to reject this application?";
      
      const result = await Swal.fire({
        title: `${action === "approve" ? "Approve" : "Reject"} Application?`,
        text: confirmText,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: action === "approve" ? "#10B981" : "#EF4444",
        cancelButtonColor: "#6B7280",
        confirmButtonText: `Yes, ${action === "approve" ? "Approve" : "Reject"}`,
        cancelButtonText: "Cancel"
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/admin/seller-applications/${id}`, {
          action,
          userEmail,
          notes: action === "reject" ? "Rejected by admin" : "Approved by admin"
        });

        if (res.data.success) {
          Swal.fire("Success", res.data.message, "success");
          fetchApplications(); // Reload the list
        }
      }
    } catch (error) {
      console.error(`Error ${action}ing application:`, error);
      Swal.fire("Error", `Failed to ${action} application`, "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Delete Application?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#EF4444",
        cancelButtonColor: "#6B7280",
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "Cancel"
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/admin/seller-applications/${id}`);
        
        if (res.data.success) {
          Swal.fire("Deleted!", res.data.message, "success");
          fetchApplications(); // Reload the list
        }
      }
    } catch (error) {
      console.error("Error deleting application:", error);
      Swal.fire("Error", "Failed to delete application", "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
          <button 
            onClick={fetchApplications}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Seller Applications</h1>
        <button 
          onClick={fetchApplications}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>
      
      <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
        <div className="mb-4">
          <p className="text-gray-600">
            Total Applications: <span className="font-bold">{applications.length}</span>
          </p>
        </div>
        
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Business</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Applied Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No applications found
                </td>
              </tr>
            ) : (
              applications.map(app => (
                <tr key={app._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{app.name || "N/A"}</td>
                  <td className="p-2 border">{app.userEmail}</td>
                  <td className="p-2 border">{app.businessName || "N/A"}</td>
                  <td className="p-2 border capitalize">
                    {app.pharmacyType ? app.pharmacyType.replace('_', ' ') : "N/A"}
                  </td>
                  <td className="p-2 border">
                    {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="p-2 border">
                    <span className={`px-2 py-1 rounded text-sm ${
                      app.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                      app.status === "approved" ? "bg-green-100 text-green-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-2 border space-x-2">
                    {app.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleAction(app._id, app.userEmail, "approve")}
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(app._id, app.userEmail, "reject")}
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(app._id)}
                      className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerApplicationsAdmin;