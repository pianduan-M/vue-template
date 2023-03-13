<template>
  <li
    class="upload-file-item"
    v-loading="loading"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
  >
    <img class="upload-file-img" v-if="isImage" :src="fileUrl" alt="" />
    <div class="upload-file-video" v-else-if="isVideo">
      <video :src="fileUrl" alt=""></video>
    </div>
    <div class="upload-file-file" v-else>
      <img src="./assets/file_icon.png" alt="" />
    </div>

    <!-- 上传成功的 tag -->
    <label class="upload-file-item-status-label" v-show="isSuccess">
      <el-icon class="el-icon" color="#fff"><Check /></el-icon>
    </label>

    <transition name="fade">
      <span class="upload-file-item__actions" v-show="isShowActions">
        <span class="cursor-pointer" @click="onPreview">
          <el-icon :size="18" color="#fff"><CirclePlus /></el-icon>
        </span>
        <span class="cursor-pointer" @click="onRemove">
          <el-icon :size="18" color="#fff"><Delete /></el-icon>
        </span>
      </span>
    </transition>
  </li>
</template>

<script>
  export default {
    name: 'UploadFileItem',
  };
</script>
<script setup>
  import { Check, Delete, CirclePlus } from '@element-plus/icons-vue';

  const emit = defineEmits(['preview', 'remove']);

  const props = defineProps({
    data: {
      type: Object,
      default: () => ({}),
    },
  });

  const isImage = computed(() => {
    const mime = props.data.mime || '';
    return mime.includes('image');
  });

  const isVideo = computed(() => {
    const mime = props.data.mime || '';
    return mime.includes('video');
  });

  const loading = computed(() => {
    return props.data.status === 'upload';
  });
  const isSuccess = computed(() => {
    return props.data.status === 'success';
  });

  const fileUrl = computed(() => {
    return props.data.fileUrl || '';
  });

  const isShowActions = ref(false);
  const onMouseenter = () => {
    if (loading.value) return;
    isShowActions.value = true;
  };
  const onMouseleave = () => {
    if (loading.value) return;
    isShowActions.value = false;
  };

  const onPreview = () => {
    emit('preview', props.data);
  };

  const onRemove = () => {
    emit('remove', props.data);
  };
</script>

<style scoped lang="scss">
  .upload-file-item {
    width: 104px;
    height: 104px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    overflow: hidden;
    position: relative;
    margin: 0 10px 10px 0;
  }

  .upload-file-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .upload-file-video,
  .upload-file-file {
    width: 104px;
    height: 104px;
    background-color: rgb(231, 231, 231);

    img,
    video {
      width: 100%;
      height: 100%;
    }
  }

  .upload-file-item-status-label {
    position: absolute;
    right: -15px;
    top: -6px;
    width: 40px;
    height: 24px;
    transform: rotate(45deg);
    background-color: $--color-success;
    text-align: center;

    .el-icon {
      font-size: 12px;
      margin-top: 11px;
      transform: rotate(-45deg);
    }
  }

  .upload-file-item__actions {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba($color: #000000, $alpha: 0.5);
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 20px;
  }

  .cursor-pointer {
    cursor: pointer;
  }
</style>
