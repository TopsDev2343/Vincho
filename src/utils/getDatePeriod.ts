import moment from 'moment';

export function getLastMonthDate() {
  var d = new Date();

  var tempDateObj = new Date();
  if (tempDateObj.getMonth) {
    tempDateObj.setMonth(tempDateObj.getMonth() - 1);
  } else {
    tempDateObj.setFullYear(tempDateObj.getFullYear() - 1);
    tempDateObj.setMonth(12);
  }

  //return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  return `${tempDateObj.toISOString().split('T')[0]}`;
}

export function getLastWeekDate() {
  const now = new Date();
  var d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
  return d;
}

export function getLastDayDate() {
  const now = new Date();
  var d = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
  return d;
}

export function getTodayDate() {
  const now = new Date();
  var d = now.toISOString().split('T')[0];
  return d;
  /*   let date = new Date();
  return (
    date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
  ); */
}

export function getTomorrowDayDate() {
  const now = new Date();
  var d = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
  return d;
}

export const getFullDateTime = () => {
  let date = new Date();
  return (
    date.getDate() +
    '_' +
    (date.getMonth() + 1) +
    '_' +
    date.getFullYear() +
    '_' +
    date.getHours() +
    '_' +
    date.getMinutes() +
    '_' +
    date.getSeconds()
  );
};

export const getFullDate = () => {
  let date = new Date();
  return (
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  );
};

export const setTimeAgoText = (value: any) => {
  let timeText = moment.utc(value).local().startOf('seconds').fromNow();
  timeText = timeText.replace('a day ago', '1 d');
  timeText = timeText.replace('days ago', 'd');
  timeText = timeText.replace('an hour ago', '1 h');
  timeText = timeText.replace('hours ago', 'h');
  timeText = timeText.replace('minutes ago', 'm');
  timeText = timeText.replace('a minute ago', '1 m');
  timeText = timeText.replace('seconds ago', 's');
  timeText = timeText.replace('a few', '1');
  timeText = timeText.replace('in 1 seconds', '1 s');
  timeText = timeText.replace('a month ago', '1 mo');
  timeText = timeText.replace('months ago', 'mo');
  return timeText;
};
