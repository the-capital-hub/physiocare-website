import { FiMessageCircle } from 'react-icons/fi';
import './WhatsAppButton.css';

const WHATSAPP_NUMBER = '918884807132';
const MESSAGE = 'Hello, I would like to book a physiotherapy appointment.';

export default function WhatsAppButton() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;
  return (
    <a className="whatsapp-floating" href={url} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp">
      <FiMessageCircle size={25} />
      <span>Chat with us</span>
    </a>
  );
}
