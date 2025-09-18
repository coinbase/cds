<% if(data){ %>
  <%_ Object.entries(data).map(([name, value]) => { _%>
    <% if(typeof value === 'object' && value.length){ %>
      export type <%- name %> = <%- value.map(h.format).join('|') -%>;
    <% } %>
    <% if(typeof value === 'string'){ %>
      export type <%- name %> = <%- value %>;
    <% } %>

  <%_ }) _%>
<% } %>