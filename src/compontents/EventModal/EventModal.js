import React from 'react';
import './EventModal.css';

const EventModal = ({ selectedDate, event, onEventChange, onSave, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>为 {selectedDate} 输入事件</h2>
        <textarea
          value={event}
          onChange={(e) => onEventChange(e.target.value)}
          placeholder="输入事件或备注"
        />
        <div className="modal-actions">
          <button className="save-btn" onClick={onSave}>保存事件</button>
          <button className="close-btn" onClick={onClose}>关闭</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
