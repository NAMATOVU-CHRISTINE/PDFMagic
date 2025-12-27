type ClassValue = string | number | boolean | undefined | null | ClassValue[];

export function classNames(...classes: ClassValue[]): string {
  return classes
    .flat()
    .filter(Boolean)
    .join(' ');
}

export default classNames;
