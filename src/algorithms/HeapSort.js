function swap(array, i, j, actions) {
  actions.push([1, i, array[j]]);
  actions.push([1, j, array[i]]);

  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function heapify(array, n, i, actions) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && array[left] > array[largest]) {
    actions.push([0, left, largest]);
    actions.push([2, left, largest]);
    largest = left;
  }

  if (right < n && array[right] > array[largest]) {
    actions.push([0, right, largest]);
    actions.push([2, right, largest]);
    largest = right;
  }

  if (largest !== i) {
    swap(array, i, largest, actions);
    heapify(array, n, largest, actions);
  }
}

export default function heapSort(array, actions) {
  const n = array.length;

  for (let i = n / 2 - 1; i >= 0; i--) {
    heapify(array, n, i, actions);
  }

  for (let i = n - 1; i >= 0; i--) {
    swap(array, 0, i, actions);
    heapify(array, i, 0, actions);
  }
}
