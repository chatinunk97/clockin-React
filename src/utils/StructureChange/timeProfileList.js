function transformObjects(input) {
  return input.map((obj) => ({
    label: `${obj.start}-${obj.end}`,
    value: obj.id,
  }));
}

export default transformObjects