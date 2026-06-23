/* ============================================================
   VAELTHAR — Modal System
   /js/ui/modal.js | v1.0

   Usage:
     import { modal } from '/js/ui/modal.js';

     // Simple confirm
     const confirmed = await modal.confirm('Delete item?', 'This cannot be undone.');

     // Alert
     await modal.alert('Quest Failed', 'Your verification rate is too low.');

     // Prompt
     const name = await modal.prompt('Enter Guild Name', '', { placeholder: 'e.g. Iron Vanguard' });

     // Fully custom
     modal.open({
       title: 'Choose Your Role',
       content: '<p>Pick wisely — this defines your Season.</p>',
       actions: [
         { label: 'Random',  style: 'secondary', value: 'random' },
         { label: 'Choose',  style: 'primary',   value: 'choose' },
       ],
       onAction: (value) => handleRoleChoice(value),
     });
   ============================================================ */

import { icon } from './icons.js';


/* ----------------------------------------------------------
   MODAL STACK
   Supports nested modals (e.g. confirm inside a form modal).
---------------------------------------------------------- */

const _stack = [];


/* ----------------------------------------------------------
   OPEN — core function
   Returns a Promise that resolves with the action value
   when the modal closes.

   @param {Object} opts
   @param {string}   opts.title
   @param {string}   [opts.subtitle]
   @param {string}   [opts.content]      — raw HTML string
   @param {Function} [opts.renderContent]— (container: HTMLElement) => void
   @param {Array}    [opts.actions]      — [{ label, style, value, disabled }]
   @param {Function} [opts.onAction]     — called with action value before resolving
   @param {boolean}  [opts.closeable]    — show × button and backdrop dismiss (default true)
   @param {string}   [opts.size]         — 'sm' | 'md' (default) | 'lg'
   @param {string}   [opts.iconName]     — icon shown next to title
   @param {string}   [opts.iconColor]
   @param {Function} [opts.onOpen]       — called after modal is mounted
   @param {Function} [opts.onClose]      — called when modal is dismissed
   @returns {Promise<*>}  resolves with action value, or null if dismissed
---------------------------------------------------------- */

export function open(opts = {}) {
  return new Promise((resolve) => {
    const {
      title         = '',
      subtitle      = '',
      content       = '',
      renderContent = null,
      actions       = [],
      onAction      = null,
      closeable     = true,
      size          = 'md',
      iconName      = null,
      iconColor     = 'var(--color-gold-bright)',
      onOpen        = null,
      onClose       = null,
    } = opts;

    /* ---- Overlay ---- */
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', title);

    /* ---- Modal box ---- */
    const box = document.createElement('div');
    box.className = `modal modal--${size}`;

    /* ---- Header ---- */
    const headerHTML = `
      <div class="modal-header" style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-6)">
        ${iconName ? `<span style="color:${iconColor};flex-shrink:0">${icon(iconName, 22)}</span>` : ''}
        <div style="flex:1">
          <div class="modal-title">${_escape(title)}</div>
          ${subtitle ? `<div class="modal-subtitle text-secondary text-sm" style="margin-top:var(--space-1)">${_escape(subtitle)}</div>` : ''}
        </div>
        ${closeable ? `<button class="modal-close btn-ghost" aria-label="Close modal" style="margin-left:auto">${icon('close', 16)}</button>` : ''}
      </div>
    `;

    /* ---- Content ---- */
    const contentHTML = content
      ? `<div class="modal-content" style="margin-bottom:var(--space-6)">${content}</div>`
      : '<div class="modal-content" style="margin-bottom:var(--space-6)"></div>';

    /* ---- Actions ---- */
    const actionsHTML = actions.length
      ? `<div class="modal-actions" style="display:flex;gap:var(--space-3);justify-content:flex-end;margin-top:var(--space-6)">
          ${actions.map(a => `
            <button
              class="btn btn-${a.style || 'secondary'} ${a.size === 'sm' ? 'btn-sm' : ''}"
              data-action="${_escape(String(a.value ?? a.label))}"
              ${a.disabled ? 'disabled' : ''}
            >${_escape(a.label)}</button>
          `).join('')}
        </div>`
      : '';

    box.innerHTML = headerHTML + contentHTML + actionsHTML;

    /* ---- Custom render ---- */
    if (renderContent) {
      const contentEl = box.querySelector('.modal-content');
      renderContent(contentEl);
    }

    overlay.appendChild(box);
    document.body.appendChild(overlay);
    _stack.push(overlay);

    /* Lock body scroll */
    document.body.style.overflow = 'hidden';

    /* Focus trap */
    const focusable = box.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();

    /* ---- Close logic ---- */
    const close = (value = null) => {
      overlay.classList.add('modal-overlay--out');

      overlay.addEventListener('animationend', () => {
        overlay.remove();
        _stack.splice(_stack.indexOf(overlay), 1);
        if (_stack.length === 0) document.body.style.overflow = '';
        onClose?.(value);
        resolve(value);
      }, { once: true });
    };

    /* Close button */
    box.querySelector('.modal-close')?.addEventListener('click', () => close(null));

    /* Backdrop click */
    if (closeable) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close(null);
      });
    }

    /* Escape key */
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && closeable && _stack[_stack.length - 1] === overlay) {
        close(null);
        document.removeEventListener('keydown', onKeyDown);
      }
    };
    document.addEventListener('keydown', onKeyDown);

    /* Action buttons */
    box.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const value = btn.dataset.action;
        onAction?.(value);
        close(value);
        document.removeEventListener('keydown', onKeyDown);
      });
    });

    onOpen?.(box);
  });
}


