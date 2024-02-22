import { Dayjs } from "dayjs";
import { create } from "zustand";

export interface IFormPolicy {
  policyName: string;
  policyType: string;
  policyOwner: string;
  description: string;
  country: string;
  city: string;
  policyDocuments: string;
  applicableTo: string | string[];
  rules: any;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  polygon: string[];
  updatePolicyName: (newPolicyName: string) => void;
  updatePolicyType: (newPolicyType: string) => void;
  updatePolicyOwner: (newPolicyOwner: string) => void;
  updateDescription: (newDescription: string) => void;
  updateCountry: (newCountry: string) => void;
  updateCity: (newCity: string) => void;
  updatepolicyDocuments: (newpolicyDocuments: string) => void;
  updateApplicableTo: (newApplicableTo: string | string[]) => void;
  updateRules: (newRules: string) => void;
  updateStartDate: (newStartDate: any) => void;
  updateEndDate: (newEndDate: any) => void;
  updatePolygon: (newPolygon: any) => void;
}

export const usePolicyForm = create<IFormPolicy>((set) => ({
  policyName: "",
  policyType: "",
  policyOwner: "",
  description: "",
  country: "",
  city: "",
  policyDocuments: "",
  applicableTo: "",
  rules: null,
  startDate: null,
  endDate: null,
  polygon: [],
  updatePolicyName: (newPolicyName: string) =>
    set({ policyName: newPolicyName }),
  updatePolicyType: (newPolicyType: string) =>
    set({ policyType: newPolicyType }),
  updatePolicyOwner: (newPolicyOwner: string) =>
    set({ policyOwner: newPolicyOwner }),
  updateDescription: (newDescription: string) =>
    set({ description: newDescription }),
  updateCountry: (newCountry: string) => set({ country: newCountry }),
  updateCity: (newCity: string) => set({ city: newCity }),
  updatepolicyDocuments: (newpolicyDocuments: string) =>
    set({ policyDocuments: newpolicyDocuments }),
  updateApplicableTo: (newApplicableTo: string | string[]) =>
    set({ applicableTo: newApplicableTo }),
  updateRules: (newRules: any) => set({ rules: newRules }),
  updateStartDate: (newStartDate: Dayjs | null) =>
    set({ startDate: newStartDate }),
  updateEndDate: (newEndDate: Dayjs | null) => set({ endDate: newEndDate }),
  updatePolygon: (newPolygon: any) => set({ polygon: newPolygon }),
}));
