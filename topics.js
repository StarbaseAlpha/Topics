'use strict';

function Topics() {

  let topics = {};
  let ids = 0;

  const Subscribe = (topic, id, callback) => {
    if (!topics[topic]) {
      topics[topic] = {};
    }
    topics[topic][id.toString()] = callback;
  };

  const Unsubscribe = (topic, id) => {
    if (topics[topic]) {
      delete topics[topic][id.toString()];
    }
    return true;
  };

  const to = (topic, message) => {
    if (topics[topic]) {
      let timestamp = Date.now();
      for(let sub in topics[topic]) {
        if (typeof topics[topic][sub] === 'function') {
          topics[topic][sub]({topic, message, timestamp});
        }
      }
      return true;
    } else {
      return false;
    }
  };

  const on = (topic, callback) => {
        let id = (ids++).toString();
        Subscribe(topic, id, callback);
        return {"id":id, "unsubscribe":()=>{
          return Unsubscribe(topic, id);
        }};
  };

  return {on, to};

}

if (typeof module !== 'undefined' && module && module.exports) {
  module.exports = Topics;
}
