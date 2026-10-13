"use client";

import { createContext, useContext } from "react";

export type PreviewTab = "feed" | "search" | "venue" | "offer" | "passport";

type UI = {
  openPreview: (tab: PreviewTab, opener?: HTMLElement | null, venueId?: string) => void;
  openPartner: (opener?: HTMLElement | null) => void;
  goToWaitlist: () => void;
};

export const UIContext = createContext<UI>({
  openPreview: () => {},
  openPartner: () => {},
  goToWaitlist: () => {},
});

export const useUI = () => useContext(UIContext);
