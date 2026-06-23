/* ============================================================
   VAELTHAR — Toast Notifications
   /js/ui/toast.js | v1.0

   Usage:
     import { toast } from '/js/ui/toast.js';

     toast.success('Quest complete!', 'You earned 120 EXP');
     toast.error('Failed to save');
     toast.info('New season starts in 3 days');
     toast.warning('Verification rate below 70%');
     toast.exp(120);
     toast.levelUp(15);
     toast.custom({ title, message, icon, type, duration });
   ============================================================ */

import { icon } from './icons.js';


/* ----------------------------------------------------------
   CONFIG
---------------------------------------------------------- */

const DEFAULTS = {
  duration:   3800,    /* ms before auto-dismiss */
  maxVisible: 5,       /* max toasts on screen at once */
  position:   'bottom-right',
};


/* ----------------------------------------------------------
   CONTAINER — injected once into <body>
---------------------------------------------------------- */

let _container = null;

function _getContainer() {
  if (_container) return _container;

  _container = document.createElement('div');
  _container.className  = 'toast-container';
  _container.setAttribute('role', 'region');
  _container.setAttribute('aria-label', 'Notifications');
  _container.setAttribute('aria-live', 'polite');
  document.body.appendChild(_container);

  return _container;
}


/* ----------------------------------------------------------
   TOAST QUEUE
   If maxVisible is exceeded, new toasts are queued
   and shown as existing ones dismiss.
---------------------------------------------------------- */

let _queue   = [];
let _active  = [];


/* ----------------------------------------------------------
   SHOW — core render function
---------------------------------------------------------- */

/**
 * Show a toast notification.
 *
 * @param {Object} opts
 * @param {string}  opts.type       — 'success' | 'error' | 'info' | 'warning' | 'exp' | 'level'
 * @param {string}  opts.title
 * @param {string}  [opts.message]
 * @param {string}  [opts.iconName] — icon key from icons.js
 * @param {number}  [opts.duration] — ms, 0 = persist until manually dismissed
 * @param {Function}[opts.onClose]
 * @returns {Function} dismiss — call to remove immediately
 */
function show({ type = 'info', title, message, iconName, duration, onClose } = {}) {
  const container = _getContainer();
  const ms        = duration ?? DEFAULTS.duration;

  /* Queue if too many active */
  if (_active.length >= DEFAULTS.maxVisible) {
    _queue.push({ type, title, message, iconName, duration, onClose });
    return () => {};
  }

  /* Build element */
  const el = document.createElement('div');
  el.className  = `toast toast--${type}`;
  el.setAttribute('role', type === 'error' ? 'alert' : 'status');

  /* Icon */
  const iconKey = iconName || _defaultIcon(type);
  const iconColor = _iconColor(type);

  el.innerHTML = `
    <span class="toast-icon" style="color:${iconColor};flex-shrink:0">
      ${icon(iconKey, 18)}
    </span>
    <div class="toast-body" style="flex:1;min-width:0">
      <div class="toast-title">${_escape(title)}</div>
      ${message ? `<div class="toast-msg">${_escape(message)}</div>` : ''}
    </div>
    <button class="toast-close btn-ghost" aria-label="Dismiss" style="flex-shrink:0;padding:2px">
      ${icon('close', 14)}
    </button>
  `;

  /* Progress bar for timed toasts */
  if (ms > 0) {
    const bar = document.createElement('div');
    bar.className = 'toast-progress';
    bar.style.cssText = `
      position:absolute;bottom:0;left:0;height:2px;
      background:${iconColor};opacity:0.5;border-radius:0 0 var(--radius-lg) var(--radius-lg);
      width:100%;
      transition:width ${ms}ms linear;
    `;
    el.style.position = 'relative';
    el.style.overflow = 'hidden';
    el.appendChild(bar);
    requestAnimationFrame(() => requestAnimationFrame(() => { bar.style.width = '0%'; }));
  }

  container.appendChild(el);
  _active.push(el);

  /* Animate in */
  requestAnimationFrame(() => el.classList.add('toast--visible'));

  /* Dismiss function */
  const dismiss = () => _dismiss(el, onClose);

  /* Auto dismiss */
  let timer = ms > 0 ? setTimeout(dismiss, ms) : null;

  /* Pause on hover */
  el.addEventListener('mouseenter', () => { if (timer) { clearTimeout(timer); timer = null; } });
  el.addEventListener('mouseleave', () => {
    if (ms > 0 && !timer) timer = setTimeout(dismiss, 1200);
  });

  /* Close button */
  el.querySelector('.toast-close').addEventListener('click', dismiss);

  return dismiss;
}

