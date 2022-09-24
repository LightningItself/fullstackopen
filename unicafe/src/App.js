import { useState } from "react";

const Button = ({ label, clickHandler }) => {
  return <button onClick={clickHandler}>{label}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (!good && !neutral && !bad) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={good + bad + neutral} />
        <StatisticLine
          text="average"
          value={(good - bad) / (good + bad + neutral)}
        />
        <StatisticLine
          text="positive"
          value={`${(good / (good + bad + neutral)) * 100} %`}
        />
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button label="good" clickHandler={() => setGood(good + 1)} />
        <Button label="neutral" clickHandler={() => setNeutral(neutral + 1)} />
        <Button label="bad" clickHandler={() => setBad(bad + 1)} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
