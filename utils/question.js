export const getRenderItem = ({data, token, user}) => {
  let res = [];

  if (data) {
    data.forEach((item, index) => {
      if (item.hide === '0' || (user && user.is_tester === '1')) {
        item.serialNumber = index;
        res.push(item);
      }
    });
  }

  return res;
};

export const getRenderFolderItems = ({data, token, user}) => {
  let res = {};

  if (data) {
    Object.keys(data).forEach(key => {
      const group = data[key];

      res[key] = getRenderItem({data: group, token, user});
    });
  }

  return res;
};

export const splitIntoFolders = data => {
  const res = {};

  if (data) {
    data.forEach(item => {
      if (!res[item.folder_id]) {
        res[item.folder_id] = [];
      }

      res[item.folder_id].push(item);
    });
  }

  return res;
};
