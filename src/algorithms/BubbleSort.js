function swap(array, i, j, actions) {
  actions.push([1, j, array[i]]);
  actions.push([1, i, array[j]]);

  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

export default function bubbleSort(array, actions, sortOrder) {
  const size = array.length;
  for (let i = 0; i < size - 1; i++) {
    for (let j = 0; j < size - i - 1; j++) {
      actions.push([0, j, j + 1]);
      actions.push([2, j, j + 1]);
      if (sortOrder * (array[j] - array[j + 1]) > 0) {
        swap(array, j + 1, j, actions);
      }
    }
  }
}
