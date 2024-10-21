export const validatePercentage = (participants) => {
  const totalPercentage = participants.reduce((acc, participant) => acc + participant.percentage, 0);
  return totalPercentage === 100;
};
