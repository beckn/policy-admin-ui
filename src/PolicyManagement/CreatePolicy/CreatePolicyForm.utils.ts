export interface IFormInput {
  name: string;
  type: string;
  owner: string;
  description: string;
  country: string;
  city: string;
  policyDocument: string;
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

export const policyTypes = ["Geofence"];

export const anotherNames = ["BAP", "BPP", "BG"];
