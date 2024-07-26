import { useState } from "react";

function useDisclosure() {
  const [open, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };
  return { open, onOpen, onClose } as const;
}

export default useDisclosure;
