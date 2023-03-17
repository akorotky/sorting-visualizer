// type for generator functions
type AnimationGeneratorFunction = (arr: number[]) => AnimationGenerator;

// type for the yield/return/next value of the generator functions
type AnimationGenerator = Generator<
  TAnimation,
  number | void | undefined,
  any | undefined
>;

type TAnimation = {
  toColor?: [number, string][]; // index, color
  toReplace?: [number, number][]; // index, new value
  toClear?: number[]; // indices
};

type SelectOption = {
  label: string;
  value: string | number;
};

type SelectProps = {
  options: SelectOption[];
  value: SelectOption;
  onChange: (value: SelectOption) => void;
  disabled: boolean;
};

type TAlgorithmsMap = { [key: string]: AnimationGeneratorFunction };

export type {
  AnimationGenerator,
  TAnimation,
  AnimationGeneratorFunction,
  SelectProps,
  SelectOption,
  TAlgorithmsMap,
};
