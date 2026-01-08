## Task: Audit Figma Code Connect Mapping

Audit the specificed Figma Code Connect mapping file.

ALWAYS refresh your memory of the React Code Connect documentation here: https://developers.figma.com/docs/code-connect/react/

### Inputs

You will be provided with a name or path to a Figma Code Connect mapping file.
Code Connect files (`.figma.tsx`) are colocated with their corresponding components in this repo, typically within the component's local `__figma__` directory.

Search for the mapping file and end your task if you cannot find it.

Study all the property mappings defined in `props: { ... }` of the code connect mapping file.

### Steps

1. **Retrieve Figma component data**
   - Use the Figma MCP `get_design_context` tool with the node ID from the mapping file's Figma URL
   - Study all Figma properties and variants

2. **Read the React component source**
   - Find and read the component's TypeScript source file, including any of its sub-components' source files
   - Study the React props for the component(s)

3. **Analyze Property Coverage**
   Create a mapping analysis table, where each row is a property from the Figma `get_design_context` metadata:

   | Figma Property | Related React Prop(s) | Mapped? | Mapping Method | Notes |
   | -------------- | --------------------- | ------- | -------------- | ----- |

   For each Figma property, indicate:
   - ✅ Fully mapped
   - ⚠️ Partially mapped (explain gap)
   - ❌ Not mapped (explain why it should/shouldn't be)

4. **Generate Report**
   Provide a summary with:
   - **Coverage**: X/Y properties mapped
   - **Missing Mappings**: List any unmapped Figma properties that should be mapped
   - **Incorrect Mappings**: List any mappings whose type doesn't match the actual property type from the Figma metadata
   - **Unnecessary Mappings**: Any mappings that don't correspond to Figma properties
   - **Recommended Changes**: Prioritized list of improvements with code snippets. Before suggesting any specific code changes, ensure you have read the latest React Code Connect documentation, linked above.
