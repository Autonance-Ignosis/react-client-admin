import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardCopy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DocumentPreview: React.FC<{ documentUrl: string; title: string }> = ({ documentUrl, title }) => {
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(documentUrl);
      toast({
        title: "Copied to Clipboard",
        description: "The document URL has been copied.",
      });
    } catch (err) {
      toast({
        title: "Failed to Copy",
        description: "Could not copy the URL. Try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center bg-gray-100 rounded-md p-4">
        {documentUrl ? (
          <>
            <div className="mb-4">
              <img
                src={documentUrl}
                alt={title}
                className="w-full h-auto max-w-[300px] max-h-[200px] object-contain rounded-md shadow-md"
              />
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              className="w-full sm:w-auto text-sm flex items-center justify-center gap-2 p-2"
            >
              <ClipboardCopy className="w-4 h-4" />
              Copy URL
            </Button>
          </>
        ) : (
          <p className="text-muted-foreground text-sm text-center w-full">No document available</p>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentPreview;
