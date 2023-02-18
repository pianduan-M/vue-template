import { ElMessage, ElMessageBox, ElIcon, ElNotification } from 'element-plus';
import {
  SuccessFilled,
  CircleCloseFilled,
  InfoFilled,
  WarnTriangleFilled,
} from '@element-plus/icons-vue';
import { h } from 'vue';

const modalIcons = {
  success: SuccessFilled,
  error: CircleCloseFilled,
  warning: WarnTriangleFilled,
  info: InfoFilled,
};

const createModalMessage = (message, type = 'success') =>
  h(
    'div',
    {
      class: ['pd-use-modal', `pd-${type}-modal `],
    },

    [h(ElIcon, {}, h(modalIcons[type])), message],
  );

export const useMessage = () => {
  const createConfirm = (options) => {
    return ElMessageBox.confirm(options.content || '', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      ...options,
    });
  };

  const createSuccessModal = ({ title = '消息提示', message, confirmButtonText = '知道了' }) => {
    return ElMessageBox.alert(createModalMessage(message, 'success'), title, {
      confirmButtonText,
    });
  };
  const createErrorModal = ({ title = '消息提示', message, confirmButtonText = '知道了' }) => {
    return ElMessageBox.alert(createModalMessage(message, 'error'), title, {
      confirmButtonText,
    });
  };
  const createWarningModal = ({ title = '消息提示', message, confirmButtonText = '知道了' }) => {
    return ElMessageBox.alert(createModalMessage(message, 'warning'), title, {
      confirmButtonText,
    });
  };
  const createInfoModal = ({ title = '消息提示', message, confirmButtonText = '知道了' }) => {
    return ElMessageBox.alert(createModalMessage(message, 'info'), title, {
      confirmButtonText,
    });
  };

  return {
    createMessage: ElMessage,
    ElNotification,
    createConfirm,
    createSuccessModal,
    createErrorModal,
    createWarningModal,
    createInfoModal,
  };
};
