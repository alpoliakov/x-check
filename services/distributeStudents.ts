export const distribute = (array: any) => {
  if (array.length > 4) {
    array.forEach((element: any, i: number) => {
      if (array.length - 1 === i) {
        return (element.name = [...element.name, array.slice(0, 4)]);
      }
      if (array.length - 2 === i) {
        return (element.name = [...element.name, [...array.slice(-1), ...array.slice(0, 3)]]);
      }
      if (array.length - 3 === i) {
        return (element.name = [...element.name, [...array.slice(-2), ...array.slice(0, 2)]]);
      }
      if (array.length - 4 === i) {
        return (element.name = [...element.name, [...array.slice(-3), ...array.slice(0, 1)]]);
      } else {
        return (element.name = [...element.name, array.slice(i + 1, i + 5)]);
      }
    });
  }
};
