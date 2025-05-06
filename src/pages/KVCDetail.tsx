import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../components/layout/AdminLayout';
import KVCDetailView from '../components/kvc/KVCDetailView';
import { IKVCDetail } from '../components/kvc/KVCDetailView';
import { IKVCRequest } from '../components/kvc/KVCRequestList';

import axios from 'axios';

const KVCDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [kvcUserDetail, setKvcUserDetail] = useState<IKVCDetail | null>(null);
  const [kvcDetail, setKvcDetail] = useState<IKVCRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response1 = await axios.get(`http://localhost:8080/api/user/${id}`);
          const userData = response1.data;

          const response2 = await axios.get(`http://localhost:8082/api/kyc/status/${id}`);
          const kycdata = response2.data;

          setKvcUserDetail({
            id: userData.id?.toString() || 'Not Provided',
            requestId: `REQ-${userData.id || 'Not Provided'}`,
            name: userData.fullName || 'Not Provided',
            email: userData.email || 'Not Provided',
            phone: userData.phone || 'Not Provided',
            dateOfBirth: userData.dateOfBirth || 'Not Provided',
            address: userData.address || 'Not Provided',
            city: userData.city || 'Not Provided',
            state: userData.state || 'Not Provided',
            zipCode: userData.zipCode || 'Not Provided',
            idType: userData.idType || 'Not Provided',
            idNumber: userData.idNumber || 'Not Provided',
            submittedDate: userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'Not Provided',
            status: userData.kycStatus as 'VERIFIED' | 'PENDING' | 'REJECTED',
            documents: {
              idProof: kycdata.panFileUrl || 'Not Provided',
              addressProof: kycdata.aadhaarFileUrl || 'Not Provided',
              photo: kycdata.panFileUrl || 'Not Provided',
              signature: kycdata.panFileUrl || 'Not Provided',
            }
          });

          setKvcDetail(kycdata);

        } catch (error) {
          console.error('Error fetching KYC details:', error);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleBack = () => {
    navigate('/kvc-requests');
  };

  const handleStatusChange = (id: string, status: 'VERIFIED' | 'REJECTED', comments?: string) => {
    console.log(`Status change for ${id}: ${status}, Comments: ${comments}`);

    if (kvcUserDetail) {
      setKvcUserDetail({
        ...kvcUserDetail,
        status,
      });
    }
  };

  if (loading) {
    return (
      // <AdminLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
      // </AdminLayout>
    );
  }

  return (
    <div>
      {kvcUserDetail && (
        <KVCDetailView
          kycUserDetail={kvcUserDetail}
          onBack={handleBack}
          onStatusChange={handleStatusChange}
          kycDetail={kvcDetail}
        />
      )}
    </div>
  );
};

export default KVCDetail;
