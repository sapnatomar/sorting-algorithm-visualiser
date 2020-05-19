function merge(array, low, mid, high, helperArray, actions) {
  let i = low;
  let k = low;
  let j = mid + 1;

  while (i <= mid && j <= high) {
    actions.push([0, i, j]);
    if (helperArray[i] <= helperArray[j]) {
      actions.push([1, k, helperArray[i]]);
      actions.push([2, i, j]);
      array[k++] = helperArray[i++];
    } else {
      actions.push([1, k, helperArray[j]]);
      actions.push([2, i, j]);
      array[k++] = helperArray[j++];
    }
  }

  while (i <= mid) {
    actions.push([0, i, i]);
    actions.push([1, k, helperArray[i]]);
    actions.push([2, i, i]);
    array[k++] = helperArray[i++];
  }

  while (j <= high) {
    actions.push([0, j, j]);
    actions.push([1, k, helperArray[j]]);
    actions.push([2, j, j]);
    array[k++] = helperArray[j++];
  }
}

function mergeSort(array, low, high, helperArray, actions) {
  if (low < high) {
    const mid = Math.floor((low + high) / 2);
    mergeSort(helperArray, low, mid, array, actions);
    mergeSort(helperArray, mid + 1, high, array, actions);
    merge(array, low, mid, high, helperArray, actions);
  }
}

export default mergeSort;
