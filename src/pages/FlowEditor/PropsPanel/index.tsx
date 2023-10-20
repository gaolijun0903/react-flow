import React, { useEffect, useState } from 'react'
import { Form, Radio, Select, Input } from 'antd'
import { Node, useReactFlow, useOnSelectionChange } from 'reactflow'
import styles from '../index.module.scss'
import { NODE_TYPES_ENM } from '@/constants/flow'

const PropsPanel: React.FC = () => {
  const [form] = Form.useForm()
  const reactFlowInstance = useReactFlow()
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)

  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      if (nodes.length == 0) {
        setSelectedNode(null)
      } else {
        setSelectedNode(nodes[0])
      }
    },
  })

  useEffect(() => {
    form.resetFields()
    form.setFieldsValue(selectedNode?.data)
  }, [selectedNode?.data])

  const handleValuesChange = (changedValues: any, allValues: any) => {
    const { componentCode } = allValues
    const type = NODE_TYPES_ENM[componentCode]
   
    reactFlowInstance.setNodes((nds: Node[]) =>
      nds.map((node: Node) => {
        if (node.id === selectedNode?.id) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            ...allValues,
            label: type?.label || type?.name,
            icon: type?.icon || 'xuqiupingshen',
            isInvalide: false,
          }
        }
        return node
      }),
    )
  }

  return (
    <>
      {selectedNode && (
        <div className={styles.PropsPanel}>
          <div className={styles.whiteBg}>
            <div className={styles.title}>属性设置</div>
            <Form
              form={form}
              name="basic"
              layout="vertical"
              initialValues={{ canSkip: 2 }}
              onValuesChange={handleValuesChange}
              autoComplete="off"
            >
              <Form.Item label="任务id" name="id" hidden>
                <Input />
              </Form.Item>
              <Form.Item label="任务类型" name="componentCode" rules={[{ required: true }]}>
                <Select
                  placeholder="请选择"
                  allowClear
                  options={Object.keys(NODE_TYPES_ENM)
                    ?.map((type:any) => {
                      return { value: type, label: NODE_TYPES_ENM[type].label }
                    })}
                ></Select>
              </Form.Item>
              <Form.Item label="当前任务是否可跳过" name="canSkip" rules={[{ required: true }]}>
                <Radio.Group>
                  <Radio value={2}> 否 </Radio>
                  <Radio value={1}> 是 </Radio>
                </Radio.Group>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </>
  )
}
export default PropsPanel