/* ----------------------------------------------------------
   CLOSE TOP MODAL — call to programmatically dismiss
---------------------------------------------------------- */

export function closeTop() {
  const top = _stack[_stack.length - 1];
  if (!top) return;
  const closeBtn = top.querySelector('.modal-close');
  if (closeBtn) closeBtn.click();
}

export function closeAll() {
  [..._stack].reverse().forEach(overlay => {
    const closeBtn = overlay.querySelector('.modal-close');
    if (closeBtn) closeBtn.click();
  });
}


/* ----------------------------------------------------------
   PRESET PATTERNS
---------------------------------------------------------- */

/**
 * Confirm dialog. Returns true / false.
 *
 * @param {string} title
 * @param {string} [message]
 * @param {Object} [opts]
 *   @param {string} opts.confirmLabel  — default 'Confirm'
 *   @param {string} opts.cancelLabel   — default 'Cancel'
 *   @param {string} opts.confirmStyle  — default 'primary'
 *   @param {boolean} opts.danger       — uses btn-danger for confirm
 */
export async function confirm(title, message = '', opts = {}) {
  const {
    confirmLabel = 'Confirm',
    cancelLabel  = 'Cancel',
    confirmStyle = opts.danger ? 'danger' : 'primary',
    iconName     = opts.danger ? 'notification' : 'info',
    iconColor    = opts.danger ? 'var(--color-red-bright)' : 'var(--color-gold-bright)',
  } = opts;

  const result = await open({
    title,
    content:   message ? `<p class="text-secondary">${_escape(message)}</p>` : '',
    iconName,
    iconColor,
    closeable: true,
    size:      'sm',
    actions: [
      { label: cancelLabel,  style: 'secondary', value: 'cancel'  },
      { label: confirmLabel, style: confirmStyle, value: 'confirm' },
    ],
  });

  return result === 'confirm';
}

/**
 * Alert dialog (single OK button). Awaitable.
 *
 * @param {string} title
 * @param {string} [message]
 * @param {Object} [opts]
 */
