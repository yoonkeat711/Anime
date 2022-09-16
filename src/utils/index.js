export const combineListIntoString = ({list, separators}) => {
  var string = '';
  list?.map((item, index) => {
    if (index === list?.length - 1) {
      string += item;
    } else {
      string += item + separators;
    }
  });

  return string;
};
