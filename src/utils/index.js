/*
 * Not a truly random dice roll function but good enough for this purpose
 */
const rollDice = () => Math.floor(Math.random() * 6) +1;

const sumArray = array => array.reduce((total, current) => total + current, 0);

function findPermutations(next, target, current, collection) {
  current = current || [];
  collection = collection || [];

  var sum = sumArray(current);

  if (sum > target) {
    return [];
  }

  if (sum === target) {
    return [current]
  }

  for (let i = 0; i < next.length; i++) {
    var nextCurrent = current.concat(next[i]);
    var nextList = next.slice(i + 1);

    collection = collection.concat(findPermutations(nextList, target, nextCurrent));
  }

  return collection;
}

export { rollDice, findPermutations };
