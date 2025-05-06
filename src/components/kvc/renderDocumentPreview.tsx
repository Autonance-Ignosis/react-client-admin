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
      <CardContent className="bg-gray-100 rounded-md flex items-center justify-between h-48 px-4">
        {documentUrl ? (
          <>
            <a
              href={documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm break-all underline max-w-[85%]"
            >
              {documentUrl}
            </a>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleCopy}
              className="hover:bg-muted p-2"
            >
              <ClipboardCopy className="w-4 h-4" />
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
