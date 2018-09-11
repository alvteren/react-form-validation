export default rules => (name, validations, value, values) =>
  new Promise(resolve => {
    const promises = [];
    for (const validation of validations.split('|')) {
      const [rule, ...args] = validation.split(':');
      promises.push(rules[rule](name, value, values, ...args));
    }
    Promise.all(promises)
      .then(results => {
        const error = results.find(result => result !== null);
        resolve({ name, error: error || null });
      })
      .catch(error => resolve({ name, error }));
  });
