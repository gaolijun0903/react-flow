import React from 'react'
import { Empty, Row, Spin } from 'antd'
import { IMAGE_PREFIX } from '@/constants'

interface EmptyProps {
  loading?: string
  [x: string]: unknown
}

const EmptyPage: React.FC<EmptyProps> = (props) => {
  const { loading, ...reset } = props

  return (
    <Row justify="center">
      {loading ? (
        <Spin />
      ) : (
        <Empty
          image={`${IMAGE_PREFIX}/user-applist/empty.png`}
          description="暂无数据"
          // style={{ padding: 130 }}
          imageStyle={{
            height: 100,
          }}
          {...reset}
        />
      )}
    </Row>
  )
}

export default EmptyPage
