export const useConfirm = (options = {}) => {
  const confirm = (content = '') => {
    return $confirm(content, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      ...options,
    });
  };

  return { confirm };
};
