import bubbleSort from "./BubbleSort";
import selectionSort from "./SelectionSort";
// import mergeSort from "./MergeSort";
// import quickSort from "./QuickSort";
// import selectionSort from "./SelectionSort";
// import heapSort from "./HeapSort";
//import insertionSort from "./InsertionSort";

export default function sortArray(array, type) {
  const actions = [];
  const auxillaryArray = array.slice();

  if (type === "Heap Sort") {
  } else if (type === "Selection Sort") {
    selectionSort(auxillaryArray, actions);
  } else if (type === "Insertion Sort") {
  } else if (type === "Merge Sort") {
  } else if (type === "Quick Sort") {
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
