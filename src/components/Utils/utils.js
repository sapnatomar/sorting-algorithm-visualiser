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
  "Bubble Sort": "O(n2)",
  "Selection Sort": "O(n2)",
  "Insertion Sort": "O(n2)",
  "Merge Sort": "O(nlog(n))",
  "Quick Sort": "O(nlog(n))",
  "Heap Sort": "O(nlog(n))",
};

export function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const arrayDetails = [
  {
    title: "Sort Agorithm",
    valueStyle: { color: "#3f8600" },
  },
  {
    title: "Time Complexity",
    valueStyle: { color: "#cf1322" },
  },
  {
    title: "Animation Speed",
    valueStyle: { color: "#3f4200" },
  },
  {
    title: "Array Size",
    valueStyle: { color: "#3f8600" },
  },
  {
    title: "Minimum Value Limit",
    valueStyle: { color: "#3f8600" },
  },
  {
    title: "Maximum Value Limit",
    valueStyle: { color: "#3f8600" },
  },
];

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
    title: "Instructions",
  },
  // {
  //   title: "Sort",
  //   type: "primary",
  //   disabled: true,
  // },
  // {
  //   title: "Stop (BROKEN)",
  //   type: "primary",
  //   disabled: false,
  // },
];
