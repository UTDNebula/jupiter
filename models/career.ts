enum Career {
  Healthcare,
  ArtAndMusic,
  Engineering,
  Business,
  Sciences,
  PublicService,
}
export default Career;

export const toCareer = (
  career: FormDataEntryValue | null | string,
): Career | undefined => {
  switch (career) {
    case 'Healthcare':
      return Career.Healthcare;
    case 'Art and Music':
      return Career.ArtAndMusic;
    case 'Engineering':
      return Career.Engineering;
    case 'Business':
      return Career.Business;
    case 'Sciences':
      return Career.Sciences;
    case 'Public Service':
      return Career.PublicService;
    default:
      return undefined;
  }
};

// Returns the careers as a string array
export const getCareers = (): string[] => {
  return [
    'Healthcare',
    'Art and Music',
    'Engineering',
    'Business',
    'Sciences',
    'Public Service',
  ];
};
