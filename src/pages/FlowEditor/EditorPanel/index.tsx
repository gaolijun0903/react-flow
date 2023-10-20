import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  ReactFlowProvider,
  useStoreApi,
  useReactFlow,
  Background,
  MiniMap,
  Controls,
  MarkerType,
  ConnectionLineType,
  Node,
  Edge,
  Connection,
  OnConnectStart,
  OnConnectEnd,
  OnConnectStartParams,
  OnSelectionChangeParams,
  ReactFlowInstance,
  BackgroundVariant,
} from 'reactflow'
import 'reactflow/dist/style.css'
import styles from '../index.module.scss'
import { getLayoutedElements } from '@/utils/flow'
import CustomNode from './CustomNode'
import CustomEdge from './CustomEdge'
const edgeTypes = { CustomEdge: CustomEdge } // 注册自定义边

export type FlowData = {
  initialNodes: Node[]
  initialEdges: Edge[]
}

type IProps = {
  flowData: FlowData
  readOnly?: boolean
}

let id = 10
const getId = () => `${id++}` + ''

const EditorPanel: React.FC<IProps> = ({ flowData }) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const connectingNodeId = useRef<string | null>(null)
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance>({} as ReactFlowInstance)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const { project } = useReactFlow()
  const nodeTypes = useMemo(() => ({ CustomNode: CustomNode }), []) // 注册自定义节点

  const { initialNodes, initialEdges } = flowData

  useEffect(() => {
    if (!rfInstance || !initialNodes || !initialEdges) return
    // console.log('initialNodes',initialNodes)
    setLayout(initialNodes, initialEdges)
  }, [rfInstance, flowData])

  // useEffect(() => {
  //   if (edges.length == 0) return
  //   setLayout(nodes, edges)
  // }, [edges])

  const onInit = (reactFlowInstance: ReactFlowInstance) => {
    setRfInstance(reactFlowInstance)
  }

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          // animated: true,
          // type: 'CustomEdge',
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        },
        eds,
      ),
    )
  }, [])

  // 添加任务 - 从某任务的连接桩处拖动
  const onConnectStart = useCallback(
    (_: React.MouseEvent | React.TouchEvent, { nodeId }: OnConnectStartParams) => {
      connectingNodeId.current = nodeId
    },
    [],
  )
  // 添加任务 - 从某任务的连接桩处拖动
  const onConnectEnd = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const target = event.target as HTMLDivElement
      const targetIsPane = target.classList.contains('react-flow__pane')
      if (targetIsPane) {
        addNodeOnDrop(event)
        connectingNodeId.current = null
      }
    },
    [project],
  )

  // // 添加任务 - 从组件库拖放
  // const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault()
  //   event.dataTransfer.dropEffect = 'move'
  // }, [])
  // // 添加任务 - 从组件库拖放
  // const onDrop = useCallback(
  //   (event: React.DragEvent<HTMLDivElement>) => {
  //     event.preventDefault()
  //     const type = event.dataTransfer.getData('application/reactflow')
  //     // check if the dropped element is valid
  //     if (typeof type === 'undefined' || !type) {
  //       return
  //     }
  //     addNodeOnDrop(event, type)
  //   },
  //   [project],
  // )

  // 添加任务：1、从组件库拖放；2、从某任务的连接桩处拖动
  const addNodeOnDrop = (
    event: React.DragEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent>,
    type?: string,
  ) => {
    if (!reactFlowWrapper?.current) return
    const reactFlowBounds = reactFlowWrapper?.current.getBoundingClientRect()

    const position = project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top - 20,
    })
    const id = getId()
    const newNode = {
      id,
      type: 'CustomNode',
      position,
      data: { label: '' },
      sourcePosition: 'right',
      targetPosition: 'left',
    } as Node

    setNodes((nds) => nds.concat(newNode))

    if (!connectingNodeId?.current) return

    const newEdge = {
      id: `e${connectingNodeId.current}${id}`,
      source: connectingNodeId.current,
      target: id,
      // type: 'CustomEdge',
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
      style: { stroke: '#dedfe6' },
    } as Edge
    setEdges((eds) => eds.concat(newEdge))
  }

  // 设置布局
  const setLayout = (nodes: Node[], edges: Edge[]) => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, {
      offset: { x: 12, y: 12 },
      edgeStyle: { stroke: '#dedfe6' },
    })
    setNodes(layoutedNodes)
    setEdges(layoutedEdges)
  }

  return (
    <div className={styles.reactflowWrapper} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={onInit}
        // onDrop={onDrop}
        // onDragOver={onDragOver}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        // @ts-ignore
        onConnectEnd={onConnectEnd}
        // onClickConnectEnd={onClickConnectEnd}
        // onSelectionChange={onSelectionChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        // fitView
      >
        <MiniMap position="bottom-left" />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  )
}
export default EditorPanel
