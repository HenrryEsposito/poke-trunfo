export function checkType<T>(value: unknown, typeName: string): T {
  if (typeof value !== typeName) {
    throw new Error(`Expected ${typeName}, got ${typeof value}`);
  }
  return value as T;
}

export function checkProperty<T>(obj: { [key: string]: unknown }, prop: string, typeName: string): T {
  if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
    throw new Error(`Missing property ${prop}`);
  }
  return checkType<T>(obj[prop], typeName);
}