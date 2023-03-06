import { create } from "zustand";

export interface IFormPolicy {
  policyName: string;
  policyType: string;
  policyOwner: string;
  description: string;
  country: string;
  city: string;
  policyDocument: string;
  applicableTo: string | string[];
  rules: any;
  startDate: string;
  endDate: string;
  polygon: string[];
  updatePolicyName: (newPolicyName: string) => void;
  updatePolicyType: (newPolicyType: string) => void;
  updatePolicyOwner: (newPolicyOwner: string) => void;
  updateDescription: (newDescription: string) => void;
  updateCountry: (newCountry: string) => void;
  updateCity: (newCity: string) => void;
  updatePolicyDocument: (newPolicyDocument: string) => void;
  updateApplicableTo: (newApplicableTo: string | string[]) => void;
  updateRules: (newRules: string) => void;
  updateStartDate: (newStartDate: string) => void;
  updateEndDate: (newEndDate: string) => void;
  updatePolygon: (newPolygon: any) => void;
}

export const usePolicyForm = create<IFormPolicy>((set) => ({
  policyName: "",
  policyType: "",
  policyOwner: "",
  description: "",
  country: "",
  city: "",
  policyDocument: "",
  applicableTo: "",
  rules: null,
  startDate: "",
  endDate: "",
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
  updatePolicyDocument: (newPolicyDocument: string) =>
    set({ policyDocument: newPolicyDocument }),
  updateApplicableTo: (newApplicableTo: string | string[]) =>
    set({ applicableTo: newApplicableTo }),
  updateRules: (newRules: any) => set({ rules: newRules }),
  updateStartDate: (newStartDate: string) => set({ startDate: newStartDate }),
  updateEndDate: (newEndDate: string) => set({ endDate: newEndDate }),
  updatePolygon: (newPolygon: any) => set({ polygon: newPolygon }),
}));
