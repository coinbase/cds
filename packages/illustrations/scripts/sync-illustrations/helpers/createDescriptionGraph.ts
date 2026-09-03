type DescriptionType = Record<string, string[]>;

/**
 * Adds a node to the graph
 * @param description
 * @param idx
 */
const addNode = (graph: DescriptionType, description: string, name: string) => {
  if (description in graph && !graph[description].includes(name)) {
    graph[description].push(name);
  }

  // Need this if statement, otherwise duplicated names would
  // be considered a new node
  if (!(description in graph)) {
    graph[description] = [name];
  }
};

/**
 * Maps the description to the icon name.
 * A description could share 1 or more icon names. Therefore,
 * the value of this graph is an array not just a string
 * i.e cash could be used in cashJPY or cashEUR
 * @returns
 */
export const createDescriptionGraph = (items: { name: string; description: string }[]) => {
  const graph: DescriptionType = {};

  for (const value of items) {
    const { name, description } = value;

    const descriptions = description.split(',').map((token) => token.trim());

    descriptions.forEach((des) => addNode(graph, des, name));
  }

  return graph;
};
