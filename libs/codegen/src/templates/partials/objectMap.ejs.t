<% 
let config = locals.config || { commonJS: false, defaultExport: false, disableAsConst: false, sort: false }; 

let types = locals.types || {};

const prependedText = config.disableAsConst ? ';' : 'as const;';

const items = config.sort ? Object.entries(data).sort(([prevKey], [nextKey]) => prevKey.localeCompare(nextKey)) : Object.entries(data);

%>

<% if (config.commonJS){ %>
  module.exports = <%- JSON.stringify(data) %>
<% } else if (config.defaultExport){ %>
  export default <%- JSON.stringify(data) %> <%- prependedText %>
<% } else { %>
<%_ items.map(([name, value]) => { _%>
  export const <%- name %><%- types[name] ? `: ${types[name]}` : `` %> = <%- JSON.stringify(value) %> <%- prependedText %>
  
<%_ }) _%> 
<% } %>