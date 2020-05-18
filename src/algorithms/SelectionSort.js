function selectionSort(array, actions) {
  const size = array.length;
  for (let i = 0; i < size - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < size; j++) {
      actions.push([0, i, j]);
      actions.push([2, i, j]);
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    actions.push([1, i, array[minIndex]]);
    actions.push([1, minIndex, array[i]]);

    //swap
    const temp = array[minIndex];
    array[minIndex] = array[i];
    array[i] = temp;
  }
}

export default selectionSort;
