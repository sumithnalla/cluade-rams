import React from 'react';
import { Phone } from 'lucide-react';
import './FloatingButtons.css';

const FloatingButtons = () => {
  const phoneNumber = "+919700033342";

  const handleWhatsAppClick = () => {
    const whatsappMessage = encodeURIComponent("Hello, I need sound system / AV equipment rental for an event . Kindly share your packages, availability, and contact details. Thanks.");
    const url = `https://wa.me/${phoneNumber.replace(/\s+/g, '')}?text=${whatsappMessage}`;
    window.open(url, "_blank");
  };

  return (
    <div className="floating-buttons-container">
      <a 
        href={`tel:${phoneNumber}`} 
        className="floating-btn phone-btn"
        aria-label="Call Us"
      >
        <Phone size={24} />
      </a>
      <button
        onClick={handleWhatsAppClick}
        className="floating-btn whatsapp-btn"
        aria-label="Chat on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          className="whatsapp-icon"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </button>
    </div>
  );
};

export default FloatingButtons;


.floating-buttons-container {
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 9999;
}

.floating-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(0, 0, 0);
  text-decoration: none;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.floating-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.phone-btn {
  background-color: #2d93ff;
  color:white;
}

.phone-btn:hover {
  background-color: #015fc3;
}

.whatsapp-btn {
  background-color: #d3ff81;
  padding: 0;
}

.whatsapp-btn:hover {
  background-color: #78ff1e;
}

.whatsapp-icon {
  width: 28px;
  height: 28px;
}

@media (max-width: 768px) {

  .whatsapp-icon {
    width: 24px;
    height: 24px;
  }
  .floating-buttons-container {
    right: 16px;
    bottom: 16px;
    gap: 10px;
  }
  
  .floating-btn {
    width: 50px;
    height: 50px;
  }
}