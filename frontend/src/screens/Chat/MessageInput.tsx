import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { IoSendSharp } from 'react-icons/io5';
import useChat from '../../hooks/useChat';

const MessageInput = () => {
  const [messageInput, setMessageInput] = useState('');
  const { sendMessage } = useChat();

  const handleChangeMessageInput: ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => setMessageInput(e.target.value);

  const handleSendMessage: FormEventHandler = (e) => {
    e.preventDefault();
    setMessageInput('');

    sendMessage(messageInput);
  };

  return (
    <form className="message-input" onSubmit={handleSendMessage}>
      <textarea
        className="message-input__input"
        value={messageInput}
        onChange={handleChangeMessageInput}
        placeholder="Mensagem"
      />
      <button type="submit" className="message-input__button">
        <IoSendSharp size={22} />
      </button>
    </form>
  );
};

export default MessageInput;
