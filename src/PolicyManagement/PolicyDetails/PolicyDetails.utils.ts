export const payloadForBrodcast = (policyDetails: any, status: string) => {
  return {
    context: {
      action: "broadcast",
      domain: "mobility",
      country: "India",
      city: "Pune",
      version: "1.0.0",
    },
    policy: {
      id: policyDetails.id,
      domain: policyDetails.domain,
      type: policyDetails.type,
      country: policyDetails.country,
      city: policyDetails.city,
      name: policyDetails.name,
      description: policyDetails.description,
      owner: policyDetails.owner,
      contactEmail: policyDetails.email,
      startDate: policyDetails.startDate,
      endDate: policyDetails.endDate,
      applicableTo: policyDetails.applicableTo,
      polygon: policyDetails.polygon,
      status: status,
      createdBy: "Rahul Choudhary",
    },
  };
};

export const payloadForBrodcastUpdate = (
  policyDetails: any,
  status: string
) => {
  return {
    context: {
      action: "broadcast",
      domain: "mobility",
      country: "India",
      city: "Pune",
      version: "1.0.0",
    },
    message: {
      policy: {
        id: policyDetails.id,
        status: status,
      },
    },
  };
};

export const getStatusDrodpwnItems = (
  statusDetails: string,
  setStatusDetailArray: Function
) => {
  if (statusDetails === "Publish") {
    return setStatusDetailArray(["Publish", "Inactive"]);
  }
  if (statusDetails == "Inactive") {
    return setStatusDetailArray(["Inactive", "Active"]);
  }
  return setStatusDetailArray(["Active", "Publish", "Inactive"]);
};
