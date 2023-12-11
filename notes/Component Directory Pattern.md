COMPONENT DIRECTORY FILE ORGANIZATION

Rules:
One directory for every exported component

- extra component definitions may exist in a component file, but not for export (if component is reusable, it gets its own file + folder)
  Component directories are nested within the directory of the component that uses them.
  A component should be nested at the highest level that its reusability implies
  If a component is used by multiple other components, if it is still very coupled to a sub-tree,
  then it should be nested in the highest level of that subtree,
  otherwise it belongs to app/_components
  Non-page compnents that belong at the app level should be placed within app/_compontnes

super-flat system is problematic:

- namespace challenge
- no info about hierarchy, dependencies, context for components
  -> nest components
  putting individual component dirs direclty in app/ is too cluttereing
  -> use a _components dir for this
  having
