import Breadcrumb from './Breadcrumb.js';
import Nodes from './Nodes.js';

export default function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
  };

  const breadcrumb = new Breadcrumb({ $app, initialState: this.state.depth });
  const nodes = new Nodes({
    $app,
    initialState: { isRoot: this.state.isRoot, nodes: this.state.nodes },
    onClick: (node) => {
      if (node.type === 'DIRECTORY') {
      } else if (node.type === 'FILE') {
      }
    },
  });
}
