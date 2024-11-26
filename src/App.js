import React, { useState } from 'react';
import Calendar from './compontents/Calendar';
import EventModal from './compontents/EventModal';
import './App.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [event, setEvent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleEventChange = (newEvent) => {
    setEvent(newEvent);
  };

  const handleSaveEvent = () => {
    // 在这里可以保存事件，可以调用 API 或更新本地状态等
    alert(`Event saved for ${selectedDate}: ${event}`);
    setIsModalOpen(false);  // 关闭模态框
    setEvent('');  // 清空事件输入
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <h1>Mini Calendar</h1>
      <Calendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />
      
      {isModalOpen && (
        <EventModal
          selectedDate={selectedDate}
          event={event}
          onEventChange={handleEventChange}
          onSave={handleSaveEvent}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default App
