import { useChatContext } from '@/context/useChatContext';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Button, Card, CardBody, CardFooter, Dropdown, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FaPaperclip, FaPaperPlane } from 'react-icons/fa';
import * as yup from 'yup';
import TextFormInput from '@/components/form/TextFormInput';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { FaFaceSmile } from 'react-icons/fa6';
import data from '@emoji-mart/data'
import EmojiPicker from '@emoji-mart/react'
import { useLayoutContext } from '@/context/useLayoutContext'
import { GetChatById, PartialUpdateChat } from '../../../../api/ApiService';

const AlwaysScrollToBottom = () => {
  const elementRef = useRef(null);
  useEffect(() => {
    if (elementRef?.current?.scrollIntoView) elementRef.current.scrollIntoView({
      behavior: 'smooth'
    });
  });
  return <div ref={elementRef} />;
};
const UserMessage = ({ message, currentUserId, toUser }) => {
  const sentByMe = message?.sender === currentUserId;

  return (
    <div className={clsx('d-flex mb-1', { 'justify-content-end text-end': sentByMe })}>
      <div className="flex-shrink-0 avatar avatar-xs me-2">
        {!sentByMe && (
          <img
            className="avatar-img rounded-circle"
            src={`${import.meta.env.VITE_API_URL}${toUser.profile_picture}`}
            alt=""
            onError={(e) => (e.currentTarget.src = '/default-avatar.jpg')}
          />
        )}
      </div>
      <div className="flex-grow-1">
        <div className="w-100">
          <div className={clsx('d-flex flex-column', sentByMe ? 'align-items-end' : 'align-items-start')}>
            <div className={clsx('p-2 px-3 rounded-2', sentByMe ? 'bg-primary text-white' : 'bg-light text-secondary')}>
              {message.body}
            </div>
            <div className="small my-2">
              {message?.sentOn
                ? new Date(message.sentOn).toLocaleString('tr-TR', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false,
                  })
                : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const ChatArea = () => {
  const { theme } = useLayoutContext()
  const {
    activeChat
  } = useChatContext();
  const [chatData, setChatData] = useState(null);
  const currentUserId = Number(localStorage.getItem('user_id'));
  const messageSchema = yup.object({
    newMessage: yup.string().required('Please enter message')
  });
  const {
    reset,
    handleSubmit,
    control
  } = useForm({
    resolver: yupResolver(messageSchema)
  });
  useEffect(() => {
    const fetchChat = async () => {
      if (activeChat?.id) {
        try {
          const data = await GetChatById(activeChat.id);
          console.log("chatData", data); // 👈 burası önemli
          setChatData(data);
        } catch (error) {
          console.error("Chat detayları alınamadı:", error);
        }
      }
    };
    fetchChat();
  }, [activeChat]);
  if (!activeChat) return null;

  const { avatar, name } = activeChat;

  const sendChatMessage = async (values) => {
    if (!activeChat?.id || !chatData) return;
  
    try {
      await PartialUpdateChat(activeChat.id, {
        message: values.newMessage, // ✅ Tekil olarak gönder
      });
  
      // UI'da da göster
      const timestamp = new Date().toISOString();
      const newMessage = {
        sender: currentUserId,
        body: values.newMessage,
      };
  
      setChatData((prev) => ({
        ...prev,
        messages: {
          ...(prev?.messages || {}),
          [timestamp]: newMessage,
        },
        lastMessage: values.newMessage,
      }));
  
      reset(); // input temizle
    } catch (error) {
      console.error("Mesaj gönderme hatası:", error);
    }
  };
  const otherUser =
  chatData?.participant_1?.id === currentUserId
    ? chatData?.participant_2
    : chatData?.participant_1;
  if (!chatData){
    return null
  } {
    return <Card className="card-chat rounded-start-lg-0 border-start-lg-0">
        <CardBody className="h-100">
          <div className="h-100">
            <div className="d-sm-flex justify-content-between align-items-center">
            <div className="d-flex mb-2 mb-sm-0 align-items-center">
              <div className="flex-shrink-0 avatar me-2">
                <img
                  className="avatar-img rounded-circle"
                  src={`${import.meta.env.VITE_API_URL}${otherUser.profile_picture}`}
                  alt=""
                  onError={(e) => (e.currentTarget.src = '/default-avatar.jpg')}
                />
              </div>
              <div className="d-block flex-grow-1">
                <h6 className="mb-0">{otherUser.name}</h6>
              </div>
            </div>
              {/* <div className="d-flex align-items-center">
                <OverlayTrigger placement="top" overlay={<Tooltip>Audio call</Tooltip>}>
                  <Button variant="primary-soft" className="icon-md rounded-circle me-2 px-2">
                    <BsTelephoneFill />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip>Video call</Tooltip>}>
                  <Button variant="primary-soft" className="icon-md rounded-circle me-2 px-2">
                    <BsCameraVideoFill />
                  </Button>
                </OverlayTrigger>
                <Dropdown>
                  <DropdownToggle as="a" className="icon-md rounded-circle btn btn-primary-soft me-2 px-2 content-none" role="button">
                    <BsThreeDotsVertical />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-end" aria-labelledby="chatcoversationDropdown">
                    <li>
                      <DropdownItem>
                        <BsCheckLg className="me-2 fw-icon" />
                        Mark as read
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem>
                        <BsMicMute className="me-2 fw-icon" />
                        Mute conversation
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem>
                        <BsPersonCheck className="me-2 fw-icon" />
                        View profile
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem>
                        <BsTrash className="me-2 fw-icon" />
                        Delete chat
                      </DropdownItem>
                    </li>
                    <DropdownDivider />
                    <li>
                      <DropdownItem>
                        <BsArchive className="me-2 fw-icon" />
                        Archive chat
                      </DropdownItem>
                    </li>
                  </DropdownMenu>
                </Dropdown>
              </div> */}
            </div>

            <hr />

            <SimplebarReactClient className="chat-conversation-content">
                {chatData?.messages && 
                  Object.entries(chatData.messages).map(([timestamp, message], idx) => (
                    <UserMessage
                      key={idx}
                      message={{
                        ...message,
                        sentOn: new Date(timestamp) // tarih olarak da geçir
                      }}
                      currentUserId={currentUserId}
                      toUser={otherUser}
                    />
                ))}
              <AlwaysScrollToBottom />
            </SimplebarReactClient>
          </div>
        </CardBody>
        <CardFooter>
          <form onSubmit={handleSubmit(sendChatMessage)} className="d-sm-flex align-items-end">
            <TextFormInput className="mb-sm-0 mb-3" name="newMessage" control={control} placeholder="Type a message" noValidate containerClassName="w-100" />
            <Dropdown drop="up">
              <DropdownToggle type="button" className="btn h-100 btn-sm btn-danger-soft ms-2  border border-transparent  content-none">
                <FaFaceSmile className="fs-6" />
              </DropdownToggle>
              <DropdownMenu className="p-0 rounded-4">
                <EmojiPicker data={data} theme={theme} onEmojiSelect={(e) => console.info(e.native)} />
              </DropdownMenu>
            </Dropdown>
            <Button variant="secondary-soft" size="sm" className="ms-2">
              <FaPaperclip className="fs-6" />
            </Button>
            <Button variant="primary" type="submit" size="sm" className="ms-2">
              <FaPaperPlane className="fs-6" />
            </Button>
          </form>
        </CardFooter>
      </Card>;
  }
};
export default ChatArea;