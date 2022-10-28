import React from 'react';

const ChatList = (props) => {
  const { roomList, joinRoom } = props;

  function join(roomid) {
    console.log('test : ', roomid);
    return joinRoom(roomid)
  }

  return (
    <div className='chat-list-container'>
      {roomList.map((room, index) => {
        return (
          <div className='room-list-item' key={index} onClick={() => join(room.idx)}>
            {/* {room.idx} {room.latest_date} */}
            {room.idx}
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
