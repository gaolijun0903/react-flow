import React from 'react'
import { BaseEdge, EdgeProps } from 'reactflow'

const Radius = 4

const CustomEdge: React.ComponentType<EdgeProps<any>> = (props) => {
  const { sourceX, sourceY, targetX, targetY, id, markerEnd, style } = props
  // style:{ stroke: '#dedfe6' } // edge 的 svg样式 

  // 1、简单的直角拐点
  // const edgePath = `M ${sourceX} ${sourceY} L ${sourceX + 20} ${sourceY} L ${
  //   sourceX + 20
  // } ${targetY} L ${targetX} ${targetY} `

  // 2、圆弧拐点
  let edgePath = `M ${sourceX - 4} ${sourceY} 
  L ${sourceX + 20} ${sourceY} 
  L ${sourceX + 20} ${targetY} 
  L ${targetX + 4} ${targetY} `

  if (sourceY < targetY) {
    edgePath = `M ${sourceX - 4} ${sourceY} 
    L ${sourceX + 20 - Radius} ${sourceY} 
    A ${Radius} ${Radius} 0 0 1 ${sourceX + 20} ${sourceY + Radius} 
    L ${sourceX + 20} ${targetY - Radius} 
    A ${Radius} ${Radius} 0 0 0 ${sourceX + 20 + Radius} ${targetY} 
    L ${targetX + 4} ${targetY} `
  }

  if (sourceY > targetY) {
    edgePath = `M ${sourceX - 4} ${sourceY} 
    L ${sourceX + 20 - Radius} ${sourceY} 
    A ${Radius} ${Radius} 0 0 0  ${sourceX + 20} ${sourceY - Radius} 
    L ${sourceX + 20} ${targetY + Radius} 
    A ${Radius} ${Radius} 0 0 1 ${sourceX + 20 + Radius} ${targetY} 
    L ${targetX + 4} ${targetY} `
  }

  return <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
}

export default CustomEdge
