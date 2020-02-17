const activate = async () => {
  return await fetch('http://rakbank-test.mocklab.io/activation', {
    method: 'post',
    headers: new Headers({
      Authorization:
        'Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZW1vdXNlcjEiLCJuYW1lIjoiUkFLQkFOSyBEZW1vIiwiaWF0IjoxNTE2MjM5MDIyfQ.hD2So1Jms00c7XB_bxNIrTgvSqMesmrlc0FkBAdY6rM',
    }),
    body: {
      productId: '82jqp008d2l00',
      emirate: 'Abu Dhabi',
    },
  })
    .then(r => r.json().then(data => ({status: r.status, body: data})))
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      console.log(error); // TODO: do better error handling
    });
};

export {activate};
