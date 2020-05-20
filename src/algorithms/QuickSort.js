let sortOrder;

function swap(array, i, j, actions) {
  actions.push([1, i, array[j]]);
  actions.push([1, j, array[i]]);

  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function partition(array, low, high, actions) {
  // const randomIndex = Math.floor(Math.random() * (high - low + 1) + low);
  // swap(array, low, low + randomIndex, actions);
  const pivot = array[low];
  let i = low;
  let j = high;

  while (i < j) {
    while (
      (sortOrder === 1 && array[i] <= pivot) ||
      (sortOrder === -1 && array[i] >= pivot)
    ) {
      actions.push([0, low, i]);
      actions.push([2, low, i]);
      i++;
    }
    while (
      (sortOrder === 1 && array[j] > pivot) ||
      (sortOrder === -1 && array[j] < pivot)
    ) {
      actions.push([0, low, j]);
      actions.push([2, low, j]);
      j--;
    }
    if (i < j) {
      actions.push([0, i, j]);
      swap(array, i, j, actions);
      actions.push([2, i, j]);
    }
  }

  actions.push([0, low, j]);
  swap(array, low, j, actions);
  actions.push([2, low, j]);

  return j;
}

function performQuickSort(array, low, high, actions) {
  if (low < high) {
    const partitionIndex = partition(array, low, high, actions);
    performQuickSort(array, low, partitionIndex - 1, actions);
    performQuickSort(array, partitionIndex + 1, high, actions);
  }
}

export default function quickSot(array, low, high, actions, sort_order) {
  sortOrder = sort_order;
  performQuickSort(array, low, high, actions);
}
