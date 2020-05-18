import bubbleSort from "./BubbleSort";
import selectionSort from "./SelectionSort";
import insertionSort from "./InsertionSort";
import quickSort from "./QuickSort";
// import mergeSort from "./MergeSort";
// import heapSort from "./HeapSort";

export default function sortArray(array, type) {
  const actions = [];
  const auxillaryArray = array.slice();

  if (type === "Heap Sort") {
  } else if (type === "Selection Sort") {
    selectionSort(auxillaryArray, actions);
  } else if (type === "Insertion Sort") {
    insertionSort(auxillaryArray, actions);
  } else if (type === "Merge Sort") {
  } else if (type === "Quick Sort") {
    quickSort(auxillaryArray, 0, array.length - 1, actions);
  } else {
    bubbleSort(auxillaryArray, actions);
  }

  const A = auxillaryArray;
  const B = array.slice().sort((a, b) => a - b);
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
