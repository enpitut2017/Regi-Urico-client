import { RELOAD_NOTIFICATION } from '../const/const-values';

const notificateOnReload = e => {
  e.returnValue = `${RELOAD_NOTIFICATION}`;
}

export const addReloadNotification = () => {
  window.addEventListener('beforeunload', notificateOnReload, false);
}

export const removeReloadNotification = () => {
  window.removeEventListener('beforeunload', notificateOnReload, false)
}
