import { request } from '../utils/api.js';
import Breadcrumb from './Breadcrumb.js';
import ImageView from './ImageView.js';
import Nodes from './Nodes.js';

export default function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
    selectedFilePath: null,
  };

  const breadcrumb = new Breadcrumb({ $app, initialState: this.state.depth });
  const nodes = new Nodes({
    $app,
    initialState: [],
    onClick: async (node) => {
      try {
        if (node.type === 'DIRECTORY') {
          const nextNodes = await request(node.id);
          this.setState({
            ...this.state,
            depth: [...this.state.depth, node],
            nodes: nextNodes
          })
        } else if (node.type === 'FILE') {
          this.setState({
            ...this.state, 
            selectedFilePath: node.filePath,
          })
        }
      } catch(e) {
        // 에러 처리하기
      }
    },
  });
  const imageView = new ImageView({$app, initialState: this.state.selectedFilePath})

  this.setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.depth);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
    imageView.setState(this.state.selectedFilePath);
  };

  const init = async = () => {
    try {
      const rootNodes = await request();
      this.setState({
        ...this.state, isRoot: true, nodes: rootNodes
      })
    } catch(e) {

    }
  }

  init();
}