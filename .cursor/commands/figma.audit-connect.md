## Task: Audit Figma Code Connect Mapping

Audit the specificed Figma Code Connect mapping file.

ALWAYS refresh your memory of the React Code Connect documentation here: https://developers.figma.com/docs/code-connect/react/

### Inputs

You will be provided with a name or path to a Figma Code Connect mapping file.
Code Connect files (`.figma.tsx`) are colocated with their corresponding components in this repo, typically within the component's local `__figma__` directory.

Search for the mapping file and end your task if you cannot find it.

Within the current mapping file:

- Study all the property mappings defined in `props: { ... }` of the code connect mapping file.
- Study the figma variants covered (indicated by use of `variant: { ... }`)
  - variants should be defined as separate `figma.connect` calls with the same component.

### Steps

1. **Retrieve Figma component data**
   - ALWAYS call Figma MCP: `get_metadata` to understand the actual component structure:
     - What are the actual property names? (they often have spaces: "show start")
     - What are property values vs separate properties?
     - Is this a component or a component set with variants?
   - Then call Figma MCP: `get_design_context` with the code connect disabled option enabled to get even more metadata

2. **Identify Property Types Correctly**
   Before analyzing mappings, study the Figma metadata you found:
   - **ALWAYS** reference the guidelines for writing code connect mappings here: .cursor/rules/code-connect.mdc
   - **Component Properties**: Boolean toggles, dropdowns/enums in the properties panel
   - **Property Values**: Options within enum properties (e.g., "disabled" is a value of "state")
   - **Text Layers**: Named text layers that need `figma.textContent()`
   - **Instance Layers**: Named instances that need `figma.instance()` or `figma.children()`
   - **Nested Properties**: Properties exposed from child layers (marked with ↳ in Figma)

3. **Read the React component source**
   - Find and read the component's TypeScript source file, including any of its sub-components' source files
   - Study the React props for the component(s)

4. **Analyze Property Coverage**
   Create a mapping analysis table, where each row is a property from the Figma `get_metadata` structure:

   | Figma Property | Related React Prop(s) | Mapped? | Mapping Method | Notes |
   | -------------- | --------------------- | ------- | -------------- | ----- |

   For each Figma property, indicate:
   - ✅ Fully mapped
   - ⚠️ Partially mapped (explain gap)
   - ❌ Not mapped (explain why it should/shouldn't be)

5. **Generate Report**
   Provide a summary with:
   - **Coverage**: X/Y properties mapped
   - **Missing Mappings**: List any unmapped Figma properties that should be mapped
   - **Missing Variants**: List any component variants that are not covered by the current state of the mapping file.
   - **Incorrect Mappings**: List any mappings whose type doesn't match the actual property type from the Figma metadata
   - **Unnecessary Mappings**: Any mappings that don't correspond to Figma properties
   - **Recommended Changes**: Prioritized list of improvements with code snippets. Before suggesting any specific code changes, ensure you have read the latest React Code Connect documentation, linked above.