function _dismiss(el, onClose) {
  if (!el.isConnected) return;

  el.classList.add('toast--out');
  el.addEventListener('animationend', () => {
    el.remove();
    _active = _active.filter(a => a !== el);
    onClose?.();

    /* Drain queue */
    if (_queue.length > 0) {
      show(_queue.shift());
    }
  }, { once: true });
}


/* ----------------------------------------------------------
   PUBLIC API
---------------------------------------------------------- */

export const toast = {

  /** Green — task completed, save successful, quest done */
  success(title, message, opts = {}) {
    return show({ type: 'success', iconName: 'check', title, message, ...opts });
  },

  /** Red — error, failed request, validation issue */
  error(title, message, opts = {}) {
    return show({ type: 'error', iconName: 'close', title, message, duration: 5000, ...opts });
  },

  /** Gold — neutral info, tips, system messages */
  info(title, message, opts = {}) {
    return show({ type: 'info', iconName: 'info', title, message, ...opts });
  },

  /** Orange — warnings, low balance, anti-cheat alert */
  warning(title, message, opts = {}) {
    return show({ type: 'warning', iconName: 'notification', title, message, duration: 5000, ...opts });
  },

  /** EXP gained — shows bolt icon + gold amount */
  exp(amount, opts = {}) {
    return show({
      type:     'exp',
      iconName: 'exp',
      title:    `+${amount} EXP`,
      message:  'Keep going, adventurer!',
      duration: 3000,
      ...opts,
    });
  },

  /** Level up — special celebration toast */
  levelUp(newLevel, opts = {}) {
    return show({
      type:     'level',
      iconName: 'level',
      title:    `Level Up! → ${newLevel}`,
      message:  'Your power grows stronger.',
      duration: 5000,
      ...opts,
    });
  },

  /** Crystal earned */
  crystal(amount, opts = {}) {
    return show({
      type:     'info',
      iconName: 'crystal',
      title:    `+${amount} Crystal`,
      message:  'Added to your wallet.',
      duration: 3000,
      ...opts,
    });
  },

  /** Quest complete */
  questComplete(questTitle, exp, opts = {}) {
    return show({
      type:     'success',
      iconName: 'quest',
      title:    'Quest Complete!',
      message:  `${questTitle} · +${exp} EXP`,
      duration: 4500,
      ...opts,
    });
  },

  /** Habit streak */
  streak(days, opts = {}) {
    return show({
      type:     'success',
      iconName: 'flame',
      title:    `${days}-Day Streak!`,
      message:  'Consistency is power.',
      duration: 4000,
      ...opts,
    });
  },

  /** Fully custom */
  custom(opts = {}) {
    return show(opts);
  },

  /** Dismiss all active toasts immediately */
  dismissAll() {
    [..._active].forEach(el => _dismiss(el));
    _queue = [];
  },
};


/* ----------------------------------------------------------
   HELPERS
---------------------------------------------------------- */

function _defaultIcon(type) {
  const map = {
    success: 'check',
    error:   'close',
    info:    'info',
    warning: 'notification',
    exp:     'exp',
    level:   'level',
  };
  return map[type] || 'info';
}

function _iconColor(type) {
  const map = {
    success: 'var(--color-green-bright)',
    error:   'var(--color-red-bright)',
    info:    'var(--color-gold-bright)',
    warning: '#ff9500',
    exp:     'var(--color-gold-bright)',
    level:   'var(--color-gold-bright)',
  };
  return map[type] || 'var(--color-gold-bright)';
}

function _escape(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


/* ----------------------------------------------------------
   INJECTED STYLES
   Extends design-tokens.css toast classes with animation.
   Injected once so no extra CSS file is needed.
---------------------------------------------------------- */

(function _injectStyles() {
  if (document.getElementById('vthr-toast-styles')) return;
  const s = document.createElement('style');
  s.id = 'vthr-toast-styles';
  s.textContent = `
    .toast {
      opacity: 0;
      transform: translateX(24px);
    }
    .toast--visible {
      opacity: 1;
      transform: translateX(0);
      transition:
        opacity  var(--duration-slow) var(--ease-out),
        transform var(--duration-slow) var(--ease-out);
    }
    .toast--out {
      animation: toastOut 200ms var(--ease-in) forwards;
    }
    @keyframes toastOut {
      to { opacity: 0; transform: translateX(32px); height: 0; padding: 0; margin: 0; }
    }
    .toast-icon { display: flex; align-items: center; justify-content: center; }
    .toast { display: flex; align-items: flex-start; gap: var(--space-3); }
  `;
  document.head.appendChild(s);
})();


export default toast;
