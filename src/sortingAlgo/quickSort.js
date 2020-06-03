export function quickSort(animations, array, low, high) {
  if (low < high) {
    let pi = partition(animations, array, low, high);
    quickSort(animations, array, low, pi - 1);
    quickSort(animations, array, pi + 1, high);
  }
}

function partition(animations, array, low, high) {
  let pivot = array[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (pivot > array[j]) {
      i = i + 1;
      animations.push([
        [i, j],
        [array[i], array[j]],
      ]);
      let c = array[i];
      array[i] = array[j];
      array[j] = c;
    }
  }
  animations.push([
    [i + 1, high],
    [array[i + 1], array[high]],
  ]);
  let c = array[i + 1];
  array[i + 1] = array[high];
  array[high] = c;
  return i + 1;
}
