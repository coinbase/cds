import { validateProjectToolchainTags } from '../toolchains.mjs';
import { readWorkspaceProjects } from '../workspaceProjects.mjs';

const projects = await readWorkspaceProjects();
const errors = validateProjectToolchainTags(projects);

if (errors.length > 0) {
  console.error(`Invalid Nx project toolchain tags:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

console.log(`Validated toolchain tags for ${projects.length} Nx projects.`);
