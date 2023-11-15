function userLeaveFormData(data) {
  return data.map((item) => {
    return {
      id: item.id, // Assuming 'id' is a unique identifier in your data
      leaveName: item.leaveProfile?.leaveName,
      dateAmount: item.dateAmount,
    };
  });
}

export default userLeaveFormData;
