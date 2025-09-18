import { ChangelogTOCUpdater } from '@theme/ChangelogTOCManager';
import ChangelogList from '@theme/ChangelogList';
import ChangelogListCell from '@theme/ChangelogListCell';

<% Object.entries(data).map(([release, logs]) => { _%>
## <%- release %>

<ChangelogList>
<% logs.map((item) => { _%>
<ChangelogListCell title="<%- item.commit %>" description="<%- item.author %>" detail="<%- item.sha %>" subdetail="<%- item.date %>" to="<%- item.commitUrl %>" />
<% }) _%>
</ChangelogList>
<% }) _%>

<ChangelogTOCUpdater toc={toc} />