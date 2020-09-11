export function insertionSort(array) {
  var start_time = performance.now();
  var num_comparison = 0;
  let temp = 0;
  let Jdx = 0;
  for (let Idx = 1; Idx < array.length; Idx++) {
    temp = array[Idx];
    Jdx = Idx - 1;
    while (Jdx >= 0 && temp < array[Jdx]) {
      array[Jdx + 1] = array[Jdx];
      Jdx -= 1;
      num_comparison += 1;
    }
    array[Jdx + 1] = temp;
    num_comparison += 1;
  }
  var exec_time = (performance.now() - start_time).toFixed(4);
  return [exec_time, num_comparison];
}

export function getInsertionSortAnimation(array) {
  const animations = [];
  let temp = 0;
  let Jdx = 0;
  for (let Idx = 1; Idx < array.length; Idx++) {
    temp = array[Idx];
    Jdx = Idx - 1;
    while (Jdx >= 0 && temp < array[Jdx]) {
      array[Jdx + 1] = array[Jdx];
      animations.push([Jdx + 1, array[Jdx + 1]]);
      Jdx -= 1;
    }
    array[Jdx + 1] = temp;
    animations.push([Jdx + 1, temp]);
  }
  return animations;
}
