export const enum Career {
  Healthcare,
  ArtAndMusic,
  Engineering,
  Business,
  Sciences,
  PublicService,
}

const careerMap: Record<string, Career> = {
  Healthcare: Career.Healthcare,
  'Art and Music': Career.ArtAndMusic,
  Engineering: Career.Engineering,
  Business: Career.Business,
  Sciences: Career.Sciences,
  'Public Service': Career.PublicService,
};

export const toCareer = (
  career: FormDataEntryValue | null | string,
): Career | undefined => {
  if (typeof career === 'string' && career in careerMap) {
    return careerMap[career];
  }
  return undefined;
};

export const getCareers = (): string[] => {
  return Object.keys(careerMap);
};
