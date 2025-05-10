import { useChatContext } from '@/context/useChatContext';
import { useEffect, useState } from 'react';
import useViewPort from '@/hooks/useViewPort';
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'react-bootstrap';
import ChatUsers from './ChatUsers';
import { GetChats } from '../../../../api/ApiService';

const ChatUserList = () => {
  const { width } = useViewPort();
  const { chatList } = useChatContext();

  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const chatData = await GetChats();
      setChats(chatData || []);
    };
    fetchChats();
  }, []);

  return (
    <>
      {width >= 992 ? (
        <>{chats && <ChatUsers chats={chats} />}</>
      ) : (
        <Offcanvas show={chatList.open} onHide={chatList.toggle} placement="start">
          <OffcanvasHeader closeButton />
          <OffcanvasBody className="p-0">{chats && <ChatUsers chats={chats} />}</OffcanvasBody>
        </Offcanvas>
      )}
    </>
  );
};
export default ChatUserList;