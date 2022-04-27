const response = (res, message, result, pageInfo, stats = 200) => {
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
    if (result) {
      data.results = result;
    }
  }

  if(pageInfo==null){
    if (result) {
      data.result = result;
    }
  }
  return res.status(stats).json(data);
};

module.exports = response;