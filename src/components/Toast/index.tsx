import React from 'react';
import ReactDOM from 'react-dom';
import Toast from './Toast';

type useToastType = {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  time?: number; // 持续时间
}

const useToast = (props: useToastType) => {
  const toastElement = document.getElementById('toast-box');
  if (toastElement === null) {
    let element = document.createElement('div');
    element.id = 'toast-box';
    document.body.appendChild(element);
    ReactDOM.render(<Toast {...props} />, element);
  } else {
    ReactDOM.render(<Toast {...props} />, toastElement);
  }
};

export default useToast;
