import handleDragStart from './Pages/ProjectDetails';

const TaskCard: React.FC = () => {
    return (
        <li className="task bg-cyan-800 rounded w-full min-h-2 py-1 px-3 mb-2"
                              draggable
                              onDragStart={(event) => handleDragStart(event, 'task-2')}>
                              <div>
                                  <h3>Task</h3>
                                  <div></div>
                              </div>
                          </li>
    )
}

export default TaskCard;