'use client';

import { FC, useState } from 'react';
import { Input as UIInput } from '@/components/ui/input';
import { Mail, User, Search, Phone, Calendar, Eye, EyeOff } from 'lucide-react';

type Props = React.ComponentProps<'input'>;

export const Input: FC<Props> = props => {
  const { type, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);

  const getIcon = () => {
    switch (type) {
      case 'email':
        return <Mail className="size-4 text-muted-foreground" />;
      case 'password':
        return (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <Eye className="size-4" />
            ) : (
              <EyeOff className="size-4" />
            )}
          </button>
        );
      case 'text':
        return <User className="size-4 text-muted-foreground" />;
      case 'search':
        return <Search className="size-4 text-muted-foreground" />;
      case 'tel':
        return <Phone className="size-4 text-muted-foreground" />;
      case 'date':
        return <Calendar className="size-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <UIInput
        {...rest}
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
      />
      {getIcon() && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {getIcon()}
        </div>
      )}
    </div>
  );
};

export default Input;
