function transformData(data) {
  return data.map((item) => {
    return {
      id: item.id, // Assuming 'id' is a unique identifier in your data
      name: item.companyName,
      companyName: item.companyName,
      isActive: item.isActive.toString(), // Convert boolean to string if needed
      packageId: item.packageId,
      status: item.status || "Pending", // Assuming 'status' exists, otherwise default to "Pending"
    };
  });
}

export default transformData;
