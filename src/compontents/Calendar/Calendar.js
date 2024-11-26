import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, addMonths, subMonths, eachDayOfInterval, subDays, addDays, endOfWeek, isToday } from 'date-fns';
import EventModal from '../EventModal'; 
import './Calendar.css';

const CalendarWithEvent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [event, setEvent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState({}); // 存储每个日期的事件

  // 获取当前月份的所有天数
  const getMonthDays = (date) => {
    const startOfCurrentMonth = startOfMonth(date);
    const endOfCurrentMonth = endOfMonth(date);
    const currentMonthDays = eachDayOfInterval({ start: startOfCurrentMonth, end: endOfCurrentMonth });
    const startOfCurrentMonthDay = startOfCurrentMonth.getDay();
    const previousMonthEnd = subDays(startOfCurrentMonth, 1);
    const previousMonthStart = startOfMonth(previousMonthEnd);

    let previousMonthDays = [];
    if (startOfCurrentMonthDay !== 0) {
      previousMonthDays = eachDayOfInterval({
        start: previousMonthStart,
        end: previousMonthEnd,
      });
      previousMonthDays = previousMonthDays.slice(previousMonthDays.length - startOfCurrentMonthDay);
    }

    const nextMonthDays = [];
    const totalDays = previousMonthDays.length + currentMonthDays.length;
    if (totalDays < 35) {
      nextMonthDays.push(
        ...eachDayOfInterval({
          start: addDays(endOfCurrentMonth, 1),
          end: endOfWeek(endOfCurrentMonth),
        }).slice(0, 35 - totalDays)
      );
    }

    const allDays = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
    return allDays.slice(0, 35);
  };

  // 选择日期时的回调
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setEvent(events[format(date, 'yyyy-MM-dd')] || ''); // 填充事件
    setIsModalOpen(true); // 打开模态框
  };

  // 事件内容改变时的回调
  const handleEventChange = (newEvent) => {
    setEvent(newEvent);
  };

  // 保存事件的回调
  const handleSaveEvent = () => {
    if (event) {
      setEvents((prevEvents) => ({
        ...prevEvents,
        [format(selectedDate, 'yyyy-MM-dd')]: event,
      }));
    }
    setIsModalOpen(false); // 保存后关闭模态框
  };

  // 关闭模态框的回调
  const handleCloseModal = () => {
    setIsModalOpen(false); // 关闭模态框
  };

  const monthDays = getMonthDays(currentDate);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>上个月</button>
        <h2>{format(currentDate, 'yyyy年MM月')}</h2>
        <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>下个月</button>
      </div>

      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {['日', '一', '二', '三', '四', '五', '六'].map((day, index) => (
            <div key={index} className="weekday">
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-days">
          {monthDays.map((date, index) => {
            const isSelected = selectedDate && format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
            const isEvent = events[format(date, 'yyyy-MM-dd')]; // 判断是否有事件

            return (
              <div
                key={index}
                className={`date-cell ${isSelected ? 'selected' : ''} ${isEvent ? 'event' : ''} ${isToday(date) ? 'today' : ''}`}
                onClick={() => handleDateSelect(date)}
              >
                {format(date, 'd')}
                {isEvent && <span className="event-dot"></span>} 
              </div>
            );
          })}
        </div>
      </div>
      {selectedDate && (
        <div className="selected-date">
          <p>当前选择的日期是：{format(selectedDate, 'yyyy-MM-dd')}</p>
        </div>
      )}

      {isModalOpen && (
        <EventModal
          selectedDate={format(selectedDate, 'yyyy-MM-dd')}
          event={event}
          onEventChange={handleEventChange}
          onSave={handleSaveEvent}
          onClose={handleCloseModal}
        />
      )}

      {/* 展示已保存的事件内容 */}
      <div className="saved-events">
        {Object.entries(events).map(([date, event]) => (
          <div key={date} className="event-entry">
            <strong>{date}:</strong>
            <p>{event}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarWithEvent;
