// * TODO: Implement function for updating user's step data in store
// * TODO: Function for getting user's step data may need some adjustments

module.exports = function stepService(store) {
  const service = {};

  service.get = (username) => {
    if(store.hasOwnProperty(username)){
      return store[username];
    }else{
      return undefined
    }
  } 

  service.add = (username, ts, newSteps) => {
    // Assume that `store` is initially an empty object {}. An example `store` is:
    // {
    //   jenna: {
    //     ts: 1503256778463,
    //     cumulativeSteps: 12323,
    //   },
    //   james: {
    //     ts: 1503256824767,
    //     cumulativeSteps: 587,
    //   },
    // }
    if(!store[username]){
      store[username] = {ts:ts,cumulativeSteps:newSteps}
    }else{
      store[username].cumulativeSteps += newSteps
      store[username].ts = ts
    }
  };

  return service;
};
