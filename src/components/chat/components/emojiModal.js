import React, { useState } from 'react';
import Picker from 'emoji-picker-react';

const EmojiInput = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleEmojiClick = (event, emojiObject) => {
    setInputValue((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false); // 이모지 클릭 후 리스트 닫기
  };

  const togglePicker = () => {
    setShowPicker((prev) => !prev);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ padding: '10px', width: '300px', fontSize: '16px' }}
      />
      <button
        onClick={togglePicker}
        style={{
          marginLeft: '10px',
          padding: '10px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        😊
      </button>
      {showPicker && (
        <div style={{ position: 'absolute', top: '50px', zIndex: 1000 }}>
          <Picker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default EmojiInput;
