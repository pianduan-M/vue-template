import { resolveComponent } from "vue";

export const resolveComponent = (name) => {
  const component = resolveComponent(name);
  if (!component) {
    console.warn(`${name} is not global register`);
  }
  return component
};
