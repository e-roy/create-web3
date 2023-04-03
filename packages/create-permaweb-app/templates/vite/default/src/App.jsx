import { GetGreeter, SetGreeter } from './components';

function App() {
  return (
    <div className="">
      <header style={{ padding: '1rem' }}>
      </header>
      <main
        style={{
          minHeight: '60vh',
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <GetGreeter />
        <SetGreeter />
      </main>
    </div>
  );
}

export default App;
