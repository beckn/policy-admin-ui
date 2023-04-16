export interface IFormInput {
  name: string;
  type: string;
  owner: string;
  description: string;
  country: string;
  city: string;
  policyDocuments: string;
  applicableTo: string | string[];
  rules: string;
  startDate: string;
  endDate: string;
  contactEmail: string;
  domain: string;
  polygon: string[];
  status: string;
  createdBy: string;
}

export const policyTypes = ["Geofence", "Privacy", "Alcohol"];

export const anotherNames = ["BAP", "BPP"];
