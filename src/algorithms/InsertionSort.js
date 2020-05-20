export default function insertionSort(array, actions, sortOrder) {
  const size = array.length;
  for (let i = 0; i < size; i++) {
    const key = array[i];
    let j = i - 1;
    while (j >= 0) {
      actions.push([0, j, j + 1]);
      if ((array[j] - key) * sortOrder > 0) {
        actions.push([1, j + 1, array[j]]);
        actions.push([2, j, j + 1]);

        array[j + 1] = array[j];
        j--;
      } else {
        actions.push([2, j, j + 1]);
        break;
      }
    }

    array[j + 1] = key;
    actions.push([1, j + 1, key]);
  }
}
