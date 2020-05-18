function bubbleSort(array, actions) {
  const size = array.length;
  for (let i = 0; i < size - 1; i++) {
    for (let j = 0; j < size - i - 1; j++) {
      actions.push([0, j, j + 1]);
      actions.push([2, j, j + 1]);
      if (array[j] > array[j + 1]) {
        actions.push([1, j, array[j + 1]]);
        actions.push([1, j + 1, array[j]]);

        //swap
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
}

export default bubbleSort;
