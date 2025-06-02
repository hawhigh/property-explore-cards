
import { Wifi, Phone, Mail } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="text-center space-y-2">
      <p className="text-xs text-gray-500">
        Direct booking confirmation
      </p>
      <div className="text-xs text-gray-500 space-y-1">
        <div className="flex items-center justify-center gap-1">
          <Phone className="h-3 w-3" />
          <span>+357 96 555 154</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <Mail className="h-3 w-3" />
          <span>booking@villalucilla.eu</span>
        </div>
      </div>
      <p className="text-xs text-gray-500">
        <Wifi className="h-3 w-3 inline mr-1" />
        Free WiFi • Private Pool • Beach Access
      </p>
    </div>
  );
};

export default ContactInfo;
