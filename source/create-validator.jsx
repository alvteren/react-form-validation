export default rules => (name, validations) => {
  const funcs = [];
  for (const validation of validations.split('|')) {
    const [rule, ...args] = validation.split(':');
    funcs.push([rules[rule], args]);
  }

  return (value, values) => {
    const promises = [];
    for (const [rule, args] of funcs) {
      promises.push(rule(name, value, values, args));
    }
    return Promise.all(promises)
      .then(results => {
        const error = results.find(result => result !== null);
        return { name, error: error || null };
      })
      .catch(error => ({ name, error }));
  };
};
