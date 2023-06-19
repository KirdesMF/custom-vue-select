/**
 * use this to generate a unique id
 */
export function useId() {
  const id = crypto.randomUUID();
  return { id };
}
