const n = (e) => e == null, s = (e) => e && typeof e == "object", i = (e) => n(e) || Array.isArray(e) && e.length === 0 || s(e) && Object.keys(e).length === 0 || typeof e == "string" && e.trim().length === 0;
export {
  i as isBlank,
  n as isEmpty,
  s as isObject
};
