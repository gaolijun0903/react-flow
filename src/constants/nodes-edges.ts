import { Node, Edge } from 'reactflow'

const position = { x: 0, y: 0 }
// const edgeType = 'smoothstep'

export const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: {
      label: '需求评审',
      icon: 'youjiantou1',
      componentCode: 'demand_review',
      canSkip: 1,
      nodeStatus: 2,
    },
    position,
  },
  {
    id: '2',
    type: 'CustomNode',
    data: {
      label: '接口定义',
      icon: 'youjiantou1',
      componentCode: 'interface_definition',
      canSkip: 1,
      nodeStatus: 1,
    },
    position,
  },
  {
    id: '2a',
    // type:'CustomCardNode',
    data: {
      label: 'PC端开发',
      icon: 'youjiantou1',
      componentCode: 'front_development',
      canSkip: 1,
      nodeStatus: 0,
    },
    position,
  },
  {
    id: '2b',
    data: {
      label: '后端开发',
      icon: 'youjiantou1',
      componentCode: 'coding_design',
      canSkip: 1,
    },
    position,
  },
  {
    id: '2c',
    data: {
      label: '后端开发',
      icon: 'youjiantou1',
      componentCode: 'backend_development',
      canSkip: 1,
    },
    position,
  },
  {
    id: '2d',
    data: {
      label: '后端冒烟测试',
      icon: 'youjiantou1',
      componentCode: 'front_backend_debugging',
      canSkip: 1,
    },
    position,
  },
  {
    id: '3',
    data: {
      label: '开发设计',
      icon: 'youjiantou1',
      componentCode: 'coding_design',
      canSkip: 1,
      nodeStatus: 2,
    },
    position,
  },
]

export const initialEdges: Edge[] = [
  { id: 'e12', source: '1', target: '3', animated: true },
  { id: 'e13', source: '3', target: '2', animated: true },
  { id: 'e22a', source: '2', target: '2a', animated: true },
  { id: 'e22b', source: '2', target: '2b', animated: true },
  { id: 'e22c', source: '2', target: '2c', animated: true },
  { id: 'e2c2d', source: '2c', target: '2d', animated: true },
  { id: 'e2a2d', source: '2a', target: '2d', animated: true },
  { id: 'e2b2d', source: '2b', target: '2d', animated: true },
]

export const flowData = {
  initialNodes,
  initialEdges,
}
