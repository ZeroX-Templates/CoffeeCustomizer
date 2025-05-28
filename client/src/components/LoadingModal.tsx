import { Dialog, DialogContent } from "@/components/ui/dialog";

interface LoadingModalProps {
  isOpen: boolean;
}

export function LoadingModal({ isOpen }: LoadingModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="text-center border-none bg-white/95 backdrop-blur-sm">
        <div className="loading-spinner mx-auto mb-4" />
        <p className="text-coffee-800 font-semibold">Loading your favorite recipe...</p>
      </DialogContent>
    </Dialog>
  );
}
