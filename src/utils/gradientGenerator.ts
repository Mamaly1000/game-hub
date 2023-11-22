export const gradientGenerator = (): string => {
  let color_1 = `rgba(${Math.floor(Math.random() * 255)} ${Math.floor(
    Math.random() * 255
  )} ${Math.floor(Math.random() * 255)}/${
    Math.random() > 0.5 ? Math.random() : ".9"
  })`;
  let color_2 = `rgba(${Math.floor(Math.random() * 255)} ${Math.floor(
    Math.random() * 255
  )} ${Math.floor(Math.random() * 255)}/${
    Math.random() > 0.5 ? Math.random() : ".9"
  })`;

  const directions = [
    "to top",
    "to top left",
    "to top right",
    "to right",
    "to left",
    "to bottom",
    "to bottom right",
    "to bottom left",
  ];
  return `linear-gradient(${
    directions[Math.floor(Math.random() * directions.length - 1)]
  },${color_1} 10%,${color_2} 100% )`;
};
