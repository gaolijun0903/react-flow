import React from 'react'
import styles from '../index.module.scss'

const NodesPanel: React.FC = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside className={styles.NodesPanel}>
      <div className={styles.title}>组件库</div>
      <div className={styles.dndnode} onDragStart={(event) => onDragStart(event, 'default')} draggable>
        节点
      </div>
    </aside>
  )
}
export default NodesPanel
