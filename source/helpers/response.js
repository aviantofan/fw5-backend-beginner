const response = (res, message, results, pageInfo, stats = 200) => {
  let success = true;
  if (stats) {
    if (stats >= 400) {
      success = false;
    }
  }

  let data = {
    success,
    message,

  };

  if (pageInfo) {
    data.pageInfo = pageInfo;
  }

  if (results) {
    data.results = results;
  }
  return res.status(stats).json(data);
};

module.exports = response;