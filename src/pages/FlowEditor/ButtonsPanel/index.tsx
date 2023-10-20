import React, { useCallback } from 'react'
import { Button, Space, message } from 'antd'
import { useReactFlow, getIncomers, Node, Edge } from 'reactflow'
import { getLayoutedElements } from '@/utils/flow'
import { FIRST_NODE } from '@/constants/flow'
import styles from '../index.module.scss'

const ButtonsPanel: React.FC = () => {
  const reactFlowInstance = useReactFlow()

  // 重置
  const onClear = useCallback(() => {
    reactFlowInstance.setNodes([FIRST_NODE])
    reactFlowInstance.setEdges([])
  }, [reactFlowInstance])

  // 整理格式
  const onLayout = useCallback(() => {
    const { nodes, edges } = reactFlowInstance.toObject()
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, {
      offset: { x: 12, y: 12 },
    })
    reactFlowInstance.setNodes(layoutedNodes)
    reactFlowInstance.setEdges(layoutedEdges)
  }, [reactFlowInstance])

  // 保存数据
  const onSave = useCallback(() => {
    const { edges, nodes } = reactFlowInstance.toObject()
    if (nodes.length == 0) {
      message.error('模板为空！')
      return
    }

    const sources = getSources(nodes, edges)
    if (sources.length > 1) {
      message.error('存在多个起始任务！')
      return
    }
    // 是否设置任务类型
    const isValide = validateNodes(nodes)
    if (!isValide) {
      message.error('存在未设置任务类型的任务')
      return
    }

    message.success('模板流程配置成功，状态设为开启后立即生效')
  }, [reactFlowInstance])

  // 获取任务中所有 的起始任务
  const getSources = (nodes: Node[], edges: Edge[]) => {
    const sources = [] as Node[]
    nodes.forEach((node: Node) => {
      const incomers = getIncomers(node, nodes, edges)
      if (incomers.length == 0) {
        sources.push(node)
      }
    })
    return sources
  }

  // 校验是否设置了任务类型
  const validateNodes = (nodes: Node[]) => {
    let count = 0
    const temp = nodes.map((node: Node) => {
      if (!node.data.label) {
        count++
        node.data = {
          ...node.data,
          isInvalide: true,
        }
      }
      return node
    })
    // 未设置任务类型的
    if (count > 0) {
      reactFlowInstance.setNodes(temp)
      return false
    }
    return true
  }

  return (
    <div className={styles.ButtonsPanel}>
      <Space>
        <Button onClick={onClear}>重置</Button>
        <Button onClick={onLayout}>整理格式</Button>
        <Button type="primary" onClick={onSave}>
          保存
        </Button>
      </Space>
    </div>
  )
}
export default ButtonsPanel
