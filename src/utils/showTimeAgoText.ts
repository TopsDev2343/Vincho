import moment from 'moment';

export const showTimeAgoText = (value: any) => {
  let timeText = moment.utc(value).local().startOf('seconds').fromNow();
  /*   timeText = timeText.replace('an hour ago', '1 h');
  timeText = timeText.replace('hours ago', 'h');
  timeText = timeText.replace('minutes ago', 'm');
  timeText = timeText.replace('seconds ago', 's'); */
  return timeText;
};