export async function alert(title, message = '', opts = {}) {
  return open({
    title,
    content:  message ? `<p class="text-secondary">${_escape(message)}</p>` : '',
    iconName: opts.iconName || 'info',
    iconColor: opts.iconColor || 'var(--color-gold-bright)',
    size:     'sm',
    actions: [
      { label: opts.okLabel || 'OK', style: 'primary', value: 'ok' },
    ],
    ...opts,
  });
}

/**
 * Prompt dialog — returns the string value or null if cancelled.
 *
 * @param {string} title
 * @param {string} [defaultValue]
 * @param {Object} [opts]
 *   @param {string} opts.placeholder
 *   @param {string} opts.type         — input type, default 'text'
 *   @param {number} opts.maxLength
 */
export async function prompt(title, defaultValue = '', opts = {}) {
  let inputEl;

  const result = await open({
    title,
    size:      'sm',
    iconName:  opts.iconName || 'edit',
    iconColor: 'var(--color-gold-bright)',
    renderContent(container) {
      inputEl = document.createElement('input');
      inputEl.type        = opts.type || 'text';
      inputEl.className   = 'field-input';
      inputEl.value       = defaultValue;
      inputEl.placeholder = opts.placeholder || '';
      if (opts.maxLength) inputEl.maxLength = opts.maxLength;
      container.appendChild(inputEl);
      setTimeout(() => inputEl.focus(), 50);

      inputEl.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          container.closest('.modal')
            .querySelector('[data-action="confirm"]')?.click();
        }
      });
    },
    actions: [
      { label: opts.cancelLabel  || 'Cancel',  style: 'secondary', value: 'cancel'  },
      { label: opts.confirmLabel || 'Confirm', style: 'primary',   value: 'confirm' },
    ],
  });

  return result === 'confirm' ? (inputEl?.value ?? null) : null;
}

/**
 * Loading modal — no close button, dismiss manually with returned function.
 *
 * @param {string} title
 * @param {string} [message]
 * @returns {Function} close — call when done
 */
export function loading(title = 'Loading…', message = '') {
  let _close;

  open({
    title,
    subtitle:  message,
    closeable: false,
    size:      'sm',
    iconName:  'settings',
    iconColor: 'var(--color-gold-bright)',
    renderContent(container) {
      container.innerHTML = `
        <div style="display:flex;justify-content:center;padding:var(--space-4) 0">
          <div class="vthr-spinner"></div>
        </div>
      `;
    },
    onOpen(box) {
      _close = () => {
        const overlay = box.closest('.modal-overlay');
        if (overlay) {
          overlay.remove();
          _stack.splice(_stack.indexOf(overlay), 1);
          if (_stack.length === 0) document.body.style.overflow = '';
        }
      };
    },
  });

  /* Return close func asynchronously — wait for onOpen to fire */
  return new Promise(resolve => {
    const waitForClose = setInterval(() => {
      if (_close) { clearInterval(waitForClose); resolve(_close); }
    }, 10);
  });
}


/* ----------------------------------------------------------
   HELPERS
---------------------------------------------------------- */

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
---------------------------------------------------------- */

(function _injectStyles() {
  if (document.getElementById('vthr-modal-styles')) return;
  const s = document.createElement('style');
  s.id = 'vthr-modal-styles';
  s.textContent = `
    .modal--sm { max-width: 380px; }
    .modal--md { max-width: 520px; }
    .modal--lg { max-width: 720px; }

    .modal-overlay--out {
      animation: fadeOut 180ms var(--ease-in) forwards;
    }
    @keyframes fadeOut {
      to { opacity: 0; }
    }

    /* Spinner */
    .vthr-spinner {
      width: 32px; height: 32px;
      border: 3px solid var(--color-surface-3);
      border-top-color: var(--color-gold);
      border-radius: 50%;
      animation: spin 700ms linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `;
  document.head.appendChild(s);
})();


export const modal = { open, closeTop, closeAll, confirm, alert, prompt, loading };
export default modal;
