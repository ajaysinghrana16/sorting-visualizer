export function bubbleSort(array) {
  var start_time = performance.now();
  var num_comparison = 0;
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        var b = array[j];
        array[j] = array[j + 1];
        array[j + 1] = b;
        num_comparison += 1;
      }
    }
  }
  var exec_time = (performance.now() - start_time).toFixed(4);
  return [exec_time, num_comparison];
}

export function getBubbleSortAnimation(array) {
  const animations = [];
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        animations.push([j, j + 1], [array[j], array[j + 1]]);
        var b = array[j];
        array[j] = array[j + 1];
        array[j + 1] = b;
      }
    }
  }
  return animations;
}
