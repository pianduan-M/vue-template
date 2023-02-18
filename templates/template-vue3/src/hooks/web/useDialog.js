import { isString } from '~/src/utils';

export function useDialog(callback) {
  const elRef = ref(null);
  const dialogTile = ref('');

  const saveCallback = async () => {
    return callback && callback();
  };

  const handleOpenDialog = () => {
    if (!elRef) return;

    const open = elRef.value.handleOpenDialog;
    open && open(saveCallback);
  };

  const handleCloseDialog = () => {
    if (!elRef) return;
    const close = elRef.value.handleCloseDialog;
    close && close();
  };

  const changeDialogTitle = (title = '') => {
    if (isString(title)) {
      dialogTile.value = title;
    }
  };

  return {
    elRef,
    dialogTile,
    handleOpenDialog,
    handleCloseDialog,
    changeDialogTitle,
  };
}
