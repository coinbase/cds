<% if (data.apiPartials.length > 1){ _%>
<Tabs groupId="platform" variant="secondary">
  <% data.apiPartials.map(({ importBlock, tab }) => { _%>
    <TabItem value="<%- tab.value %>" label="<%- tab.label %>">
      <ImportBlock name="<%- importBlock.name %>" from="<%- importBlock.path %>" />
    </TabItem>
<% }) _%>
</Tabs>
<% } else { _%>
<% data.apiPartials.map(({ importBlock }) => { _%>
<ImportBlock name="<%- importBlock.name %>" from="<%- importBlock.path %>" />
 <% }) _%>
<% } _%>