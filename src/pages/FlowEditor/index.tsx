import React, { useState, useEffect } from 'react'
import ReactFlow, { ReactFlowProvider, Node, Edge } from 'reactflow'
import 'reactflow/dist/style.css'
import styles from './index.module.scss'
import EditorPanel, { FlowData } from './EditorPanel'
import PropsPanel from './PropsPanel'
import ButtonsPanel from './ButtonsPanel'
import { NODE_TYPES_ENM, FIRST_NODE } from '@/constants/flow'
import { initialNodes, initialEdges } from '@/constants/nodes-edges'

const FlowEditor: React.FC = () => {
  const [flowData, setFlowData] = useState<FlowData>({} as FlowData) // 添加label信息后的数据

  useEffect(() => {
    if (initialNodes && initialEdges) {
      setFlowData({
        initialNodes: formatNodes(initialNodes),
        initialEdges: initialEdges,
      })
    }
  }, [initialNodes, initialEdges])

  // 为任务添加label、icon信息
  const formatNodes = (nodes: Node[]) => {
    if (nodes.length) {
      return nodes.map((node) => {
        const { data } = node
        const { componentCode } = data
        const type = NODE_TYPES_ENM[componentCode]
        return {
          ...node,
          type: 'CustomNode',
          data: {
            ...data,
            label: type?.label || type?.name,
            icon: type?.icon || 'xuqiupingshen',
            onClick: onNodeClick,  // 节点内部自定义点击事件
          },
        }
      })
    } else {
      return [FIRST_NODE]
    }
  }

  // 节点点击事件
  const onNodeClick = (type: string, data: any) => {
    console.log(type, data)
  }

  return (
    <div className={styles.ReactFlowProvider}>
      <ReactFlowProvider>
        <EditorPanel flowData={flowData} />
        <ButtonsPanel />
        <PropsPanel />
      </ReactFlowProvider>
    </div>
  )
}
export default FlowEditor
