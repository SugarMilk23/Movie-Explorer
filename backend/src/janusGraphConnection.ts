import gremlin from "gremlin";

const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;

const connection = new DriverRemoteConnection(
  `ws://${process.env.GREMLIN_HOST}:${process.env.GREMLIN_PORT}/gremlin`
);
const graph = new Graph();
const g = graph.traversal().withRemote(connection);

connection
  .open()
  .then(() => console.log("Connected to JanusGraph"))
  .catch((err: Error) => console.error("Connection error:", err));

export default g;
