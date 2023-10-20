import React from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import classNames from 'classnames'
import styles from './index.module.scss'

const CustomNode: React.ComponentType<NodeProps<any>> = ({ id, data, isConnectable, selected }) => {
  let className = ''
  if (data.label) {
    className = selected ? styles.customTemplateNode_selected : styles.customTemplateNode_default
  } else {
    className = selected
      ? styles.customTemplateNode_empty_selected
      : styles.customTemplateNode_empty
  }
  if (data.isInvalide) {
    className = classNames(className, styles.customTemplateNode_invalide)
  }
  className = classNames(styles.customTemplateNode, className)
  return (
    <div className={className}>
      {data.isFirst ? (
        <></>
      ) : (
        <Handle
          className={styles.customHandle}
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
        />
      )}

      <div className={styles.label} onClick={() => data.onClick('onDeal', { id, data })}>
        <span>{data.label || '请设置任务'}</span>
      </div>
      {data.canSkip == 1 ? <div className={styles.canSkip}>可跳过</div> : <></>}
      <Handle
        className={styles.customHandle}
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  )
}

export default CustomNode
