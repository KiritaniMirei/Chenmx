const copy = {
  beforeMount(el: any, binding: any) {
    el.$value = binding.value;
    if (!el.$value) {
      alert('无复制内容');
    } else {
      el.handler = () => {
        const textarea = document.createElement('textarea');
        textarea.readOnly = true;
        textarea.style.cssText = 'position: absolute; top: -9999px;';
        textarea.value = el.$value;
        document.body.appendChild(textarea);
        textarea.select();
        const result = document.execCommand('Copy');
        if (result) {
          alert('复制成功');
        } else {
          alert('复制失败');
        }
        document.body.removeChild(textarea);
      };
      el.addEventListener('click', el.handler);
    }
  },
  updated(el: any, binding: any) {
    el.$value = binding.value;
  },
  unmounted(el: any) {
    el.removeEventListener('click', el.handler);
  },
};

const longpress = {
  beforeMount(el: any, binding: any) {
    if (typeof binding.value === 'function') {
      const handler = (e: Event) => binding.value(e);
      let timer: any = null;
      el.start = (e: Event) => {
        if (e.type === 'click' && (e as MouseEvent).button !== 0) {
          return;
        }
        if (timer === null) {
          timer = setTimeout(() => {
            handler(e);
          }, 2000);
        }
      };
      el.cancel = () => {
        if (timer !== null) {
          clearTimeout(timer);
          timer = null;
        }
      };

      el.addEventListener('mousedown', el.start);
      el.addEventListener('touchstart', el.start);
      el.addEventListener('click', el.cancel);
      el.addEventListener('mouseup', el.cancel);
      el.addEventListener('mouseleave', el.cancel);
      el.addEventListener('touchend', el.cancel);
      el.addEventListener('touchcancel', el.cancel);
    } else {
      throw 'callback must be a function';
    }
  },
  unmounted(el: any) {
    el.removeEventListener('mousedown', el.start);
    el.removeEventListener('touchstart', el.start);
    el.removeEventListener('click', el.cancel);
    el.removeEventListener('mouseup', el.cancel);
    el.removeEventListener('mouseleave', el.cancel);
    el.removeEventListener('touchend', el.cancel);
    el.removeEventListener('touchcancel', el.cancel);
  },
};

const filterspace = {
  beforeMount(el: any) {
    el.handle = () => {
      el.value = el.value.replace(/\s/g, '');
    };
    el.addEventListener('keydown', el.handle);
  },
  unmounted(el: any) {
    el.removeEventListener('keydown', el.handle);
  },
};

const directives = {
  copy,
  longpress,
  filterspace,
};

export interface Directives {
  [key: string]: object;
}
export default directives;
