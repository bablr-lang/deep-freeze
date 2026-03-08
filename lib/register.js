import { deepFreeze, isDeepFrozen } from './index.js';

if (!Object.deepFreeze) {
  Object.deepFreeze = deepFreeze;
  Object.isDeepFrozen = isDeepFrozen;
}
