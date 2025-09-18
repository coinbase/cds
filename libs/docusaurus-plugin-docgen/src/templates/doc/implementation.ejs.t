<% data.apiPartials.map(({apiPartial}) => { _%>
import <%- apiPartial.name %> from '<%- apiPartial.path %>';
<% }) _%>

## Props

<% if (data.apiPartials.length > 1){ _%>
<Tabs groupId="platform" variant="secondary">
<% data.apiPartials.map(({ apiPartial, tab }) => { _%>
<TabItem value="<%- tab.value %>" label="<%- tab.label %>">
<<%- apiPartial.name %> />
</TabItem>
<% }) _%>
</Tabs>
<% } else { _%>
<% data.apiPartials.map(({ apiPartial }) => { _%>
<<%- apiPartial.name %> />
<% }) _%>
<% } _%>
