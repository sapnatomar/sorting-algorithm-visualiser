export const COLOR1 = "#444";
export const COLOR2 = "red";

export const sorts = [
  "Bubble Sort",
  "Selection Sort",
  "Insertion Sort",
  "Merge Sort",
  "Quick Sort",
  "Heap Sort",
];

export const complexity = {
  "Bubble Sort": "O(n*n)",
  "Selection Sort": "O(n*n)",
  "Insertion Sort": "O(n*n)",
  "Merge Sort": "O(n*log(n))",
  "Quick Sort": "O(n*log(n))",
  "Heap Sort": "O(n*log(n))",
};

export function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const NavbarButtons = [
  {
    title: "Generate New Array",
    disabled: true,
  },
  {
    title: "Customize Array",
    disabled: true,
  },
  {
    title: "Tips",
  },
];

export const columns = [
  {
    title: "Sort",
    dataIndex: "sort",
    align: "center",
  },
  {
    title: "Complexity",
    dataIndex: "complexity",
    align: "center",
  },
  {
    title: "N (Size)",
    dataIndex: "N",
    align: "center",
  },
  {
    title: "Animation Speed(ms)",
    dataIndex: "animationSpeed",
    align: "center",
  },
  {
    title: "Time(ms)",
    dataIndex: "timetaken",
    align: "center",
  },
];
