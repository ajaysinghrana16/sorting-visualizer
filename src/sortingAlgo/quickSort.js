export function quickSortAnimation(animations, array, low, high) {
  if (low < high) {
    let pi = partitionAnimation(animations, array, low, high);
    quickSortAnimation(animations, array, low, pi - 1);
    quickSortAnimation(animations, array, pi + 1, high);
  }
}

function partitionAnimation(animations, array, low, high) {
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

export function quickSort(array, low, high) {
  /* Keeping track of the number of swaps and Execution time */
  var start_time = performance.now();

  if (low < high) {
    let pi = partition(array, low, high);
    quickSort(array, low, pi - 1);
    quickSort(array, pi + 1, high);
  }
  var exec_time = (performance.now() - start_time).toFixed(4);
  return [exec_time, partition.counter];
}

function partition(array, low, high) {
  if (typeof partition.counter == "undefined") {
    partition.counter = 0;
  }
  let pivot = array[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (pivot > array[j]) {
      partition.counter++;
      i = i + 1;
      let c = array[i];
      array[i] = array[j];
      array[j] = c;
    }
  }
  let c = array[i + 1];
  array[i + 1] = array[high];
  array[high] = c;
  partition.counter++;
  return i + 1;
}
