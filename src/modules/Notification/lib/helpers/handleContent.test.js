import moment from 'moment';
import { getTimeSinceToDisplay } from './handleContent';

describe('Notifications content helpers', () => {
  test('Elapsed time should be in the format "{time} ago"', () => {
    const testFormat = 'YYYY-MM-DD HH:mm:ss.SSSS';
    const now = moment().utc().format(testFormat);
    const minuteAgo = moment().utc().subtract(47, 'seconds').format(testFormat);
    const hoursAgo = moment().utc().subtract(51, 'minutes').format(testFormat);
    const daysAgo = moment().utc().subtract(3, 'days').format(testFormat);

    let timeSince;

    timeSince = getTimeSinceToDisplay(now);
    expect(timeSince).toBe('just now');

    timeSince = getTimeSinceToDisplay(minuteAgo);
    expect(timeSince).toBe('a minute ago');

    timeSince = getTimeSinceToDisplay(hoursAgo);
    expect(timeSince).toBe('an hour ago');

    timeSince = getTimeSinceToDisplay(daysAgo);
    expect(timeSince).toBe('3 days ago');
  });
});
