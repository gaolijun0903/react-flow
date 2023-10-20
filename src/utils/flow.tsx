import { Node, Edge, Position, MarkerType, ConnectionLineType } from 'reactflow'
import dagre from 'dagre'

const MIN_DISTANCE = 150

const NODE_WIDTH = 116
const NODE_HEIGHT = 40
const NODESEP = 40
const direction = 'LR'

type Params = {
  nodeWidth?: number
  nodeHeight?: number
  nodesep?: number
  offset?: { x: number; y: number }
  edgeStyle?: any // edge 的 svg样式   例:{ stroke: '#dedfe6' }
}
export const getLayoutedElements = (nodes: Node[], edges: Edge[], params?: Params) => {
  // console.log(nodeHeight)
  const { nodeWidth, nodeHeight, nodesep, offset, edgeStyle } = params || {}
  if (!nodes || !edges) return { nodes, edges }
  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setGraph({})

  dagreGraph.setDefaultEdgeLabel(() => ({}))

  const isHorizontal = true
  // dagreGraph.setGraph({ rankdir: direction, nodesep: nodesep || NODESEP,align: 'UL' ,acyclicer:'greedy',ranker:'tight-tree'})
  dagreGraph.setGraph({ rankdir: direction, nodesep: nodesep || NODESEP, align: 'UL' })

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: nodeWidth || NODE_WIDTH,
      height: nodeHeight || NODE_HEIGHT,
    })
  })

  edges.forEach((edge) => {
    edge.type = 'CustomEdge' || ConnectionLineType.SmoothStep
    edge.animated = false
    edge.markerEnd = {
      type: MarkerType.ArrowClosed,
      color: edgeStyle?.stroke || '#B1B4C5',
    }
    if (edgeStyle) edge.style = edgeStyle
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)
  topAlign(dagreGraph)

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    node.targetPosition = isHorizontal
      ? ('left' as Position | undefined)
      : ('top' as Position | undefined)
    node.sourcePosition = isHorizontal
      ? ('right' as Position | undefined)
      : ('bottom' as Position | undefined)

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - (nodeWidth || NODE_WIDTH) / 2 + (offset?.x || 0),
      y: nodeWithPosition.y - (nodeHeight || NODE_HEIGHT) / 2 + (offset?.y || 0),
    }

    return node
  })

  return { nodes, edges }
}

const topAlign = (dagreGraph: any) => {
  const sourceId = dagreGraph.sources()[0]
  const process = (nodeId: string) => {
    const currentY = dagreGraph.node(nodeId).y
    // 直接子节点
    const successors = dagreGraph.successors(nodeId)
    if (successors && successors?.length > 0) {
      const firstY = dagreGraph.node(successors[0]).y

      const minY = successors.reduce((result: any, childId: string) => {
        return Math.min(result, dagreGraph.node(childId).y)
      }, firstY)
      if (currentY < minY) {
        // 每个都向上移动，顶部跟父节点对齐
        const shift = minY - currentY
        successors.forEach((childId: string) => {
          const position = dagreGraph.node(childId)
          dagreGraph.setNode(childId, {
            ...position,
            y: position.y - shift,
          })
        })
      }
      successors.forEach((childId: string) => process(childId))
    }
  }
  process(sourceId)
}
