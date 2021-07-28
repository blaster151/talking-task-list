import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { tasks } from './tasks.js';

function say(text: string) {
  var msg = new SpeechSynthesisUtterance();
  msg.text = text;
  console.log('Playing ', msg.text);

  msg.onend = () => {
    console.log('ended');
    window.speechSynthesis.cancel();
  };

  console.log('speaking');
  window.speechSynthesis.speak(msg);
  console.log('speak method called');
}


function TaskList() {
  const [isStarted, setIsStarted] = useState(false);
  const [tasksSoFar, setTasksSoFar] = useState<{ 'Task Name': string, 'Time': number }[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(-1);
  const [isFinished, setIsFinished] = useState(false);

  const startItAll = () => {
    setIsStarted(true);
  };

  useEffect(() => {
    let timeElapsed = 0;

    if (!isStarted)
      return;

    if (currentTaskIndex < 0)
      setCurrentTaskIndex(0);

    // for (let t of tasks) {
    //   let taskName = t['Task Name'];
    //   let taskTime = t.Time;

    //   console.log('Scheduling ', taskName, timeElapsed);
    //   const timeout = setTimeout(() => {
    //     console.log('tasksSoFar: ', tasksSoFar);
        
    //     const updatedTasksSoFar = [...tasksSoFar];
    //     updatedTasksSoFar.push(t);
    //     setTasksSoFar(updatedTasksSoFar);

    //     say(taskName);
    //   }, timeElapsed);

    //   timeElapsed += 60 * taskTime * 1000;
    // };
  }, [isStarted, currentTaskIndex]);

  useEffect(() => {
    if (currentTaskIndex < 0 || currentTaskIndex >= tasks.length)
      return;

    console.log('currentTaskIndex', currentTaskIndex);

    const updated = [...tasksSoFar];
    updated.push(tasks[currentTaskIndex]);
    setTasksSoFar(updated)

    say(tasks[currentTaskIndex]['Task Name']);

    console.log('setting timeout', JSON.stringify(tasks[currentTaskIndex]));
    setTimeout(() => {
      console.log('evaluating if currenttaskindex indicates finished', currentTaskIndex, tasks.length);
      if (currentTaskIndex < (tasks.length) - 1)
        setCurrentTaskIndex(currentTaskIndex + 1);
      else
      {
        say('Tasks finished');
        setIsFinished(true);
      }
      
    }, tasks[currentTaskIndex].Time * 1000 * 60);
  }, [currentTaskIndex]);

  useEffect(() => {
    if (tasksSoFar) {}
  }, [tasksSoFar]);

  return (
    <>
      <div className="TaskList">
        {tasks.map((t,i) => <div key={i}>{t['Task Name']}</div>)}
      </div>

      <button onClick={() => startItAll()}>Start</button>

      <div>Tasks So Far</div>
      {tasksSoFar.map((t,i) => <div key={i}>{t['Task Name']}</div>)}

      {isFinished && <div>DONE WITH LIST</div>}
    </>
  );
}

export default TaskList;
