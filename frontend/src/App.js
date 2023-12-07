import './App.css';
import AddBaytForm from './components/bayt/AddBaytForm';
import AddRuleForm from './components/rule/AddRuleForm';

function App() {
  return (
    <div>
      {/* <h1 className='bg-blue-900 text-3xl font-bold underline'>Hi</h1> */}
      <AddRuleForm /><br />
      <AddBaytForm />
    </div>
  );
}

export default App;
