'use client';

import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

function BaseModal({ triggerLabel, children }: { triggerLabel: React.ReactNode; children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger className="w-full">{triggerLabel}</DialogTrigger>
      <DialogContent className="bg-modal border-none rounded-[15px] ring-1 ring-white/5 flex flex-col items-center">
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default BaseModal;
