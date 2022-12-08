import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { ToastType, uiActions } from '../../store/ui-slice';

const Toast = () => {
  const { toast } = useSelector<RootState, { toast: ToastType }>(
    (state) => state.ui
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const clearToastTimer = setTimeout(
      () => dispatch(uiActions.changeToast(ToastType.empty)),
      1000 * 3
    );
    return () => clearTimeout(clearToastTimer);
  }, [toast, dispatch]);

  let classForBackground = '';
  if (toast === ToastType.addWishlist || toast === ToastType.addCart) {
    classForBackground = 'success';
  }
  if (toast === ToastType.removeCart || toast === ToastType.removeWishlist) {
    classForBackground = 'failure';
  }

  return (
    <div className={`toast toast--${classForBackground}`}>
      {!!toast.length && <p className="paragraph toast__text">{toast}</p>}
    </div>
  );
};

export default Toast;
