let {
  freeze,
  deepFreeze: deepFreeze_,
  isFrozen,
  isDeepFrozen: isDeepFrozen_,
  isSealed,
  isImmutable: isImmutable_,
  getOwnPropertyNames,
  getOwnPropertySymbols,
  getOwnPropertyDescriptor,
} = Object;

let cache = new WeakMap();

let preimplemented = deepFreeze_ && isDeepFrozen_ && isImmutable_;

let isObjecty = (value) => {
  switch (typeof value) {
    case 'object':
    case 'function':
      return value !== null;
    default:
      return false;
  }
};

let validate = (value, shouldFreeze = false) => {
  if (!isObjecty(value) || cache.has(value)) return true;

  let obj = value;
  let status = 2;
  for (let name of getOwnPropertyNames(obj)) {
    let desc = getOwnPropertyDescriptor(obj, name);
    status &= (desc.get || desc.set ? 1 : 2) & validate(desc.value);
  }
  for (let name of getOwnPropertySymbols(obj)) {
    let desc = getOwnPropertyDescriptor(obj, name);
    status &= (desc.get || desc.set ? 1 : 2) & validate(desc.value);
  }

  if (!shouldFreeze && !isFrozen(obj)) return 0;

  if (shouldFreeze) freeze(obj);

  cache.set(obj, status);

  return status;
};

let deepFreeze = preimplemented ? deepFreeze_ : (obj) => (validate(obj, true), obj);
let isDeepFrozen = preimplemented ? isDeepFrozen_ : (obj) => validate(obj) >= 1;
let isImmutable = preimplemented ? isImmutable_ : (obj) => validate(obj) >= 2;

if (!isSealed(Object) && !preimplemented) {
  Object.deepFreeze = deepFreeze_ ? (obj) => (validate(obj, true), deepFreeze_(obj)) : deepFreeze;

  Object.isDeepFrozen = isDeepFrozen_
    ? (obj) => isDeepFrozen_(obj) || isDeepFrozen(obj)
    : isDeepFrozen;

  Object.isImmutable = isImmutable_ ? (obj) => isImmutable_(obj) || isImmutable(obj) : isImmutable;
}

export { deepFreeze, isDeepFrozen, isImmutable };
