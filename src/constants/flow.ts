import { Node } from 'reactflow'

interface NObject {
  [key: string]: any
}
export const NODE_TYPES_ENM = {
  demand_review: {
    value: 'demand_review',
    label: '需求评审',
  },
  coding_design: {
    value: 'coding_design',
    label: '开发设计',
  },
  interface_definition: {
    value: 'interface_definition',
    label: '接口定义',
  },
  front_development: {
    value: 'front_development',
    label: 'PC端开发',
  },
  backend_development: {
    value: 'backend_development',
    label: '后端开发',
  },
  front_backend_debugging: {
    value: 'front_backend_debugging',
    label: '后端冒烟测试',
  },
  test_case_design: {
    value: 'test_case_design',
    label: '测试用例设计',
  },
  functional_testing: {
    value: 'functional_testing',
    label: '功能测试',
  },
  functional_acceptance: {
    value: 'functional_acceptance',
    label: '功能验收',
  },
} as NObject

export const FIRST_NODE = {
  id: '0',
  type: 'CustomNode',
  data: { label: '', isFirst: true },
  position: { x: 12, y: 12 },
} as Node

