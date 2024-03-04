const firstIndex = 1;
const secondIndex = 0;

export function mappingUpdateResponse<T>(array: [number, T[]]): T {
  return array[firstIndex][secondIndex];
}

