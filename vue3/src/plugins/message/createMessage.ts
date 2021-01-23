import { createApp } from 'vue';
import Message from './message.vue';
import mitt from 'mitt';

export const emitter = mitt();
interface MessageProps {
  duration?: number;
  message?: string;
  type?: string;
  closable?: boolean;
  [key: string]: unknown;
}
const createMessage = (props?: MessageProps) => {
  const app = createApp(Message, props);
  const parent = document.createElement('div');
  const instance = app.mount(parent);
  document.body.appendChild(instance.$el);

  emitter.on('timeup', () => {
    app.unmount(parent);
  });

  return emitter;
};

export default createMessage;
