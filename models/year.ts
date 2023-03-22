enum Year {
  freshman,
  sophomore,
  junior,
  senior,
  grad_student,
}
export default Year;

export const toYear = (
  year: FormDataEntryValue | null | string,
): Year | undefined => {
  switch (year) {
    case 'Freshman':
      return Year.freshman;
    case 'Sophomore':
      return Year.sophomore;
    case 'Junior':
      return Year.junior;
    case 'Senior':
      return Year.senior;
    case 'Grad Student':
      return Year.grad_student;
    default:
      return undefined;
  }
};

// Returns the years as a string array
export const getYears = (): string[] => {
  return ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Grad Student'];
};

export const fromNumber = (year: number): Year | undefined => {
  switch (year) {
    case 0:
      return Year.freshman;
    case 1:
      return Year.sophomore;
    case 2:
      return Year.junior;
    case 3:
      return Year.senior;
    case 4:
      return Year.grad_student;
    default:
      return undefined;
  }
};
