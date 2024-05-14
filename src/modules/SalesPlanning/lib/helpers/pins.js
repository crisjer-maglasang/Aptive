export function parsePinOutcome(pinType) {
  const splitString = pinType.split('-');
  const color = splitString[0].replace('mapMarker', '').toLowerCase();
  let knockTimes = null;
  let hasNote = null;
  let type = null;

  if (splitString.length === 4) {
    knockTimes = isNaN(splitString[1]) ? null : Number(splitString[1]);
    type = splitString[2].toLowerCase();
    hasNote = splitString[3].toLowerCase() === 'note';
  } else if (splitString.length === 3) {
    if (!isNaN(splitString[1])) {
      knockTimes = Number(splitString[1]);

      if (splitString[2].toLowerCase() === 'note') {
        hasNote = true;
      } else {
        type = splitString[2].toLowerCase();
      }
    } else {
      type = splitString[1].toLowerCase();
      hasNote = splitString[2].toLowerCase() === 'note';
    }
  } else if (splitString.length === 2) {
    if (!isNaN(splitString[1])) {
      knockTimes = Number(splitString[1]);
    } else if (splitString[1].toLowerCase() === 'note') {
      hasNote = true;
    } else {
      type = splitString[1].toLowerCase();
    }
  }

  return { color, knockTimes, hasNote, type };
};
