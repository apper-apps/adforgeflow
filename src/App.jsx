import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/organisms/Layout'
import AdGenerator from '@/components/pages/AdGenerator'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AdGenerator />} />
      </Routes>
    </Layout>
  )
}

export default App