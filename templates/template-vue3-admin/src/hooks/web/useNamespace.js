const statePrefix = 'is-';

const _bem = (block, blockSuffix, element, modifier) => {
  let cls = `${block}`;
  if (blockSuffix) {
    cls += `-${blockSuffix}`;
  }
  if (element) {
    cls += `__${element}`;
  }
  if (modifier) {
    cls += `--${modifier}`;
  }
  return cls;
};

export const useNamespace = (block) => {
  const b = (blockSuffix = '') => _bem(block, blockSuffix, '', '');

  const e = (element) => (element ? _bem(block, '', element) : '');

  const m = (modifier) => (element ? _bem(block, '', '', modifier) : '');

  const be = (blockSuffix, element) =>
    blockSuffix && element ? _bem(block, blockSuffix, element, '') : '';

  const em = (element, modifier) => (element && modifier ? _bem(block, '', element, modifier) : '');

  const bm = (blockSuffix, modifier) =>
    blockSuffix && modifier ? _bem(block, blockSuffix, '', modifier) : '';

  const bem = (blockSuffix, element, modifier) =>
    blockSuffix && element && modifier ? _bem(block, blockSuffix, element, modifier) : '';

  const is = (name, ...args) => {
    const state = args.length >= 1 ? args[0] : true;
    return name && state ? `${statePrefix}${name}` : '';
  };

  return {
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
  };
};
