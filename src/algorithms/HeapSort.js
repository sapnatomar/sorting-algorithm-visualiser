let sortOrder;

function swap(array, i, j, actions) {
  actions.push([1, i, array[j]]);
  actions.push([1, j, array[i]]);

  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function heapify(array, n, i, actions) {
  let largest = i;
  let smallest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n) {
    if (sortOrder === 1 && array[left] > array[largest]) {
      actions.push([0, left, largest]);
      actions.push([2, left, largest]);
      largest = left;
    }
    if (sortOrder === -1 && array[left] < array[smallest]) {
      actions.push([0, left, smallest]);
      actions.push([2, left, smallest]);
      smallest = left;
    }
  }

  if (right < n) {
    if (sortOrder === 1 && array[right] > array[largest]) {
      actions.push([0, right, largest]);
      actions.push([2, right, largest]);
      largest = right;
    }

    if (sortOrder === -1 && array[right] < array[smallest]) {
      actions.push([0, right, smallest]);
      actions.push([2, right, smallest]);
      smallest = right;
    }
  }

  if (sortOrder === 1 && largest !== i) {
    swap(array, i, largest, actions);
    heapify(array, n, largest, actions);
  }
  if (sortOrder === -1 && smallest !== i) {
    swap(array, i, smallest, actions);
    heapify(array, n, smallest, actions);
  }
}

export default function heapSort(array, actions, sort_order) {
  const n = array.length;
  sortOrder = sort_order;

  for (let i = n / 2 - 1; i >= 0; i--) {
    heapify(array, n, i, actions);
  }

  for (let i = n - 1; i >= 0; i--) {
    swap(array, 0, i, actions);
    heapify(array, i, 0, actions);
  }
}
