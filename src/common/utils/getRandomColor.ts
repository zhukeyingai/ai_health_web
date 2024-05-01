export const bgColors = [
  "bg-gray-300",
  "bg-red-300",
  "bg-orange-300",
  "bg-amber-300",
  "bg-yellow-300",
  "bg-lime-300",
  "bg-green-300",
  "bg-sky-300",
  "bg-blue-300",
  "bg-purple-300",
  "bg-pink-300",
  "bg-rose-300",
];

export const getRandomColor = () => {
  const radomIndex = Math.floor(Math.random() * bgColors.length);
  return bgColors[radomIndex];
};
