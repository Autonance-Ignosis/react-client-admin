import React, { useEffect, useState } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import KVCRequestList, { IKVCRequest } from "../components/kvc/KVCRequestList";
import axios from "axios";

const KVCRequests = () => {
  const [KycRequests, setKycRequests] = useState<IKVCRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKVCRequests = async () => {
      try {
        const response = await axios.get<IKVCRequest[]>(
          "http://localhost:8080/api/kyc/pending"
        );
        const combinedRequests = [...response.data];
        setKycRequests(combinedRequests);
      } catch (e: any) {
        setError("Failed to load KVC requests");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchKVCRequests();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          KYC Pending Request
        </h1>
        <p className="text-muted-foreground">
          Manage and review all customer verification requests
        </p>
      </div>

      <KVCRequestList requests={KycRequests} />
    </div>
  );
};

export default KVCRequests;
