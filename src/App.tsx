import {UserContextProvider} from './context/UserContext'
import {Header} from './components/Header'
import './App.css'
import {PageWrapper} from './components/PageWrapper'
import {AuthGuard} from './components/AuthGuard'
import {Editor} from './pages/Editor/Editor'

function App() {
    return (
        <UserContextProvider>
            <PageWrapper>
                <Header/>
                <AuthGuard>
                    <Editor/>
                </AuthGuard>
            </PageWrapper>
        </UserContextProvider>
    )
}

export default App
