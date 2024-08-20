import { useEffect, useState } from 'react'
import { Task } from './types';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    setDraggedTaskId(id);
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: string) => {
    const id = e.dataTransfer.getData('text');
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
    setDraggedTaskId(null);
  };

  const columns = {
    pending: { title: 'Pending', color: '#F9EEAC' }, 
    'in-progress': { title: 'In Progress', color: '#EE855E' },
    staging: { title: 'Staging', color: '#E9A1F6' },
    closed: { title: 'Closed', color: '#9ED385' }
  };

  return (
    <div className='bg-brand-gray-100 h-screen p-6'>
      <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4 h-full">
        {Object.entries(columns).map(([status, { title, color }]) => (
          <div
            key={status}
            id={status}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, status)}
          >
            <div className='pb-1 h-16 p-px rounded-lg overflow-hidden mb-6' style={{ background: color }}>
              <div className='group flex items-center justify-between bg-white border border-white rounded-lg h-full px-6'>
                <h2 className={`text-xl font-bold`}>
                  {title}{' '}
                  <span className='text-brand-gray'>
                    {tasks.filter((task) => task.status === status).length}
                  </span>
                </h2>
                <div className='hidden group-hover:flex items-center transition-all duration-500 gap-3'>
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                  </button>
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {tasks
              .filter((task) => task.status === status)  
              .map((task) => (
                <div
                  key={task.id}
                  className={`bg-white p-4 pb-2 rounded-md border-2 border-gray-200/60 shadow-sm hover:border-brand-purple mb-4 active:cursor-grabbing ${
                    draggedTaskId === task.id ? 'bg-blue-100' : ''
                  }`}
                  draggable='true'
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="mb-2">
                    <span className="block text-brand-gray/50 text-sm">FIELD</span>
                    <div className='flex items-center justify-between'>
                      <p className='text-lg mt-0.5'>{task.title}</p>
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 32 32"><path fill="#fff" d="M10 4H22V28H10z" /><path d="M5,4h6V28H5c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z" fill="#41914d" /><path d="M25,4h6V28h-6c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z" transform="rotate(180 26 16)" fill="#bf393b" /><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15" /><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2" /></svg>
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="block text-brand-gray/50 text-sm">FIELD</span>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {task.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-brand-purple text-sm text-white px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="block text-brand-gray/50 text-sm">FIELD</span>
                    <div className="flex gap-1 mt-2">
                      {task.images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt="task"
                          className="w-12 h-12 rounded"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
