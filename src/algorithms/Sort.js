import bubbleSort from "./BubbleSort";
import selectionSort from "./SelectionSort";
import insertionSort from "./InsertionSort";
import quickSort from "./QuickSort";
import mergeSort from "./MergeSort";
import heapSort from "./HeapSort";

export default function sortArray(array, type, sortOrder) {
  const actions = [];
  const auxillaryArray = array.slice();

  if (type === "Heap Sort") {
    heapSort(auxillaryArray, actions, sortOrder);
  } else if (type === "Selection Sort") {
    selectionSort(auxillaryArray, actions, sortOrder);
  } else if (type === "Insertion Sort") {
    insertionSort(auxillaryArray, actions, sortOrder);
  } else if (type === "Merge Sort") {
    mergeSort(
      auxillaryArray,
      0,
      array.length - 1,
      array.slice(),
      actions,
      sortOrder
    );
  } else if (type === "Quick Sort") {
    quickSort(auxillaryArray, 0, array.length - 1, actions, sortOrder);
  } else {
    bubbleSort(auxillaryArray, actions, sortOrder);
  }

  const A = auxillaryArray;
  const B = array.slice().sort((a, b) => (a - b) * sortOrder);
  console.log("Sorted?", arraysAreEqual(A, B));
  return actions;
}

function arraysAreEqual(A, B) {
  if (A.length !== B.length) {
    return false;
  }
  for (let i = 0; i < A.length; i++) {
    if (A[i] !== B[i]) {
      return false;
    }
  }
  return true;
}
