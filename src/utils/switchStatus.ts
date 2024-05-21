function notifStatus(notStatus?: boolean) {
  return [
    {switch: true, name: 'New Messages', id: 'new_messages'},
    {switch: false, name: 'Likes', id: 'likes'},
    {switch: true, name: 'Comments', id: 'comments'},
    {switch: true, name: 'Our Recommendations', id: 'our-recommendations'},
    {switch: true, name: 'Other', id: 'other'},
  ];
}

function settingStatus(settingStatus?: boolean) {
  return [
    {switch: true, name: 'Access Location', id: 'access-location'},
    {switch: false, name: 'Access Contacts', id: 'access-contacts'},
  ];
}

export {notifStatus, settingStatus};
