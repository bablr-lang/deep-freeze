let { freeze, getOwnPropertyNames, getOwnPropertySymbols, getOwnPropertyDescriptor } = Object;

let deepFrozen = new WeakSet();

export const deepFreeze = (value) => {
  if (!isDeepFrozen(value)) {
    for (let name of getOwnPropertyNames(value)) {
      let desc = getOwnPropertyDescriptor(value, name);
      if (!isDeepFrozen(desc.value)) {
        deepFreeze(desc.value);
      }
    }
    for (let name of getOwnPropertySymbols(value)) {
      let desc = getOwnPropertyDescriptor(value, name);
      let dv = desc.value;
      if (!isDeepFrozen(dv)) {
        deepFreeze(dv);
      }
    }
    deepFrozen.add(freeze(value));
  }

  return freeze(value);
};

export const isDeepFrozen = (value) => {
  return typeof value !== 'object' || value === null || deepFrozen.has(value);
};
