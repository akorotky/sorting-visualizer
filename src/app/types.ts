// type for generator functions
type GenFunction = (arr: number[]) => AnimationGenerator;

// type for the yield/return/next value of the generator functions
type AnimationGenerator = Generator<
  AnimationDispatcher,
  number | void | undefined,
  any | undefined
>;

interface AnimationDispatcher {
  toColor?: [number, string][]; // index, color
  toReplace?: [number, number][]; // index, new value
  toClear?: number[]; // indices
}

function colorIndices(indexColorPairs: [number, string][]) {
  return { toColor: indexColorPairs } as AnimationDispatcher;
}
function replaceIndices(indexValuePairs: [number, number][]) {
  return { toReplace: indexValuePairs } as AnimationDispatcher;
}
function clearIndices(indices: number[]) {
  return { toClear: indices } as AnimationDispatcher;
}

export type { AnimationGenerator, AnimationDispatcher, GenFunction };

export { colorIndices, clearIndices, replaceIndices };
