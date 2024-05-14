import { TOKENS } from '../../lib';
import moment from 'moment';

export const parseNotification = (data) => {
  const tokens = [];
  if (data) {
    const separatedData = separateNotificationData(data);

    separatedData.forEach((item) => {
      if (isGroup(item)) {
        const convertedArray = convertCollection(item);
        const match = /\[(?<tag>[\w-]+)\s+(?<attr>(?:[\w-]+(?:="[^"]+")?\s*)*)/gm.exec(convertedArray);
        const type = match.groups.tag;
        const attr = match.groups.attr.trim();
        const attributes = getAttributesArray(attr);

        const data = attributes.reduce((acc, curr) => {
          const match = /(?<name>[\w\-]+)(?:="(?<value>[^"]+)")?/gm.exec(curr);
          const name = match.groups.name;
          const value = match.groups.value;
          let contentValue;

          if (isGroup(value)) {
            contentValue = convertToPlainArray(value);
          } else {
            contentValue = value.replace(/"/g, '').trim();
          }
          acc[name] = contentValue;

          return acc;
        }, {});
        tokens.push({ type, data });
      } else {
        tokens.push({ type: TOKENS.PLAIN, data: item.replace(/"/g, '').trim() });
      }
    });

    return tokens;
  }
};

const convertCollection = (value) => {
  if (/items="(collection[^\]]+collection)"/.test(value)) {
    const formattedCollection = removeMarkAsCollection(value);
    const match = formattedCollection.match(/items="(\[[^\]]+\])"/);
    const items = match[1].replace(/"/g, '\'');

    return formattedCollection.replace(match[1], items);
  } else {
    return value;
  }
};

const markAsCollection = (value) => {
  return value.replace(/items="\[(.*?)]"/, 'items="collection$1collection"');
};

const removeMarkAsCollection = (value) => {
  return value.replace(/items="collection(.+?)collection"/g, 'items="[$1]"');
};

const separateNotificationData = (value) => {
  return markAsCollection(value).match(/(\[.+?]|[^[\]]+)/g);
};

const isGroup = (value) => {
  return /\[[^\]]*\]/g.test(value);
};

const getAttributesArray = (value) => {
  let attributes;

  if (value.match(/=/g ).length > 1) {
    attributes = value.split(/\s+/);
  } else {
    attributes = [value];
  }

  return attributes;
};

const convertToPlainArray = (value) => {
  const formatToArray = value.replace(/&quot;/g, '"');

  return JSON.parse(formatToArray);
};

export const getTimeSinceToDisplay = (date) => {
  const now = moment().utc();
  const approveDate = moment.utc(date);

  const duration = moment.duration(now.diff(approveDate));
  const seconds = duration.asSeconds();

  moment.updateLocale('en', {
    relativeTime : {
      s: function(number) {
        return number < 10
          ? 'just now' : `${number} seconds`;
      },
    },
  });

  return approveDate.from(now, seconds < 10)
};
