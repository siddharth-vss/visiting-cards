'use client';

import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import LoginForm from './login-form';
import RegisterForm from './register-form';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        {isLogin ? (
          <LoginForm onSwitchToRegister={() => setIsLogin(false)} OnClose ={()=>onClose()}/>
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLogin(true)} OnClose ={()=>onClose()} />
        )}
      </DialogContent>
    </Dialog>
  );
}