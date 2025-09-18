---
title: <%- data.title %>
slug: /components/<%- data.kebabCaseName %>
---
<% const engTemplates = data.templates.filter(item => item.template !== 'design'); %>
<% data.templates.map((item) => { _%>
import <%- item.component %>, { toc as <%- item.toc %>  } from './_<%- item.template %>.mdx';
<% }) _%>


<Tabs groupId="page">
<% if (data.hasDesign){ _%>
  <TabItem value="guidelines" label="Guidelines" toc={designToc}>
    <Design />
  </TabItem>
<% } _%>
  <TabItem value="implementation" label="Implementation" toc={[
  <% engTemplates.map((item) => { _%>
    ...<%- item.toc %>,
  <% }) _%>
  ]}>
  <% engTemplates.map((item) => { _%>
    <<%- item.component %> />
  <% }) _%>
  </TabItem>
</Tabs>
