import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { useChatContext } from '@/context/useChatContext';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
const ChatItem = ({ chat, currentUserId }) => {
  const { changeActiveChat, activeChat } = useChatContext();

  const otherUser = chat.participant_1.id === currentUserId ? chat.participant_2 : chat.participant_1;

  return (
    <li onClick={() => changeActiveChat(chat)} data-bs-dismiss="offcanvas">
      <div
        className={clsx('nav-link text-start', {
          active: activeChat?.id === chat.id,
        })}
        role="tab"
      >
        <div className="d-flex">
          <div className="flex-shrink-0 avatar me-2">
            <img
              className="avatar-img rounded-circle"
              src={`${import.meta.env.VITE_API_URL}${otherUser.profile_picture}`}
              alt=""
              onError={(e) => e.currentTarget.src = '/default-avatar.jpg'}
            />
          </div>
          <div className="flex-grow-1 d-block">
            <h6 className="mb-0 mt-1">{otherUser.name}</h6>
            <div className="small text-secondary">{chat.lastMessage}</div>
          </div>
        </div>
      </div>
    </li>
  );
};
const ChatUsers = ({ chats }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(chats || []);
  }, [chats]);

  const currentUserId = Number(localStorage.getItem('user_id'));

  const search = (text) => {
    const cleaned = text.trim();
    setUsers(
      cleaned
        ? chats.filter((chat) => {
            const other =
              chat.participant_1.id === currentUserId
                ? chat.participant_2
                : chat.participant_1;
            return other.name.toLowerCase().includes(cleaned.toLowerCase());
          })
        : chats
    );
  };

  return (
    <Card className="card-chat-list rounded-end-lg-0 card-body border-end-lg-0 rounded-top-0 overflow-hidden">
      <form className="position-relative">
        <input
          className="form-control py-2"
          type="search"
          placeholder="Search for chats"
          aria-label="Search"
          onKeyUp={(e) => search(e.target.value)}
        />
        <button
          className="btn bg-transparent text-secondary px-2 py-0 position-absolute top-50 end-0 translate-middle-y"
          type="button"
        >
          <BsSearch className="fs-5" />
        </button>
      </form>
      <div className="mt-4 h-100">
        <SimplebarReactClient className="chat-tab-list custom-scrollbar">
          <ul className="nav flex-column nav-pills nav-pills-soft">
            {users.map((chat, idx) => (
              <ChatItem chat={chat} currentUserId={currentUserId} key={idx} />
            ))}
          </ul>
        </SimplebarReactClient>
      </div>
    </Card>
  );
};
export default ChatUsers;