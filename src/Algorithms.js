export default function bubbleSort(array) {
  const defaultColor = array[0].style.backgroundColor;

  for (let i = 0; i < array.length - 1; i++) {
    const first = array[i];
    const x = first.style.height;

    first.style.backgroundColor = "#FF0000";

    for (let j = i + 1; j < array.length; j++) {
      const second = array[j];
      const y = second.style.height;

      second.style.backgroundColor = "#FF0000";

      if (parseInt(x.slice(0, -2)) > parseInt(y.slice(0, -2))) {
        const temp = x;
        first.style.height = y;
        second.style.height = temp;
      }

      second.style.backgroundColor = defaultColor;
    }

    first.style.backgroundColor = defaultColor;
  }
}
