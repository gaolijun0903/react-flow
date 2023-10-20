import { Card } from 'antd'
import { useSnapshot } from 'valtio'
import { state } from '@/models/global'

const Home: React.FC = () => {
  const userSnap = useSnapshot(state)
  return (
    <Card title="首页">
      <div>
        欢迎，{userSnap.userInfo.realName}
        {userSnap.userInfo.userName}
      </div>
    </Card>
  )
}
export default Home
