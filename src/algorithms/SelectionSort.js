function swap(array, i, j, actions) {
  actions.push([1, j, array[i]]);
  actions.push([1, i, array[j]]);

  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

export default function selectionSort(array, actions, sortOrder) {
  const size = array.length;

  for (let i = 0; i < size - 1; i++) {
    let maxIndex = i;
    let minIndex = i;

    for (let j = i + 1; j < size; j++) {
      actions.push([0, i, j]);
      actions.push([2, i, j]);
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
      if (array[j] > array[maxIndex]) {
        maxIndex = j;
      }
    }

    if (sortOrder === 1) {
      swap(array, i, minIndex, actions);
    } else {
      swap(array, i, maxIndex, actions);
    }
  }
}
