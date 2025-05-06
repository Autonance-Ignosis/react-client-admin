import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';
import RequestStatusBadge from './RequestStatusBadge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { FileText } from 'lucide-react';
import { Separator } from '@radix-ui/react-separator';
import DocumentPreview from './renderDocumentPreview';
import { IKVCRequest } from './KVCRequestList';

export interface IKVCDetail {
  id: string;
  requestId: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  idType: string;
  idNumber: string;
  submittedDate: string;
  status: 'VERIFIED' | 'PENDING' | 'REJECTED';
  documents: {
    idProof: string;
    addressProof: string;
    photo: string;
    signature: string;
  };
}

interface KVCDetailViewProps {
  onBack: () => void;
  onStatusChange: (id: string, status: 'VERIFIED' | 'REJECTED', comments?: string) => void;
  kycUserDetail: IKVCDetail | null;
  kycDetail: IKVCRequest | null;
}

const KVCDetailView: React.FC<KVCDetailViewProps> = ({ onBack, onStatusChange, kycUserDetail, kycDetail }) => {
  const { id } = useParams<{ id: string }>(); // Get the id from the URL params
  const [comments, setComments] = useState('');
  const [openDialog, setOpenDialog] = useState<'approve' | 'reject' | null>(null);
  const [activeTab, setActiveTab] = useState("details");
  const { toast } = useToast();


  const handleApprove = () => {
    if (kycUserDetail) {
      onStatusChange(kycUserDetail.id, 'VERIFIED', comments);
      toast({
        title: "Request Approved",
        description: `KVC request ${kycUserDetail.requestId} has been approved successfully.`,
      });
      setOpenDialog(null);
      setComments('');
    }
  };

  const handleReject = () => {
    if (kycUserDetail) {
      onStatusChange(kycUserDetail.id, 'REJECTED', comments);
      toast({
        title: "Request Rejected",
        description: `KVC request ${kycUserDetail.requestId} has been rejected.`,
      });
      setOpenDialog(null);
      setComments('');
    }
  };

  const handleAutomateKycVerification = async () => {
    try {
      const panImageUrl = kycDetail.panFileUrl;

      const response1 = await axios.post('http://localhost:5000/kyc/pan', {
        url: panImageUrl
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const { message, pan_number } = response1.data;

      if (!pan_number) {
        console.error("PAN number could not be extracted.");
        return;
      }

      const response2 = await axios.post("http://localhost:8082/api/kyc/validate-pan", {
        pan: pan_number
      });

      const { statusCode, isAadhaarLinked } = response2.data;

      if (statusCode === 101 && isAadhaarLinked) {
        console.log("✅ PAN is valid and Aadhaar is linked.");

        const userId = kycDetail.userId;
        const status = "VERIFIED";
        const remarks = "Auto-verified as PAN is valid and Aadhaar is linked.";

        try {
          const updateResponse = await axios.put(`http://localhost:8082/api/kyc/update/${userId}`, null, {
            params: {
              status: status,
              remarks: remarks
            }
          });
          console.log("✅ KYC status updated:", updateResponse.data);
        } catch (err) {
          console.error("❌ Failed to update KYC status:", err);
        }
      } else {
        const userId = kycDetail.userId;
        const status = "REJECTED";
        const remarks = "PAN Card or AadhaarCard is Invalid";

        try {
          const updateResponse = await axios.put(`http://localhost:8082/api/kyc/update/${userId}`, null, {
            params: {
              status: status,
              remarks: remarks
            }
          });
          console.log("✅ KYC status updated:", updateResponse.data);
        } catch (err) {
          console.error("❌ Failed to update KYC status:", err);
        }
      }



    } catch (error) {
      console.error("Error during automated KYC verification:", error);
    }
  };


  if (!kycUserDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">KVC Request Details</h2>
          <p className="text-muted-foreground">Request ID: {kycUserDetail.requestId}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onBack}>
            Back to All Requests
          </Button>
          {activeTab === 'documents' && (
            <Button variant="secondary" onClick={handleAutomateKycVerification}>
              Verify KYC
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium">{kycUserDetail.name}</h3>
        </div>
        <RequestStatusBadge status={kycUserDetail.status} />
      </div>

      <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="details" className="flex-1 sm:flex-initial">Personal Details</TabsTrigger>
          <TabsTrigger value="documents" className="flex-1 sm:flex-initial">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Applicant Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{kycUserDetail.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Email Address</p>
                <p className="font-medium">{kycUserDetail.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="font-medium">{kycUserDetail.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Date of Birth</p>
                <p className="font-medium">{kycUserDetail.dateOfBirth}</p>
              </div>
            </CardContent>

            <Separator />

            <CardHeader>
              <CardTitle className="text-lg">Address Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="space-y-1 md:col-span-2">
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">{kycUserDetail.address}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">City</p>
                <p className="font-medium">{kycUserDetail.city}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">State</p>
                <p className="font-medium">{kycUserDetail.state}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Zip Code</p>
                <p className="font-medium">{kycUserDetail.zipCode}</p>
              </div>
            </CardContent>

            <Separator />

            <CardHeader>
              <CardTitle className="text-lg">Identification Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">ID Type</p>
                <p className="font-medium">{kycUserDetail.idType}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">ID Number</p>
                <p className="font-medium">{kycUserDetail.idNumber}</p>
              </div>
            </CardContent>

            <Separator />

            <CardHeader>
              <CardTitle className="text-lg">Request Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Submitted Date</p>
                <p className="font-medium">{kycUserDetail.submittedDate}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Request ID</p>
                <p className="font-medium">{kycUserDetail.requestId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Current Status</p>
                <RequestStatusBadge status={kycUserDetail.status} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center">
                  <FileText className="mr-2" size={20} />
                  Submitted Documents
                </div>
              </CardTitle>
              <CardDescription>
                Verification documents submitted by the applicant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                <DocumentPreview
                  documentUrl={kycUserDetail.documents.idProof}
                  title="PAN Card"
                />
                <DocumentPreview
                  documentUrl={kycUserDetail.documents.addressProof}
                  title="Aadhaar Card"
                />
                {/* <DocumentPreview
                documentUrl={kycUserDetail.documents.photo}
                title="Photograph"
              />
              <DocumentPreview
                documentUrl={kycUserDetail.documents.signature}
                title="Signature"
              /> */}

              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KVCDetailView;
